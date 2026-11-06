/* ==========================================================
   Time Lapse Calculator — v12.4
   Vanilla JS, no dependencies.
   ========================================================== */

/* ---------- CONFIG: edit these to match your camera ---------- */
const CONFIG = {
  // Average size of one file, in MB. Defaults are for a 24 MP APS-C body
  // (e.g. Nikon D5600): 14-bit compressed NEF ≈ 25 MB, Large/Fine JPEG ≈ 10 MB.
  // Night/high-ISO frames run larger; busy daytime scenes vary too.
  fileSizeMB: {
    raw: 25,
    jpeg: 10,
  },

  // Formatted cards give you a bit less than the label says
  // (decimal vs binary GB, plus filesystem overhead).
  cardUsableFraction: 0.93,

  // Rough minimum time each bracketed exposure needs (shutter + write),
  // used only to warn when the interval looks too tight.
  minSecondsPerBracketShot: 1,

  // Defaults for first launch
  defaults: {
    intervalSec: 5,
    durationMin: 120,
    bracket: 1,      // 1 = off, 3, 5
    format: 'raw',   // 'raw' | 'jpeg' | 'both'
    cardGB: 64,
    fps: 30,
  },

  // Choices offered in the Run for / Every pickers
  durationChoicesMin: [10, 15, 20, 30, 45, 60, 90, 120, 150, 180, 240, 300, 360, 480, 600, 720],
  intervalChoicesSec: [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 45, 60, 90, 120, 180, 300, 600],

  // Start-time dial
  dial: {
    pxPerMin: 3,        // tape scale: 3 px per minute = 180 px per hour
    snapMin: 5,         // settles on 5-minute marks
    hoursBack: 2,       // how far before now you can scroll
    hoursAhead: 36,     // and how far ahead
  },

  storageKey: 'tlcalc.v12.4',
};

/* ---------- helpers ---------- */
const $ = (id) => document.getElementById(id);
const MB = 1e6, GB = 1e9;

function store(obj) {
  try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(obj)); } catch (e) {}
}
function load() {
  try { return JSON.parse(localStorage.getItem(CONFIG.storageKey)) || {}; } catch (e) { return {}; }
}

const pad = (n) => String(n).padStart(2, '0');

function fmtClock(date, withSeconds) {
  const opts = { hour: 'numeric', minute: '2-digit' };
  if (withSeconds && date.getSeconds() !== 0) opts.second = '2-digit';
  return date.toLocaleTimeString([], opts).replace(/\s?([AP])M/i, (m, p) => p.toLowerCase() + 'm');
}
function fmtDuration(totalSec) {
  totalSec = Math.max(0, Math.round(totalSec));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h) return h + 'h ' + (m ? m + 'm' : '').trim();
  if (m) return m + 'm' + (s ? ' ' + s + 's' : '');
  return s + 's';
}
function fmtClip(sec) {
  if (sec < 60) return (Math.round(sec * 10) / 10) + ' s';
  const m = Math.floor(sec / 60), s = Math.round(sec % 60);
  return m + 'm ' + pad(s) + 's';
}
function fmtBytes(b) {
  if (b >= 1e12) return (b / 1e12).toFixed(2) + ' TB';
  if (b >= GB) return (b / GB).toFixed(b >= 100 * GB ? 0 : 1) + ' GB';
  return Math.round(b / MB) + ' MB';
}
function fmtInt(n) { return Math.round(n).toLocaleString(); }
function dayTag(date, ref) {
  const d = Math.round((new Date(date).setHours(0,0,0,0) - new Date(ref).setHours(0,0,0,0)) / 864e5);
  if (d === 0) return '';
  if (d === 1) return ' tomorrow';
  return ' +' + d + 'd';
}

/* ---------- state ---------- */
const saved = load();
const state = {
  bracket: saved.bracket ?? CONFIG.defaults.bracket,
  format:  saved.format  ?? CONFIG.defaults.format,
  cardGB:  saved.cardGB  ?? CONFIG.defaults.cardGB,
  fps:     saved.fps     ?? CONFIG.defaults.fps,
  sizeRaw: saved.sizeRaw ?? CONFIG.fileSizeMB.raw,
  sizeJpeg:saved.sizeJpeg?? CONFIG.fileSizeMB.jpeg,
  intervalSec: saved.intervalSec ?? CONFIG.defaults.intervalSec,
  durationMin: saved.durationMin ?? CONFIG.defaults.durationMin,
  startMin: 0,   // set on load to now (rounded up to 5 min)
};

