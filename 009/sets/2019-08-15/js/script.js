// http://www.simonbattersby.com/demos/crossfade_demo_no_slideshow.htm view source
// http://www.simonbattersby.com/blog/simple-jquery-image-crossfade/ read "The logic" section

const crossFadeTime = 1200;
// const pathToImages = "https://github.com/james-priest/local-weather-app/raw/master/images/";
const pathToImages = "../../../ImageSets/2019-08-15/";

var bgImages = [
  "01.jpg",
"02.jpg",
"03.jpg",
"04.jpg",
"05.jpg",
"06.jpg",
"07.jpg",
"08.jpg",
"09.jpg",
"10.jpg",
"11.jpg",
"12.jpg",
"13.jpg",
"14.jpg",
"15.jpg",
"16.jpg",
"17.jpg",
"18.jpg",
"19.jpg",
"20.jpg",
"21.jpg",
"22.jpg",
"23.jpg",
"24.jpg",
"25.jpg",
"26.jpg",
"27.jpg",
"28.jpg",
"29.jpg",
"30.jpg",
"31.jpg",
"32.jpg",
"33.jpg",
"34.jpg",
"35.jpg",
"36.jpg",
"37.jpg",
"38.jpg",
"39.jpg",
"40.jpg",
"41.jpg",
"42.jpg",
"43.jpg",
"44.jpg",
"45.jpg",
"46.jpg",
"47.jpg",
"48.jpg",
"49.jpg",
"50.jpg",
"51.jpg",
"52.jpg",
"53.jpg",
"54.jpg",
"55.jpg"

];

let bgLength = bgImages.length;
let lastElement = bgImages[bgImages.length - 1];
let firstElement = bgImages[0];

var imgTimes = [
  "6:00am",
  "6:15am",
  "6:30am",
  "6:45am",
  "7:00am",
  "7:15am",
  "7:30am",
  "7:45am",
  "8:00am",
  "8:15am",
  "8:30am",
  "8:45am",
  "9:00am",
  "9:15am",
  "9:30am",
  "9:45am",
  "10:00am",
  "10:15am",
  "10:30am",
  "10:45am",
  "11:00am",
  "11:15am",
  "11:30am",
  "11:45am",
  "12:00pm",
  "12:15pm",
  "12:30pm",
  "12:45pm",
  "1:00pm",
  "1:15pm",
  "1:30pm",
  "1:45pm",
  "2:00pm",
  "2:15pm",
  "2:30pm",
  "2:45pm",
  "3:00pm",
  "3:15pm",
  "3:30pm",
  "3:45pm",
  "4:00pm",
  "4:15pm",
  "4:30pm",
  "4:45pm",
  "5:00pm",
  "5:15pm",
  "5:30pm",
  "5:45pm",
  "6:00pm",
  "6:15pm",
  "6:30pm",
  "6:45pm",
  "7:00pm",
  "7:15pm",
  "7:30pm"

];

// my variables for moving the sun icon
let viewportWidth = window.innerWidth;
var myImgIncrement = Math.ceil((viewportWidth/bgLength)-3);
var myStartingPoint = 48;
var myStartingPointTop = 90;
var myUpIncrement = 3;
var rotate = 22;

// shortcut variables for updating the progress bar
var myDiv = document.querySelector(".ratio-main");
var myDivBG = document.querySelector(".ratio-background");
var currWidthBG = myDivBG.clientWidth;

