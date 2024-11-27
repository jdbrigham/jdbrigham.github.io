// http://www.simonbattersby.com/demos/crossfade_demo_no_slideshow.htm view source
// http://www.simonbattersby.com/blog/simple-jquery-image-crossfade/ read "The logic" section

const crossFadeTime = 1200;
// const pathToImages = "https://github.com/james-priest/local-weather-app/raw/master/images/";
const pathToImages = "../../../_ImageSets/2020-08-11/";

var bgImages = [
  "_DSC8216.jpg",
  "_DSC8217.jpg",
  "_DSC8218.jpg",
  "_DSC8219.jpg",
  "_DSC8220.jpg",
  "_DSC8221.jpg",
  "_DSC8222.jpg",
  "_DSC8223.jpg",
  "_DSC8224.jpg",
  "_DSC8225.jpg",
  "_DSC8226.jpg",
  "_DSC8227.jpg",
  "_DSC8228.jpg",
  "_DSC8229.jpg",
  "_DSC8230.jpg",
  "_DSC8231.jpg",
  "_DSC8232.jpg",
  "_DSC8233.jpg",
  "_DSC8234.jpg",
  "_DSC8235.jpg",
  "_DSC8236.jpg",
  "_DSC8237.jpg",
  "_DSC8238.jpg",
  "_DSC8239.jpg",
  "_DSC8240.jpg",
  "_DSC8241.jpg",
  "_DSC8242.jpg",
  "_DSC8243.jpg",
  "_DSC8244.jpg",
  "_DSC8245.jpg",
  "_DSC8246.jpg",
  "_DSC8247.jpg",
  "_DSC8248.jpg",
  "_DSC8249.jpg",
  "_DSC8250.jpg",
  "_DSC8251.jpg",
  "_DSC8252.jpg",
  "_DSC8253.jpg",
  "_DSC8254.jpg",
  "_DSC8255.jpg",
  "_DSC8256.jpg",
  "_DSC8257.jpg",
  "_DSC8258.jpg",
  "_DSC8259.jpg",
  "_DSC8260.jpg",
  "_DSC8261.jpg",
  "_DSC8262.jpg",
  "_DSC8263.jpg",
  "_DSC8264.jpg",
  "_DSC8265.jpg",
  "_DSC8266.jpg",
  "_DSC8267.jpg",
  "_DSC8268.jpg",
  "_DSC8269.jpg",
  "_DSC8270.jpg"

];

var imgTimes = [
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
  "7:30pm",
  "7:45pm"

];

// my variables for moving the sun icon
let viewportWidth = window.innerWidth;
var myImgIncrement = Math.ceil((viewportWidth/54)-3);
var myStartingPoint = 48;
var myStartingPointTop = 90;
var myUpIncrement = 3;
var rotate = 22;

// shortcut variables for updating the progress bar
var myDiv = document.querySelector(".ratio-main");
var myDivBG = document.querySelector(".ratio-background");
var currWidthBG = myDivBG.clientWidth;

  


// find the highest point (not currently used anywhere)
var numPhotos = bgImages.length;
var myHighestPoint = Math.floor((numPhotos/2)/myUpIncrement);

// find the midpoint
var HalfNumPhotos = Math.floor(numPhotos/2);
var myMidPoint = (myStartingPoint + (HalfNumPhotos * myImgIncrement));

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
  var tmpLeft = parseInt(document.getElementById("myIcon").style.left, 10);
  var tmpUp = parseInt(document.getElementById("myIcon").style.top, 10);
  //and establish the moves
  var goRight = (tmpLeft + myImgIncrement);
  if (tmpLeft <= myMidPoint - myImgIncrement) {
    var up = (tmpUp - 3);
  } else {
    var up = (tmpUp + 3);
  }
      
  // define variables for updating the progress bar each time the function is invoked
  var currWidth = myDiv.clientWidth;
  var myIncrement = (currWidthBG/54);
  
  // make the actual moves
  document.getElementById("myIcon").style.left = goRight+"px";
  document.getElementById('myIcon').style.setProperty("top", up+"px");
  document.getElementById('myIcon').style.transform = 'rotate(' + rotate + 'deg)';
  // and increment the rotation
  rotate+=36;
  // and finally update the progress bar