/* ---------- segmented controls ---------- */
function bindSeg(id, key, cast) {
  const el = $(id);
  el.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    state[key] = cast(b.dataset.val);
    paintSeg(id, state[key]);
    update();
  });
  paintSeg(id, state[key]);
}
function paintSeg(id, val) {
  $(id).querySelectorAll('button').forEach((b) => {
    const on = String(b.dataset.val) === String(val);
    b.classList.toggle('on', on);
    b.setAttribute('aria-checked', on);
  });
}

/* ---------- start-time dial ---------- */
function nowMin() {
  const d = new Date();
  return d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60;
}
function roundedNowMin() {
  return Math.ceil(nowMin() / 5) * 5;
}
function midnightToday() {
  const d = new Date(); d.setHours(0, 0, 0, 0); return d;
}
function minToDate(min) {
  return new Date(midnightToday().getTime() + min * 60000);
}

const Dial = {
  el: null, strip: null, R0: 0, R1: 0, PX: CONFIG.dial.pxPerMin,
  value: 0, anim: null, drag: null, wheelTimer: null,

  build() {
    this.el = $('dial'); this.strip = $('dialStrip');
    const n = nowMin();
    this.R0 = Math.floor((n - CONFIG.dial.hoursBack * 60) / 60) * 60;
    this.R1 = Math.ceil((n + CONFIG.dial.hoursAhead * 60) / 60) * 60;
    this.strip.style.width = (this.R1 - this.R0) * this.PX + 'px';

    // ticks every 5 min, labels every 30 min
    const frag = document.createDocumentFragment();
    for (let m = this.R0; m <= this.R1; m += 5) {
      const x = (m - this.R0) * this.PX;
      const t = document.createElement('i');
      t.className = 'tk' + (m % 60 === 0 ? ' h' : m % 15 === 0 ? ' q' : '');
      t.style.left = x + 'px';
      frag.appendChild(t);
      if (m % 30 === 0) {
        const d = minToDate(m);
        const l = document.createElement('span');
        l.className = 'tl' + (m % 60 === 0 ? ' h' : '');
        l.style.left = x + 'px';
        l.textContent = m % 60 === 0 ? fmtHour(d) : ':30';
        if (((m % 1440) + 1440) % 1440 === 0) {
          const day = document.createElement('small');
          day.textContent = d.toLocaleDateString([], { weekday: 'short' });
          l.appendChild(day);
        }
        frag.appendChild(l);
      }
    }
    this.strip.appendChild(frag);
    this.bind();
  },

  clamp(v) { return Math.max(this.R0, Math.min(this.R1, v)); },

  // place the strip so `v` sits under the centre needle
  paint() {
    const w = this.el.clientWidth;
    const x = w / 2 - (this.value - this.R0) * this.PX;
    this.strip.style.transform = `translate3d(${x}px,0,0)`;
    $('dialPast').style.width = Math.max(0, (nowMin() - this.R0) * this.PX) + 'px';
    const run = $('dialRun');
    run.style.left = (this.value - this.R0) * this.PX + 'px';
    run.style.width = state.durationMin * this.PX + 'px';
    this.el.setAttribute('aria-valuetext', fmtClock(minToDate(this.value)));
  },

  set(v) {
    v = this.clamp(v);
    this.value = v;
    const step = CONFIG.dial.snapMin;
    state.startMin = Math.round(v / step) * step;
    this.paint();
    update();
  },

  stop() { if (this.anim) cancelAnimationFrame(this.anim); this.anim = null; },

  // ease to a target (used for snapping, taps and the Now button)
  glideTo(target) {
    this.stop();
    target = this.clamp(target);
    const from = this.value, t0 = performance.now(), dur = 260;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      this.set(from + (target - from) * e);
      if (k < 1) this.anim = requestAnimationFrame(step);
      else { this.value = target; this.anim = null; }
    };
    this.anim = requestAnimationFrame(step);
  },

  snap() {
    const s = CONFIG.dial.snapMin;
    this.glideTo(Math.round(this.value / s) * s);
  },

  // flick momentum, then settle on a 5-min mark
  coast(velMinPerMs) {
    this.stop();
    let last = performance.now();
    const step = (t) => {
      const dt = t - last; last = t;
      velMinPerMs *= Math.pow(0.994, dt);
      const next = this.clamp(this.value + velMinPerMs * dt);
      const hitEdge = next === this.R0 || next === this.R1;
      this.set(next);
      if (Math.abs(velMinPerMs) > 0.004 && !hitEdge) this.anim = requestAnimationFrame(step);
      else { this.anim = null; this.snap(); }
    };
    this.anim = requestAnimationFrame(step);
  },

  bind() {
    const el = this.el;
    el.addEventListener('pointerdown', (e) => {
      this.stop();
      el.setPointerCapture(e.pointerId);
      this.drag = { x0: e.clientX, v0: this.value, moved: false, samples: [[performance.now(), e.clientX]] };
    });
    el.addEventListener('pointermove', (e) => {
      const d = this.drag; if (!d) return;
      const dx = e.clientX - d.x0;
      if (Math.abs(dx) > 4) d.moved = true;
      d.samples.push([performance.now(), e.clientX]);
      if (d.samples.length > 6) d.samples.shift();
      this.set(d.v0 - dx / this.PX);
    });
    const end = (e) => {
      const d = this.drag; if (!d) return;
      this.drag = null;
      if (!d.moved) {
        // tap: jump to the tapped spot on the tape
        const r = el.getBoundingClientRect();
        this.glideTo(Math.round((this.value + (e.clientX - r.left - r.width / 2) / this.PX) / CONFIG.dial.snapMin) * CONFIG.dial.snapMin);
        return;
      }
      const [t1, x1] = d.samples[d.samples.length - 1];
      const [t0, x0] = d.samples[0];
      const vPx = (t1 - t0) > 0 && performance.now() - t1 < 80 ? (x1 - x0) / (t1 - t0) : 0;
      if (Math.abs(vPx) > 0.15) this.coast(-vPx / this.PX);
      else this.snap();
    };
    el.addEventListener('pointerup', end);
    el.addEventListener('pointercancel', end);

    // trackpad / mouse wheel
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      this.stop();
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      this.set(this.value + delta / this.PX);
      clearTimeout(this.wheelTimer);
      this.wheelTimer = setTimeout(() => this.snap(), 120);
    }, { passive: false });

    // keyboard: ←/→ 5 min, shift for an hour
    el.addEventListener('keydown', (e) => {
      const step = e.shiftKey ? 60 : CONFIG.dial.snapMin;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); this.glideTo(state.startMin + step); }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); this.glideTo(state.startMin - step); }
    });

    window.addEventListener('resize', () => this.paint());
  },
};

