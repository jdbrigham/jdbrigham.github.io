let theSound = document.getElementById("wavesound");
var interval;
var delay = 2;
let theRain = document.getElementById("rain");
let theVideo = document.getElementById("topVid");
const open = document.getElementById('open');
const close = document.getElementById('close');
const sidebar = document.getElementById('sidebar');
var bgImages = ["img/clouds/Cirrus_Transparent_PNG_Clip_Art_Image.png","img/clouds/clouds-best-clipart-28.png","img/clouds/fog2a.png","img/clouds/IMG_1109.png","img/clouds/IMG_1558.png","img/clouds/IMG_1573.png","img/clouds/IMG_2790.png","img/clouds/Stratus_Cloud_PNG_Clipart-877.png","img/clouds/sunset.png"];

        let bgLength = bgImages.length;
        let item = 0;

$( document ).ready(function() {
			jQuery('.player').on('click', function () {
				if(jQuery(this).hasClass('active')) {
                    jQuery(this).find('audio').trigger('pause');
					jQuery(this).removeClass('active');
				} else {
					jQuery(this).find('audio').trigger('play');
					jQuery(this).addClass('active');
				}
			});

});

// function to generate a random number range.
function randRange( minNum, maxNum) {
  return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain(numdrop) {

	for( i=1;i<numdrop;i++) {
	var dropLeft = randRange(0,1600);
	var dropTop = randRange(-1000,1400);

	$('.rain').append('<div class="drop" id="drop'+i+'"></div>');
	$('#drop'+i).css('left',dropLeft);
	$('#drop'+i).css('top',dropTop);
	}

}
// Make it rain
createRain(850);

$('#myVideo').click(function() {
  if (theVideo.paused == false) {
      theVideo.pause();
      $('#myVideo').text('play');
     // possible way to change speed of video 
      //document.querySelector('video').playbackRate = 3.0;

  } else {
      theVideo.play();
      $('#myVideo').text('pause');
  }
});

//const weeks = ["100","200","300","400","500"];
//
//function onload(week) {
//
//    var nbDrop = week;
    // Make it rain
//    createRain();
//}
//
//weeks.forEach(onload);

//$("#makeRain").click(function(){
//  $("#topVid").toggleClass("rainy");
//  $("#mountains").toggleClass("rainy");
//  $('.rain').css('visibility','visible');
//});


//$("#playpause").click(function(){
//    $("#slow").fadeToggle(759);
//    $("#playpause").text('remove');
//
//});


//$("#stoptherain").click(function(){
//  $(".drop").css("animation-play-state","paused");
////  $('.rain').css('visibility','visible');
//    
//  // $(".rain").fadeOut(5000);
//    $(".drop").each(function(index){
//       
//         // $(this).fadeOut(1000);
//         $(this).delay(100*index).fadeOut(1000);

//$('#checkboxOne :checkbox').change(function() {
//    // this will contain a reference to the checkbox   
//    if (this.checked) {
//        alert("checked") 
//    } else {
//        // the checkbox is now no longer checked
//        alert("unchecked")
//    }
//});
      
//})
//});

$("#menu").click(function(){
//    $("#slow").fadeToggle(759);
//    $("#playpause").text('remove');
    $('.checkbox-group').toggleClass('revealed');

});

open.onclick = () => {
  sidebar.style.left=0;
  open.style.display = 'none';
  close.style.display = 'block';
  
};
close.onclick = () => {
  sidebar.style.left='-406px';
  close.style.display = 'none';
  open.style.display = 'block';
};

    $(".sideCheck").change(function() {
            if(this.checked) {
                $(this).prev().css("fill", "#fff");
                $(this).nextAll("span.sideLabel").css("color", "#fff");
                $('#close').trigger('click');
            }
            else
            {
                $(this).prev().css("fill", "#bbb");
                $(this).nextAll("span.sideLabel").css("color", "#bbb");
            }
            });
    
    $("#sideCheckOne").change(function() {
    if(this.checked) {
//       console.log("checked");
//       theSound.play();
//       $(".container span").css("animation-play-state", "running");
       $(".lake").slideToggle(3000);
       $("#topVid").toggleClass("rainy");
       $("#mountains").toggleClass("rainy");
       $('.rain').css('visibility','visible');
       theRain.play();
    }
    else
    {
      console.log("unchecked");
//      theSound.pause();
//      $(".container span").css("animation-play-state", "paused");
      $(".lake").slideToggle(3000);
      $("#topVid").toggleClass("rainy");
      $("#mountains").toggleClass("rainy");
      $('.rain').css('visibility','hidden');
      theRain.pause();
    }
    });
    
    var svg1 = document.querySelector('#svg830');
    svg1.pauseAnimations(); // pause ALL animations

    
    $("#sideCheckTwo").change(function() {
    if(this.checked) {
       console.log("checked");
       svg1.unpauseAnimations(); // resumes ALL animations
       $('.soundLines').css('stroke','#fff');
    }
    else
    {
      console.log("unchecked");
      svg1.pauseAnimations(); // pause ALL animations
      $('.soundLines').css('stroke','#bbb');

    }
    });

    $("#sideCheckThree").change(function() {
        if(this.checked) {
           console.log('is checked');
                    function loop (delay) {
            swapBF();
            item++
            if (item >= bgLength) {
            item = 0;
            }
//    extend this value to extend time between BF abnd FB
            setTimeout(swapFB,6000)
        }

//  extend this value to create a longer delay between the running of both functions
        interval = setInterval(loop,(delay)*5000)
        }
        else
        {
          console.log('UNchecked');
          // need here a way to stop the animation
            clearInterval(interval);
            console.log('has been stopped');
            $("#bgImg1").fadeOut();
          $("#bgImg2").fadeOut();
        }
    });
    
    $("#sideCheckFour").change(function() {
    if(this.checked) {
       console.log('checked');
       $('.myOverlay').fadeIn(1000);
    }
    else
    {
      console.log('UNchecked');
      $('.myOverlay').fadeOut(1000);
        

    }
    });
    
    $("#sideCheckSix").change(function() {
    if(this.checked) {
       console.log('checked');
        
      $(".umbrella").animate({ 
        top: "-=315px",
      }, 2000 );
      setTimeout(
      function() 
      {
        $('#panel').prop('checked', false); // Unchecks it
      }, 2200);
    }
    else
    {
      console.log('UNchecked');
        $(".umbrella").animate({ 
        top: "+=315px",
      }, 500 );
      $('#panel').prop('checked', true); // Checks it
    }
    });

//    my function to swap the images, back to front
        function swapBF(){
          console.log("running swapBF, to make bgImg2 the visible image");
          $("#bgImg1").fadeToggle(2000);
          $("#bgImg2").fadeToggle(2000);
          setTimeout(
          function() 
          {
           $('#bgImg1').css('background-image', 'url(' + bgImages[item+1] + ')');
          }, 2500);
        }
        
//    my function to swap the images, front to back
        function swapFB(){
          console.log("running swapFB, to make bgImg1 the visible image");
          $("#bgImg1").fadeToggle(2000);
          $("#bgImg2").fadeToggle(2000);
          setTimeout(
          function() 
          {
            $('#bgImg2').css('background-image', 'url(' + bgImages[item+1] + ')');
          }, 2500); 
        }