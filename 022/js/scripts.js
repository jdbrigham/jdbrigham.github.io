$(function(){
	  $('input[type=radio][name=slider]').click(function(){
		if ($(this).is(':checked'))
		{
		  // alert($(this).val());
			if (this.value == 'three') {
				// console.log('to animate');
//				animate();
			}
			else if (this.value != 'three') {
				// console.log('to un-animate');
//				unanimate();
			}
		  
		}
	  });
});

var a = document.getElementById('a');
var b = document.getElementById('b');
var c = document.getElementById('c');
var d = document.getElementById('d');
var e = document.getElementById('e');
var f = document.getElementById('f');
var g = document.getElementById('g');
var h = document.getElementById('h');
var i = document.getElementById('i');
var j = document.getElementById('j');
var k = document.getElementById('k');

function animate() {
//  console.log('clicked');
  a.classList.add("a_tilted");
  b.classList.add("b_tilted");
  c.classList.add("c_tilted");
  d.classList.add("d_tilted");
  e.classList.add("e_tilted");
  f.classList.add("f_tilted");
  g.classList.add("g_tilted");
  h.classList.add("h_tilted");
  i.classList.add("i_tilted");
  j.classList.add("j_tilted");
  k.classList.add("k_tilted");
}

function unanimate() {
//  console.log('clicked');
  a.classList.remove("a_tilted");
  b.classList.remove("b_tilted");
  c.classList.remove("c_tilted");
  d.classList.remove("d_tilted");
  e.classList.remove("e_tilted");
  f.classList.remove("f_tilted");
  g.classList.remove("g_tilted");
  h.classList.remove("h_tilted");
  i.classList.remove("i_tilted");
  j.classList.remove("j_tilted");
  k.classList.remove("k_tilted");
}



$('input[type=radio][name=layout]').change(function() 
										   {
    if (this.value == 'first') {
        console.log(this.value);
		$("#s1").prop("checked", true);
    }
    else if (this.value == 'second') {
        console.log(this.value);
		$("#s2").prop("checked", true);
    }
	else if (this.value == 'third') {
        console.log(this.value);
		$("#s3").prop("checked", true);
    }
	else if (this.value == 'fourth') {
        console.log(this.value);
		$("#s4").prop("checked", true);
    }
	else if (this.value == 'fifth') {
        console.log(this.value);
		$("#s5").prop("checked", true);
    }
	else if (this.value == 'sixth') {
        console.log(this.value);
		$("#s4").prop("checked", true);
    }
	else if (this.value == 'seventh') {
        console.log(this.value);
		$("#s2").prop("checked", true);
    }
});