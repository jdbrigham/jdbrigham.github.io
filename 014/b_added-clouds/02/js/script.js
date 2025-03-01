//let text = document.getElementById("text");
//window.addEventListener("scroll", function () {
//	let value = window.scrollY;
//	text.style.fontSize = value * 1 + "px";
//});

$(".tiptext").mouseover(function() {
    $(this).children(".description").show();
}).mouseout(function() {
    $(this).children(".description").hide();
});


function changeBackgroundColor() {
	let slider = document.getElementById("myRange");
	let value = slider.value;
	let color = 'hsl(' + value + ', 100%, 50%)';
	document.body.style.background = color;
}


const gradientBox = document.getElementsByTagName('body')[0];
  const gradientSlider = document.getElementById('myRange');

  gradientSlider.addEventListener('input', function() {
    const shiftValue = gradientSlider.value;
    gradientBox.style.background = `linear-gradient(to right, red ${shiftValue}%, blue ${shiftValue}%)`;
  });


//using button to pause animation

const pauseButton = document.getElementById("pauseButton");

const animatedElement = document.querySelector("body");



pauseButton.addEventListener("click", () => {
  console.log('clicked');
  if (animatedElement.style.animationPlayState === "running") {

    animatedElement.style.animationPlayState = "paused";

  } else {

    animatedElement.style.animationPlayState = "running";

  }

});
