const cube = document.querySelector(".cube");
const cubeanimation = document.querySelector(".animation");
const playIcon = document.querySelector(".play-icon");
const pauseIcon = document.querySelector(".pause-icon");
const toggleButton = document.querySelector(".toggle-button");

// cube.style.animationPlayState = "paused";

function toggleRotation() {
 const animationState = getComputedStyle(cubeanimation).animationPlayState;
	
//check if it has the 'animation' class
//if (!document.querySelector(".cube").classList.contains("animation")) {
      //console.log('nope - add and click');
	  //document.getElementById("myTest").click();
	  //cube.classList.add('animation');
	  //cubeanimation.style.animationPlayState = "running";
      //playIcon.style.display = "none";
      //pauseIcon.style.display = "inline-block";
    //}

  if (animationState === "running") {
    console.log("it is the IF");
	cubeanimation.style.animationPlayState = "paused";
	//document.getElementById("myCheck").click();
	// cube.classList.remove("animation");
    playIcon.style.display = "inline-block";
    pauseIcon.style.display = "none";
  } else {
    console.log("it is the ELSE");
	// cube.classList.remove("animation");
	cubeanimation.style.animationPlayState = "running";
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline-block";
  }
}

//function toggleRotationTwo() {
// // cube.toggleClass("animation");
// $('.cube').toggleClass("animation");
//}

// Event listener for spacebar and button click
document.addEventListener("keydown", (event) => {
  if (
    event.code === "Space" ||
    (event.target === toggleButton && event.type === "click")
  ) {
    event.preventDefault();
    toggleRotation();
  }
});

// Prevent spacebar from scrolling the page
window.addEventListener("keydown", (event) => {
  if (event.code === "Space" && event.target === document.body) {
    event.preventDefault();
  }
});

let int = 1;

setInterval(function() {
	$('.front').css('background-image','url(photos/astro0'+int+'.png)');
	$('.left').css('background-image','url(photos/benjamin0'+int+'.png)');
	int++
	if (int == 4) {
  		int=1
	}
}, 6000);

var offset = 0, startX;
var elem = document.getElementById("element");
var thecube = document.getElementById("thecube");

$('.draggable').on('pointerdown', function (e) {
        startX = e.pageX - offset;
	    //thecube.classList.remove("animation");
    })
    .on('pointerup', function() {
        startX = null;
	    
    })
    .on('pointermove', function (e) {
        if(startX) {
           offset = e.pageX - startX;
		  
		   thecube.style['transform'] = 'rotateX(' + offset + 'deg) rotateY(' + offset + 'deg)';
        }
    });


$('#switchcontainer label').click(function() {
  // console.log($(this).val());
  // console.log('Value: '.concat($(this).prev().val(), '  Name: ', $(this).prev().attr('name')));
  if ($(this).prev().val() == "manual") {
  	console.log('switch is set to manual (fade the play button and remove class animation)');
	$('#abutton').css('opacity', '0.2');
	$('.cube').removeClass("animation");
	$('body').css('cursor', 'grab');
  } else {
  	console.log('switch is set to auto');
	$('#abutton').css('opacity', '1.0');
	$('.cube').addClass("animation");
	$('body').css('cursor', 'default');
  }
});