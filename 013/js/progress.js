// scripts for the progress bar
      var vid = document.getElementById("c1");
    vid.ontimeupdate = function(){
    var percentage = ( vid.currentTime / vid.duration ) * 100;
    $("#custom-seekbar span").css("width", percentage+"%");
    };

    const newProgress = document.getElementById("progress");
    const newVideo = document.getElementById("c1");

    function progressLoop() {
      setInterval(function () {
        newProgress.value = Math.round((newVideo.currentTime / newVideo.duration) * 100);
      });
    }
    newVideo.addEventListener("play", progressLoop);