//  alert('currWidth=' + currWidth + ', myIncrement=' + myIncrement);
  myDiv.style.width = currWidth + myIncrement + "px";
  }

  function moveSunLeft() {
    // get the current left and top values
    var tmpLeft = parseInt(document.getElementById("myIcon").style.left, 10);
    var tmpUp = parseInt(document.getElementById("myIcon").style.top, 10);
    //and establish the moves
    var goLeft = tmpLeft - myImgIncrement;
    // for vertical, determine if ascending or descending
    if (tmpLeft <= myMidPoint - myImgIncrement) {
      // alert('less than (adjusted)');
      var up = (tmpUp + 3);
    } else {
      var up = (tmpUp - 3);
    }
      
    // define variables for updating the progress bar each time the function is invoked
    var currWidth = myDiv.clientWidth;
    var myIncrement = (currWidthBG/54);
      
    // make the actual moves
    document.getElementById("myIcon").style.left = goLeft+"px";
    document.getElementById('myIcon').style.setProperty("top", up+"px");
    document.getElementById('myIcon').style.transform = 'rotate(' + rotate + 'deg)';
    // and increment the rotation
    rotate-=87;
    // and finally update the progress bar
    myDiv.style.width = currWidth - myIncrement + "px";
    }

$(document).ready(function() {
  // pre-load bgImages
  for (var i = 0; i < bgImages.length; ++i) {
    var img = new Image();
    img.src = pathToImages + bgImages[i];

    var imgTime = imgTimes[i];
    // $('#myTime').html = imgTime;
  }

  // create links
  $("#main").append('<div class="control-links">');
  for (let j = 0; j <= bgImages.length - 1; j++) {
    $(".control-links").append(
      '<a class="page" href="#" tabindex="1" rel="' + bgImages[j] + '" >' + imgTimes[j] + "</a> "
    );
  }
  $("#main").append("</div>").addClass("cycler");



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
    if (myLoc <= (HalfNumPhotos - 1) ) {
      var myPosTop = myStartingPointTop - (myLoc * myUpIncrement);
    } else {
      // this is maybe where the problem is
      // the problematic math seems to check out for 2:00pm
      // myLocDiff is 5 (32-27)
      // myLocTmp is 75 (90-(5*3))
      // myPosTop is 15 (90-15)
      // but the actual top value should be 24?
      var myLocDiff = myLoc - HalfNumPhotos;
      var myLocTmp = myStartingPointTop - (myLocDiff * myUpIncrement);
      var myPosTop = myStartingPointTop - myLocTmp;
      // alert('myPosTop = ' + myPosTop);
    }
    // and then we use these calcualted values to set the position of the sun icon
    document.getElementById("myIcon").style.left = myPosLeft+"px";
    document.getElementById('myIcon').style.setProperty("top", myPosTop+"px");
    document.getElementById('myIcon').style.transform = 'rotate(' + rotate + 'deg)';
    // and increment the rotation
    rotate-=87;

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
      if (bgImage1 == '_DSC8270.jpg') {
        // alert('last image');
        // add the inactive class to the right arrow
        document.getElementById('rightArrow').classList.add('inactive');
      }
      var nextImgIndex = (imgPos1 + 1);
      var nextImg = bgImages[nextImgIndex];
      var nextImgTime = imgTimes[nextImgIndex];
      document.getElementById('bgImg2').style.backgroundImage = 'url(../../../_ImageSets/2020-08-11/' + nextImg + ')';
      // document.getElementById('currTime').innerHTML = nextImgTime;
      $("#currTime").fadeOut(200, function () {
        $("#currTime").html(nextImgTime).fadeIn(200);
      });

  // if not then bg2 must be the front/active image
	 } else {
      // alert('bg2 is the front image (' + bgImage2  + ')');

      // add here if to check for last image
      if (bgImage2 == '_DSC8270.jpg') {
        // alert('last image');
        // add the inactive class to the right arrow
        document.getElementById('rightArrow').classList.add('inactive');
      }

      var nextImgIndex = (imgPos2 + 1);
      var nextImg = bgImages[nextImgIndex];
      var nextImgTime = imgTimes[nextImgIndex];
      document.getElementById('bgImg1').style.backgroundImage = 'url(../../../_ImageSets/2020-08-11/' + nextImg + ')';
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
        if (bgImage1 == '_DSC8216.jpg') {
          // alert('first image');
          // add the inactive class to the left arrow
          document.getElementById('leftArrow').classList.add('inactive');
        }

        var prevImgIndex = (imgPos1 - 1);
        var prevImg = bgImages[prevImgIndex];
        var prevImgTime = imgTimes[prevImgIndex];
        document.getElementById('bgImg2').style.backgroundImage = 'url(../../../_ImageSets/2020-08-11/' + prevImg + ')';
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
        if (bgImage2 == '_DSC8216.jpg') {
          // alert('first image');
          // add the inactive class to the left arrow
          document.getElementById('leftArrow').classList.add('inactive');
        }

        var prevImgIndex = (imgPos2 - 1);
        var prevImg = bgImages[prevImgIndex];
        var prevImgTime = imgTimes[prevImgIndex];
        document.getElementById('bgImg1').style.backgroundImage = 'url(../../../_ImageSets/2020-08-11/' + prevImg + ')';
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