function fmtHour(d) {
  return d.toLocaleTimeString([], { hour: 'numeric' }).replace(/\s?([AP])M/i, (m, p) => p.toLowerCase() + 'm');
}
function fmtRel(min) {
  const diff = Math.round(min - nowMin());
  if (Math.abs(diff) < 1) return 'starting now';
  return diff > 0 ? 'in ' + fmtDuration(diff * 60) : fmtDuration(-diff * 60) + ' ago';
}

/* ---------- pickers ---------- */
function fillSelect(sel, values, current, label) {
  const list = values.includes(current) ? values : [...values, current].sort((x, y) => x - y);
  sel.innerHTML = list.map((v) =>
    `<option value="${v}"${v === current ? ' selected' : ''}>${label(v)}${values.includes(v) ? '' : ' (custom)'}</option>`
  ).join('');
}
const durLabel = (m) => fmtDuration(m * 60);
const intLabel = (s) => fmtDuration(s);

function getIntervalSec() { return Math.max(1, parseInt($('intSel').value, 10) || 1); }
function getDurationMin() { return Math.max(1, parseInt($('durSel').value, 10) || 1); }

/* ---------- main calculation ---------- */
function compute() {
  const durMin = getDurationMin();
  const I = getIntervalSec();
  const b = state.bracket;
  const now = new Date();
  const start = minToDate(state.startMin);

  const durSec = durMin * 60;
  const frames = I > 0 && durSec > 0 ? Math.floor(durSec / I) + 1 : 0;
  const exposures = frames * b;

  const perExposureMB =
    state.format === 'raw'  ? state.sizeRaw :
    state.format === 'jpeg' ? state.sizeJpeg :
    state.sizeRaw + state.sizeJpeg;
  const filesPerExposure = state.format === 'both' ? 2 : 1;

  const bytes = exposures * perExposureMB * MB;
  const cardBytes = state.cardGB * GB * CONFIG.cardUsableFraction;
  const bytesPerFrame = b * perExposureMB * MB;
  const framesToFill = bytesPerFrame > 0 ? Math.floor(cardBytes / bytesPerFrame) : Infinity;
  const secToFill = (framesToFill - 1) * I;

  const burstSec = b > 1 ? b * CONFIG.minSecondsPerBracketShot : 0;
  const first = new Date(start);
  const last = new Date(start.getTime() + Math.max(0, frames - 1) * I * 1000);
  const done = new Date(last.getTime() + burstSec * 1000);

  return {
    now, start, durMin, durSec, I, b, frames, exposures, perExposureMB, filesPerExposure,
    files: exposures * filesPerExposure, bytes, cardBytes, framesToFill, secToFill,
    first, last, done, burstSec,
    clipSec: frames / state.fps,
    perHour: I > 0 ? 3600 / I : 0,
  };
}