// cross-fade engine
function crossFadeImages() {
  var $front = $("#background-images .front");
  var $back = $("#background-images .back");
  $front.fadeOut(crossFadeTime, function() {
    //fade out the top image
    $front.addClass("back").removeClass("front").show(); //remove class which resets z-index to 1 and unhide the image (which is now behind 'back') with show()
    $back.addClass("front").removeClass("back"); // give new image z-index of 3 from z-index 2
  });
}

  function moveSunRight() {
  // get the current left and top values (requires inline styles)
//  var tmpLeft = parseInt(document.getElementById("myIcon").style.left, 10);
//  var tmpUp = parseInt(document.getElementById("myIcon").style.top, 10);
  //and establish the moves
//  var goRight = (tmpLeft + myImgIncrement);
//  if (tmpLeft <= myMidPoint - myImgIncrement) {
//    var up = (tmpUp - 3);
//  } else {
//    var up = (tmpUp + 3);
//  }
      
  // define variables for updating the progress bar each time the function is invoked
//  var currWidth = myDiv.clientWidth;
//  var myIncrement = (currWidthBG/50);
  
  // make the actual moves
//  document.getElementById("myIcon").style.left = goRight+"px";
//  document.getElementById('myIcon').style.setProperty("top", up+"px");
//  document.getElementById('myIcon').style.transform = 'rotate(' + rotate + 'deg)';
      
  // and now for the sun arc move
  // the reported total length is 1296.08349609375
  // divide that by 54 (number of images) to get 24.0015462239583
  // and then divide that by 100 to use as percentage
  // nope, that's not it
      
  // 
    perc = (perc + .54);
    setPosition(perc)
  // and increment the rotation
//  rotate+=36;
  // and finally update the progress bar
//  alert('currWidth=' + currWidth + ', myIncrement=' + myIncrement);
//  myDiv.style.width = currWidth + myIncrement + "px";
  }

  function moveSunLeft() {
    // get the current left and top values
//    var tmpLeft = parseInt(document.getElementById("myIcon").style.left, 10);
//    var tmpUp = parseInt(document.getElementById("myIcon").style.top, 10);
    //and establish the moves
//    var goLeft = tmpLeft - myImgIncrement;
    // for vertical, determine if ascending or descending
//    if (tmpLeft <= myMidPoint - myImgIncrement) {
//      // alert('less than (adjusted)');
//      var up = (tmpUp + 3);
//    } else {
//      var up = (tmpUp - 3);
//    }
      
      perc = (perc - .54);
      setPosition(perc)
      
    // define variables for updating the progress bar each time the function is invoked
//    var currWidth = myDiv.clientWidth;
//    var myIncrement = (currWidthBG/54);
      
    // make the actual moves
//    document.getElementById("myIcon").style.left = goLeft+"px";
//    document.getElementById('myIcon').style.setProperty("top", up+"px");
//    document.getElementById('myIcon').style.transform = 'rotate(' + rotate + 'deg)';
    // and increment the rotation
//    rotate-=87;
    // and finally update the progress bar
//    myDiv.style.width = currWidth - myIncrement + "px";
    }

