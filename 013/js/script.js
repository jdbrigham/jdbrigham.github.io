playPauseElement = document.getElementById("play-pause");
c1Element = document.getElementById("c1");

playPauseElement.addEventListener("click", function() {
  if(playPauseElement.dataset.state == "paused") {
    c1Element.style.display = "block";
    c1.play();
    playPauseElement.dataset.state = "playing";
    playPauseElement.innerHTML = "Pause";
  } else {
    c1.pause();
    playPauseElement.dataset.state = "paused";
    playPauseElement.innerHTML = "Play";
  }
}, false);