/* ---------- render ---------- */
function update() {
  state.sizeRaw = Math.max(0, parseFloat($('sizeRaw').value) || 0);
  state.sizeJpeg = Math.max(0, parseFloat($('sizeJpeg').value) || 0);
  state.intervalSec = getIntervalSec();
  state.durationMin = getDurationMin();

  const r = compute();

  // timing
  const endDate = new Date(r.start.getTime() + r.durSec * 1000);
  $('startVal').textContent = fmtClock(r.start);
  $('startRel').textContent = fmtRel(state.startMin) + dayTag(r.start, r.now);
  $('durVal').textContent = durLabel(r.durMin);
  $('intVal').textContent = intLabel(r.I);
  $('endVal').innerHTML = fmtClock(endDate) + (dayTag(endDate, r.now) ? `<small>${dayTag(endDate, r.now).trim()}</small>` : '');
  $('intHint').textContent =
    `${fmtInt(r.frames)} frames · ${+r.perHour.toFixed(1)}/hr · ${Math.round(r.I * state.fps)}× speed-up at ${state.fps} fps`;

  // capture hints
  const fmtName = { raw: 'RAW', jpeg: 'JPEG', both: 'RAW+JPEG' }[state.format];
  $('fileHint').textContent =
    `${fmtName} ≈ ${+r.perExposureMB.toFixed(1)} MB per exposure` +
    (r.b > 1 ? ` · ${+(r.perExposureMB * r.b).toFixed(1)} MB per bracketed frame` : '');
  $('cardFreeHint').textContent = `≈ ${fmtBytes(r.cardBytes)} usable`;

  // hero
  $('rFrames').textContent = fmtInt(r.frames);
  $('rFramesSub').textContent = r.b > 1 ? `${r.b}-shot brackets → HDR frames` : 'single exposures';
  $('rSpace').textContent = fmtBytes(r.bytes);
  $('rSpaceSub').textContent = `${fmtInt(r.files)} files`;

  // card bar
  const fill = r.cardBytes ? r.bytes / r.cardBytes : 0;
  const bar = $('cardFill');
  bar.style.width = Math.min(100, fill * 100) + '%';
  bar.className = fill > 1 ? 'over' : fill > 0.8 ? 'tight' : '';
  $('cardMsg').textContent = fill > 1
    ? `Won't fit — needs ${fmtBytes(r.bytes - r.cardBytes)} more than a ${state.cardGB} GB card holds`
    : `Uses ${Math.round(fill * 100)}% of a ${state.cardGB} GB card · ${fmtBytes(r.cardBytes - r.bytes)} left`;

  // stats
  $('rExposures').textContent = fmtInt(r.exposures);
  $('rRate').textContent = r.perHour ? `${+r.perHour.toFixed(1)} frames / hr` : '—';
  $('rFirst').textContent = fmtClock(r.first) + dayTag(r.first, r.now);
  $('rLast').textContent = r.frames ? fmtClock(r.last, r.I % 60 !== 0) + dayTag(r.last, r.now) : '—';
  $('rDone').textContent = r.frames ? fmtClock(r.done, r.I % 60 !== 0 || r.burstSec) + dayTag(r.done, r.now) : '—';
  $('rClip').textContent = `${fmtClip(r.clipSec)} @ ${state.fps} fps`;
  $('rCardTime').textContent = isFinite(r.framesToFill)
    ? `${fmtDuration(r.secToFill)} (${fmtInt(r.framesToFill)} frames)`
    : '—';

  // warnings
  const warns = [];
  if (r.I <= 0) warns.push('Interval is zero — nothing will be captured.');
  if (r.b > 1 && r.I < r.burstSec)
    warns.push(`A ${r.b}-shot bracket needs roughly ${r.burstSec}s or more per frame (longest exposure + write time). Your ${r.I}s interval may not keep up.`);
  if (fill > 1) warns.push(`Card fills at about ${fmtClock(new Date(r.start.getTime() + r.secToFill * 1000))} — bring a bigger card, shoot JPEG, or lengthen the interval.`);
  if (r.frames > 0 && r.clipSec < 5) warns.push(`Only ${fmtClip(r.clipSec)} of footage — consider a shorter interval or longer window.`);
  const wb = $('warnBox');
  wb.hidden = !warns.length;
  wb.innerHTML = warns.map((w) => `<p>${w}</p>`).join('');

  // dock
  $('dFrames').textContent = fmtInt(r.frames);
  $('dSpace').textContent = fmtBytes(r.bytes);
  $('dSpace').classList.toggle('bad', fill > 1);
  $('dDone').textContent = r.frames ? fmtClock(r.done) : '—';

  store({
    bracket: state.bracket, format: state.format, cardGB: state.cardGB, fps: state.fps,
    sizeRaw: state.sizeRaw, sizeJpeg: state.sizeJpeg,
    intervalSec: state.intervalSec, durationMin: state.durationMin,
  });

  lastResult = r;
}
let lastResult = null;

