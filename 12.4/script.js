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

function hhmmToMin(v) {
  if (!v) return null;
  const [h, m] = v.split(':').map(Number);
  return h * 60 + m;
}
function minToHHMM(min) {
  min = ((Math.round(min) % 1440) + 1440) % 1440;
  return pad(Math.floor(min / 60)) + ':' + pad(min % 60);
}
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

/* ---------- time window ---------- */
function roundedNowMin() {
  const d = new Date();
  return Math.ceil((d.getHours() * 60 + d.getMinutes() + d.getSeconds() / 60) / 5) * 5;
}
function setStartNow() {
  const dur = getDurationMin() || state.durationMin;
  const s = roundedNowMin();
  $('startTime').value = minToHHMM(s);
  $('endTime').value = minToHHMM(s + dur);
  update();
}
function getDurationMin() {
  const s = hhmmToMin($('startTime').value), e = hhmmToMin($('endTime').value);
  if (s == null || e == null) return 0;
  let d = e - s;
  if (d <= 0) d += 1440; // crosses midnight
  return d;
}

/* ---------- interval ---------- */
function getIntervalSec() {
  const m = Math.max(0, Math.min(60, parseInt($('intMin').value, 10) || 0));
  const s = Math.max(0, Math.min(59, parseInt($('intSec').value, 10) || 0));
  return m * 60 + s;
}
function setIntervalSec(total) {
  total = Math.max(1, Math.min(3600, Math.round(total)));
  $('intMin').value = Math.floor(total / 60);
  $('intSec').value = total % 60;
  update();
}

/* ---------- main calculation ---------- */
function compute() {
  const startMin = hhmmToMin($('startTime').value);
  const durMin = getDurationMin();
  const I = getIntervalSec();
  const b = state.bracket;

  const now = new Date();
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  start.setMinutes(startMin ?? 0);
  // If the start time is more than 12h in the past, assume it means tomorrow
  if (now - start > 12 * 3600e3) start.setDate(start.getDate() + 1);

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

  // window
  const startMin = hhmmToMin($('startTime').value);
  const endMin = hhmmToMin($('endTime').value);
  $('nextDay').hidden = !(startMin != null && endMin != null && endMin <= startMin);
  $('tlStart').textContent = fmtClock(r.start);
  $('tlEnd').textContent = fmtClock(new Date(r.start.getTime() + r.durSec * 1000));
  $('tlDur').textContent = fmtDuration(r.durSec);
  // "now" marker on the timeline
  const pct = (r.now - r.start) / (r.durSec * 1000);
  const tlNow = $('tlNow');
  if (r.durSec > 0 && pct >= 0 && pct <= 1) {
    tlNow.style.left = (pct * 100) + '%';
    tlNow.hidden = false;
    $('tlFill').style.width = (pct * 100) + '%';
  } else {
    tlNow.hidden = true;
    $('tlFill').style.width = pct > 1 ? '100%' : '0%';
  }
  document.querySelectorAll('#durChips button').forEach((btn) =>
    btn.classList.toggle('on', Number(btn.dataset.min) === r.durMin));

  // interval
  document.querySelectorAll('#intChips button').forEach((btn) =>
    btn.classList.toggle('on', Number(btn.dataset.sec) === r.I));
  $('intHint').textContent = r.I > 0
    ? `${fmtDuration(r.I)} between frames · ${Math.round(r.I * state.fps)}× speed-up at ${state.fps} fps`
    : 'Set an interval of at least 1 second';

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
  // time window
  const s = roundedNowMin();
  $('startTime').value = minToHHMM(s);
  $('endTime').value = minToHHMM(s + state.durationMin);
  $('nowBtn').addEventListener('click', setStartNow);
  $('startTime').addEventListener('input', () => {
    // keep the same duration when start moves
    const st = hhmmToMin($('startTime').value);
    if (st != null) $('endTime').value = minToHHMM(st + state.durationMin);
    update();
  });
  $('endTime').addEventListener('input', update);
  $('durChips').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    const st = hhmmToMin($('startTime').value) ?? roundedNowMin();
    $('endTime').value = minToHHMM(st + Number(b.dataset.min));
    update();
  });

  // interval
  $('intMin').value = Math.floor(state.intervalSec / 60);
  $('intSec').value = state.intervalSec % 60;
  ['intMin', 'intSec'].forEach((id) => $(id).addEventListener('input', update));
  $('intSec').addEventListener('change', () => setIntervalSec(getIntervalSec() || 1));
  document.querySelectorAll('.step').forEach((btn) => {
    btn.addEventListener('click', () => {
      const d = Number(btn.dataset.delta) * (btn.dataset.target === 'min' ? 60 : 1);
      setIntervalSec(getIntervalSec() + d);
    });
  });
  $('intChips').addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (b) setIntervalSec(Number(b.dataset.sec));
  });

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
  setInterval(() => { tick(); update(); }, 30000);

  update();
}

function flash(msg) {
  const b = $('copyBtn'), old = 'Copy summary';
  b.textContent = msg;
  setTimeout(() => { b.textContent = old; }, 1400);
}

document.addEventListener('DOMContentLoaded', init);
