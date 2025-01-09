// beginning of the scroll reveal function
    $(function(){
     var shrinkHeader = 300;
      $(window).scroll(function() {
        var scroll = getCurrentScroll();
          if ( scroll >= shrinkHeader ) {
               $('header').addClass('shrink');
            }
            else {
                $('header').removeClass('shrink');
            }
      });
    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop;
        }
    });
// end of the scroll reveal function

    // round current time up to nearest 5 minutes
    var coeff = 1000 * 60 * 5;
    var date = new Date();  //or use any other date
    var rounded = new Date(Math.ceil(date.getTime() / coeff) * coeff);

    // format it to h:mm ampm
    rounded = rounded.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});

    // and add it to the page
//    document.getElementById('currentStart').innerHTML = rounded;

// starting from the current date-time, create a series for the scale
    var itemOne = rounded;
    var itemTwo = timeAdjustment(date, 1);
    var itemThree = timeAdjustment(date, 1);
    var itemFour = timeAdjustment(date, 1);
    var itemFive = timeAdjustment(date, 1);
    var itemSix = timeAdjustment(date, 1);
    var itemSeven = timeAdjustment(date, 1);

    // 
    var theScale = document.getElementById('myScale');
    var ps = theScale.getElementsByTagName('p');
    // set variables for each child element
    var minusOne = ps[0]; //take the first element
    var myNow = ps[1]; //take the second element (now)
    var plusOne = ps[2]; //take the third element
    var plusTwo = ps[3]; //take the fourth element
    var plusThree = ps[4]; // take the fifth element
    var plusFour = ps[5]; // take the sixth element
    var plusFive = ps[6]; // take the seventh element

    // and populate for the scale
    minusOne.innerHTML = itemOne;
    myNow.innerHTML = itemTwo;
    plusOne.innerHTML = itemThree;
    plusTwo.innerHTML = itemFour;
    plusThree.innerHTML = itemFive;
//    plusFour.innerHTML = itemSix;
//    plusFive.innerHTML = itemSeven;

// experiment in getting minutes from midnight
    var now = new Date(),
    then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0),
     diff = now.getTime() - then.getTime(); //  difference in milliseconds
//    diff = 30956202;
//    console.log(millisToMinutesAndSeconds(diff));
    var myCalcTimeStart = (millisToMinutesAndSeconds(diff));
    var myCalcTimeEnd = (myCalcTimeStart + 240);
    var myCalcDiff = (myCalcTimeEnd - myCalcTimeStart);
    var myDisplayTimeStart = (toHoursAndMinutesAMPM(myCalcTimeStart));
    var myDisplayTimeEnd = (toHoursAndMinutesAMPM(myCalcTimeEnd));

// set the slider attributes
    document.getElementById('rangeOne').min = myCalcTimeStart;
    document.getElementById('rangeOne').max = myCalcTimeEnd;
    document.getElementById('rangeTwo').min = myCalcTimeStart;
    document.getElementById('rangeTwo').max = myCalcTimeEnd;

// display the results
//    document.getElementById('slideOneValue').innerHTML = myDisplayTimeStart;
//    document.getElementById('slideTwoValue').innerHTML = myDisplayTimeEnd;

    document.getElementById('rangeOne').value = myCalcTimeStart;
    document.getElementById('rangeTwo').value = (myCalcTimeEnd - 40);

//    document.getElementById('theDifference').innerHTML = minDiff;