function summaryText(r) {
  const fmtName = { raw: 'RAW', jpeg: 'JPEG', both: 'RAW+JPEG' }[state.format];
  return [
    `Time lapse: ${fmtClock(r.first)} → ${fmtClock(r.done)} (${fmtDuration(r.durSec)})`,
    `Interval ${fmtDuration(r.I)} · ${r.b > 1 ? r.b + '-shot bracket' : 'no bracketing'} · ${fmtName}`,
    `${fmtInt(r.frames)} frames · ${fmtInt(r.exposures)} exposures · ${fmtBytes(r.bytes)}`,
    `Clip: ${fmtClip(r.clipSec)} @ ${state.fps} fps`,
  ].join('\n');
}

/* ---------- wire up ---------- */
function init() {
  // timing
  fillSelect($('durSel'), CONFIG.durationChoicesMin, state.durationMin, durLabel);
  fillSelect($('intSel'), CONFIG.intervalChoicesSec, state.intervalSec, intLabel);
  state.startMin = roundedNowMin();
  Dial.build();
  Dial.value = state.startMin;
  Dial.paint();

  $('nowBtn').addEventListener('click', () => Dial.glideTo(roundedNowMin()));
  $('durSel').addEventListener('change', () => { update(); Dial.paint(); });
  $('intSel').addEventListener('change', update);

  // capture
  bindSeg('bracketSeg', 'bracket', Number);
  bindSeg('formatSeg', 'format', String);
  bindSeg('cardSeg', 'cardGB', Number);
  bindSeg('fpsSeg', 'fps', Number);
  $('sizeRaw').value = state.sizeRaw;
  $('sizeJpeg').value = state.sizeJpeg;
  ['sizeRaw', 'sizeJpeg'].forEach((id) => $(id).addEventListener('input', update));
  $('resetSizes').addEventListener('click', () => {
    $('sizeRaw').value = CONFIG.fileSizeMB.raw;
    $('sizeJpeg').value = CONFIG.fileSizeMB.jpeg;
    update();
  });

  // copy
  $('copyBtn').addEventListener('click', async () => {
    if (!lastResult) return;
    const txt = summaryText(lastResult);
    try { await navigator.clipboard.writeText(txt); flash('Copied'); }
    catch (e) { flash('Copy failed'); }
  });

  // live clock (also keeps the "now" marker and day tags fresh)
  const tick = () => { $('nowClock').textContent = 'now ' + fmtClock(new Date()); };
  tick();
  setInterval(() => { tick(); update(); Dial.paint(); }, 30000);

  update();
}

function flash(msg) {
  const b = $('copyBtn'), old = 'Copy summary';
  b.textContent = msg;
  setTimeout(() => { b.textContent = old; }, 1400);
}

document.addEventListener('DOMContentLoaded', init);