$(document).ready(function() {
  // pre-load bgImages
  for (var i = 0; i < bgImages.length; ++i) {
    var img = new Image();
    img.src = pathToImages + bgImages[i];

    var imgTime = imgTimes[i];
     $('#myTime').html = imgTime;
  }

 // create links
  $("#menu-menu").append('');
  for (let j = 0; j <= bgImages.length - 1; j++) {
    $(".menu-menu").append(
      '<li class="menu-item"><a class="page" href="#" tabindex="1" rel="' + bgImages[j] + '" >' + imgTimes[j] + "</a></li> "
    );
  }
  $(".menu-menu").append('</ul>');

  // click handlers
  $(".control-links a.page").click(function() {

    // remove the inactive class from previous arrow
    document.getElementById('leftArrow').classList.remove('inactive');

    // update the time variable from the clicked element
    var newTime = $(this).text();

    // find out where the chosen time falls in the array of tiems
    var myLoc = imgTimes.indexOf(newTime);
    // alert('myHighestPoint =' + myHighestPoint)
    // figure out how far from the left the icon should be
    var myPosLeft = myStartingPoint + (myLoc * myImgIncrement);
      
    perc = (0 + (.54 * myLoc));
    setPosition(perc);

    // adding in logic for updating the progress bar
    // myLoc will give me a number indicating which item number the chosen time is
    // get the width of the bar, divide by 54 and multiply that by myLoc to get the desired width
      
    // variables for updating the progress bar
    // var myDiv = document.querySelector(".ratio-main");
    // var myDivBG = document.querySelector(".ratio-background");
    // var currWidth = myDiv.clientWidth;
    // var currWidthBG = myDivBG.clientWidth;
    var myIncrement = (currWidthBG/54);
    var myNewWidth = (myIncrement * myLoc);
    myDiv.style.width = myNewWidth + "px";
      
    // for the vertical location we need to determine whether it's ascending or descending
//    if (myLoc <= (HalfNumPhotos - 1) ) {
//      var myPosTop = myStartingPointTop - (myLoc * myUpIncrement);
//    } else {
      // this is maybe where the problem is
      // the problematic math seems to check out for 2:00pm
      // myLocDiff is 5 (32-27)
      // myLocTmp is 75 (90-(5*3))
      // myPosTop is 15 (90-15)
      // but the actual top value should be 24?
//      var myLocDiff = myLoc - HalfNumPhotos;
//      var myLocTmp = myStartingPointTop - (myLocDiff * myUpIncrement);
//      var myPosTop = myStartingPointTop - myLocTmp;
      // alert('myPosTop = ' + myPosTop);
//    }
    // and then we use these calcualted values to set the position of the sun icon
//    document.getElementById("myIcon").style.left = myPosLeft+"px";
//    document.getElementById('myIcon').style.setProperty("top", myPosTop+"px");
//    document.getElementById('myIcon').style.transform = 'rotate(' + rotate + 'deg)';
    // and increment the rotation
//    rotate-=87;

    // fade out/in the current time value
    $("#currTime").fadeOut(400, function () {
      $(this).html(newTime).fadeIn(400);
    });

    if ($("#background-images div.front").attr("rel") !== $(this).attr("rel")) {
      //if clicked link isn't already the active image
      console.log(
        ".front background-image ",
        $(".front").css("background-image")
      );
      $("#background-images div.back").attr("rel", $(this).attr("rel")); // set rel to the image name
      $("#background-images div.back").css(
        "background-image",
        "url('" + pathToImages + $(this).attr("rel") + "')"
      );


      console.log("rel", $(this).attr("rel"));
      console.log(
        "set rel on div.back",
        $("#background-images div.back").css("background-image")
      );

      crossFadeImages();


    }
    return false;
  });
});

  $(".svg-arrow-right").click( function() {

    // remove the inactive class from previous arrow
    document.getElementById('leftArrow').classList.remove('inactive');

    // query the bg1 element to get the background image (full url) and z-index value
    var $bg1 = window.getComputedStyle(document.getElementById("bgImg1"), null).getPropertyValue("background-image");
    var $bgz1 = window.getComputedStyle(document.getElementById("bgImg1"), null).getPropertyValue("z-index");
    // the following line removes the url(' or url(" from the beginning and ") or ') from the end
    $bg1 = $bg1.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    // the following line splits the url at slashes and gets the filename from the end
    bgImage1 = $bg1.split('/').pop();

    // query the bg2 element to get the background image (full url) and z-index value
    var $bg2 = window.getComputedStyle(document.getElementById("bgImg2"), null).getPropertyValue("background-image");
    var $bgz2 = window.getComputedStyle(document.getElementById("bgImg2"), null).getPropertyValue("z-index");
    // the following line removes the url(' or url(" from the beginning and ") or ') from the end
    $bg2 = $bg2.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
    // the following line splits the url at slashes and gets the filename from the end
    bgImage2 = $bg2.split('/').pop();

    // now that we have the bg1 and bg2 file names, I can find where they are in the array
    var imgPos1 = bgImages.indexOf(bgImage1);
    var imgPos2 = bgImages.indexOf(bgImage2);

    // crossfade, swap, existing images
    crossFadeImages();
    // move the sun to the right
    moveSunRight();

    // now prepare for next click of arrow by switching the back image

    if ($bgz1 == 3) {
  	  // alert('bg1 is the front image (' + bgImage1  + ')');

      // add here if to check for last image
      if (bgImage1 == lastElement) {
        // alert('last image');
        // add the inactive class to the right arrow
        document.getElementById('rightArrow').classList.add('inactive');
      }
      var nextImgIndex = (imgPos1 + 1);
      var nextImg = bgImages[nextImgIndex];
      var nextImgTime = imgTimes[nextImgIndex];
      document.getElementById('bgImg2').style.backgroundImage = 'url(' + pathToImages + nextImg + ')';
      // document.getElementById('currTime').innerHTML = nextImgTime;
      $("#currTime").fadeOut(200, function () {
        $("#currTime").html(nextImgTime).fadeIn(200);
      });

  // if not then bg2 must be the front/active image
	 } else {
      // alert('bg2 is the front image (' + bgImage2  + ')');

      // add here if to check for last image
      if (bgImage2 == lastElement) {
        // alert('last image');
        // add the inactive class to the right arrow
        document.getElementById('rightArrow').classList.add('inactive');
      }

      var nextImgIndex = (imgPos2 + 1);
      var nextImg = bgImages[nextImgIndex];
      var nextImgTime = imgTimes[nextImgIndex];
      document.getElementById('bgImg1').style.backgroundImage = 'url(' + pathToImages + nextImg + ')';
      // document.getElementById('currTime').innerHTML = nextImgTime;
      // $('#currTime').hide().html($(this).html()).fadeIn('slow');
      $("#currTime").fadeOut(200, function () {
        $("#currTime").html(nextImgTime).fadeIn(200);
      });
	  }
  });

  $(".svg-arrow-left").click( function() {

      // query the bg1 element to get the background image (full url) and z-index value
      var $bg1 = window.getComputedStyle(document.getElementById("bgImg1"), null).getPropertyValue("background-image");
      var $bgz1 = window.getComputedStyle(document.getElementById("bgImg1"), null).getPropertyValue("z-index");
      // the following line removes the url(' or url(" from the beginning and ") or ') from the end
      $bg1 = $bg1.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      // the following line splits the url at slashes and gets the filename from the end
      bgImage1 = $bg1.split('/').pop();

      // query the bg2 element to get the background image (full url) and z-index value
      var $bg2 = window.getComputedStyle(document.getElementById("bgImg2"), null).getPropertyValue("background-image");
      var $bgz2 = window.getComputedStyle(document.getElementById("bgImg2"), null).getPropertyValue("z-index");
      // the following line removes the url(' or url(" from the beginning and ") or ') from the end
      $bg2 = $bg2.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
      // the following line splits the url at slashes and gets the filename from the end
      bgImage2 = $bg2.split('/').pop();

      // now that we have the bg1 and bg2 file names, I can where they are in the array
      var imgPos1 = bgImages.indexOf(bgImage1);
      var imgPos2 = bgImages.indexOf(bgImage2);

      // crossfade, swap, existing images
      crossFadeImages();
      // move the sun to the left
      moveSunLeft();

      // now prepare for next click of arrow by switching the back image

      if ($bgz1 == 3) {
    	  // alert('bg1 is the front image (' + bgImage1  + ')');

        // add here if to check for first image
        if (bgImage1 == firstElement) {
          // alert('first image');
          // add the inactive class to the left arrow
          document.getElementById('leftArrow').classList.add('inactive');
        }

        var prevImgIndex = (imgPos1 - 1);
        var prevImg = bgImages[prevImgIndex];
        var prevImgTime = imgTimes[prevImgIndex];
        document.getElementById('bgImg2').style.backgroundImage = 'url(' + pathToImages + prevImg + ')';
        // document.getElementById('currTime').innerHTML = prevImgTime;
        // var newTime = $(this).text();
        // alert(newTime);
        $("#currTime").fadeOut(200, function () {
          $("#currTime").html(prevImgTime).fadeIn(200);
        });

    // if not then bg2 must be the front/active image
  	 } else {
        // alert('bg2 is the front image (' + bgImage2  + ')');

        // add here if to check for first image
        if (bgImage2 == firstElement) {
          // alert('first image');
          // add the inactive class to the left arrow
          document.getElementById('leftArrow').classList.add('inactive');
        }

        var prevImgIndex = (imgPos2 - 1);
        var prevImg = bgImages[prevImgIndex];
        var prevImgTime = imgTimes[prevImgIndex];
        document.getElementById('bgImg1').style.backgroundImage = 'url(' + pathToImages + prevImg + ')';
        // document.getElementById('currTime').innerHTML = prevImgTime;
        // $('#currTime').hide().html($(this).html()).fadeIn('slow');
        $("#currTime").fadeOut(200, function () {
          $("#currTime").html(prevImgTime).fadeIn(200);
        });
  	  }
    });