//  beginning of the getVals function
function getVals(){

    // Get slider values for the range using new IDs instead
    var rangeOne = document.getElementById("rangeOne");
    var rangeTwo = document.getElementById("rangeTwo");
    var slide1 = parseFloat(rangeOne.value);
    var slide2 = parseFloat(rangeTwo.value);
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
    
    
    // figure out how many minutes between start and end (the duration in minutes)
    var minDiff = (slide2 - slide1);
    
    // get and display slider values for the minutes
    var theMinutes = document.getElementById("minutesInput");
 document.getElementById("minutesResults").innerHTML = (parseFloat(theMinutes.value));
    
    // get and display slider values for the seconds
    var theSeconds = document.getElementById("secondsInput");
    document.getElementById("secondsResults").innerHTML = (parseFloat(theSeconds.value));

    // create variables
    var startTime = toHoursAndMinutesAMPM(slide1);
    var endTime = toHoursAndMinutesAMPM(slide2);
    var totalHours = (toHoursAndMinutes(minDiff));
    
    // now we need to get a total number of seconds (updating for minutes and seconds only)
//    var myTotalSeconds = 
//        ((parseFloat(theHours.value)*3600))
//         + ((parseFloat(theMinutes.value)*60))
//        + ((parseFloat(theSeconds.value)));
    var myTotalSeconds = 
        ((parseFloat(theMinutes.value)*60))
        + ((parseFloat(theSeconds.value)));
    
    
    // figure out how many shots/hour
	var shotsPerHour = (Math.ceil(1 / (myTotalSeconds / 3600)));
    shotsPerHour = isFinite(shotsPerHour) ? shotsPerHour : 0.0;
    
    //figure out how many total shots
    var totalHoursDec = (toHoursAndMinutesDec(minDiff));
    var totalShots = (Math.ceil(shotsPerHour * totalHoursDec));
//    console.log(totalShots);
    totalShots = isFinite(totalShots) ? totalShots : 0.0;
    
    // eventual video duration (total shots / fps)
    var videoDuration = (totalShots/30);
    
    document.getElementById('dispValueOne').innerHTML = startTime;
    document.getElementById('dispValueTwo').innerHTML = endTime;
    document.getElementById('dispDifference').innerHTML = totalHours;
    

    
    document.getElementById("myCalculations").innerHTML = totalShots + " shots (" + shotsPerHour + "/hour)" + " over " + totalHours + ", ending at " + endTime + ".<br />" + "Final video duration at 30 fps will be " + videoDuration + " seconds.";
}
//  end of the getVals function

// new function for adjusting time and formatting it
function timeAdjustment(time, adjustment) {
//    alert(time);
    var coeff = 1000 * 60 * 5;
    var sliderStart = new Date();  //or use any other date
    time.setHours(time.getHours() + adjustment);
    var time = new Date(Math.ceil(time.getTime() / coeff) * coeff);
    time = time.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});
//    console.log(time);
    return time;
}

// function to update from slider actions
window.onload = function(){
  // Initialize Sliders
  var sliderSections = document.getElementsByClassName("range-slider");
      for( var x = 0; x < sliderSections.length; x++ ){
        var sliders = sliderSections[x].getElementsByTagName("input");
        for( var y = 0; y < sliders.length; y++ ){
          if( sliders[y].type ==="range" ){
            sliders[y].oninput = getVals;
            // Manually trigger event first time to display values
            sliders[y].oninput();
          }
        }
      }
}

// functions for minutes to time conversion

// first, to return a duration
function toHoursAndMinutes(totalMinutes) {
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return `${hours}h ${minutes}m`;
}

// and now a variation to return a time format
function toHoursAndMinutesAMPM(totalMinutes) {
  const minutes = totalMinutes % 60;
    
  const decimalMinutes = (totalMinutes/60);
  
  const hours = Math.floor(totalMinutes / 60);

  const results =  `${padTo2Digits(hours)}:${padTo2Digits(minutes)}`;
const [hourString, minute] = results.split(":");
const hour = +hourString % 24;
return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "am" : "pm");
}

// and one more to get decimal hours
function toHoursAndMinutesDec(totalMinutes) {
    const decimalMinutes = (totalMinutes/60);
    return decimalMinutes;
}

function padTo2Digits(num) {
  return num.toString().padStart(2, '0');
}

// new function to convert milliseconds to minutes
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.ceil(millis / 60000);
  minutes = (Math.ceil((minutes/5))*5);
    
    
//  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes;
}