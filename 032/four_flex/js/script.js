document.getElementById("twister").addEventListener("click", animate);

document.getElementById("untwister").addEventListener("click", unanimate);

var a = document.getElementById('a');
var b = document.getElementById('b');
var c = document.getElementById('c');
var d = document.getElementById('d');

function animate() {
  console.log('clicked');
  a.classList.add("a_tilted");
  b.classList.add("b_tilted");
  c.classList.add("c_tilted");
  d.classList.add("d_tilted");
}

function unanimate() {
  console.log('clicked');
  a.classList.remove("a_tilted");
  b.classList.remove("b_tilted");
  c.classList.remove("c_tilted");
  d.classList.remove("d_tilted");
}