// for using arrows from the keyboard
$(document).keydown(function() {
  // var pages = ["_img-2/02.jpg", "_img-2/03.jpg", "_img-2/04.jpg", "_img-2/05.jpg", "_img-2/06.jpg", "_img-2/07.jpg", "_img-2/08.jpg", "_img-2/09.jpg", "_img-2/10.jpg", "_img-2/11.jpg"];
  // right arrow
  if (event.which === 39) {
    // alert('right arrow clicked');
    $(".svg-arrow-right").trigger('click');
  };
  // left arrow
  if (event.which === 37) {
    // alert('left arrow clicked');
    $(".svg-arrow-left").trigger('click');
  };

});

// code for disappearing

let idleTimer = null;
let idleState = false;

function showFoo(time) {
  clearTimeout(idleTimer);
  if (idleState == true) {
    // $("#currTime").removeClass("inactive");
    $("#myIcon").removeClass("inactive");
    // $(".sunriseTime").removeClass("inactive");
    // $(".sunsetTime").removeClass("inactive");
  }
  idleState = false;
  idleTimer = setTimeout(function() {
    // $("#currTime").addClass("inactive");
    $("#myIcon").addClass("inactive");
    // $(".sunriseTime").addClass("inactive");
    // $(".sunsetTime").addClass("inactive");
    idleState = true;
  }, time);
}

showFoo(2000);

$(window).mousemove(function(){
    showFoo(2000);
});
