const progress = document.getElementById("progress");
const timer = document.getElementById("time");
button = document.getElementById("play");

//set the video origin date/time
var myTime = "2017-08-17T06:10:00";
var timeAndDate = moment(myTime).format('MMMM Do YYYY, h:mm:ss a');

// test the above {passed}
// document.getElementById("dateDisplay2").innerHTML = timeAndDate;

function progressLoop() {
  setInterval(function () {
    // this math converts the current time to a progress value for dateDisplay
    // progress.value = Math.round((video.currentTime / video.duration) * 100);

    // update current time value
    var t = Math.round(c1.currentTime);
    var t2 = (3*t);

    // add t (as seconds? minutes?) to the video origin date
    var currTime = moment(myTime).add('minutes', t2).format('h:mm A');
    // document.getElementById("dateDisplay3").innerHTML = currTime;


    timer.innerHTML = currTime;
  });
}


// function playPause() {
//   if (video.paused) {
//     video.play();
//     button.innerHTML = "&#10073;&#10073;";
//   } else {
//     video.pause();
//     button.innerHTML = "►";
//   }
// }

// button.addEventListener("click", playPause);
c1.addEventListener("play", progressLoop);
