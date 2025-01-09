$('.card-cont').on('dblclick', function () {
  $('.card').toggleClass('flipped');
  $('.rangeValues').hide();
});

$('#flipIcon').on('click', function () {
  $('.card').toggleClass('flipped');
  $('.rangeValues').hide();
});

//for the back side range slider and scale

    // round current time up to nearest 5 minutes
    var coeff = 1000 * 60 * 5;
    var date = new Date();  //or use any other date
    var rounded = new Date(Math.ceil(date.getTime() / coeff) * coeff);

    // format it to h:mm ampm
    rounded = rounded.toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'});

    // starting from the current date-time, create a series for the scale
    var itemOne = rounded;
    var itemTwo = timeAdjustment(date, 1);
    var itemThree = timeAdjustment(date, 1);
    var itemFour = timeAdjustment(date, 1);
    var itemFive = timeAdjustment(date, 1);
    var itemSix = timeAdjustment(date, 1);
    var itemSeven = timeAdjustment(date, 1);

    // 
    var theScaleBack = document.getElementById('myScaleBack');
    var ps = theScaleBack.getElementsByTagName('p');
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

// experiment in getting minutes from midnight
    var now = new Date(),
    then = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,0,0),
     diff = now.getTime() - then.getTime(); //  difference in milliseconds
    var myCalcTimeStart = (millisToMinutesAndSeconds(diff));
    var myCalcTimeEnd = (myCalcTimeStart + 240);
    var myCalcDiff = (myCalcTimeEnd - myCalcTimeStart);
    var myDisplayTimeStart = (toHoursAndMinutesAMPM(myCalcTimeStart));
    var myDisplayTimeEnd = (toHoursAndMinutesAMPM(myCalcTimeEnd));

// set the slider attributes
    document.getElementById('rangeOneBack').min = myCalcTimeStart;
    document.getElementById('rangeOneBack').max = myCalcTimeEnd;
    document.getElementById('rangeTwoBack').min = myCalcTimeStart;
    document.getElementById('rangeTwoBack').max = myCalcTimeEnd;

    document.getElementById('rangeOneBack').value = myCalcTimeStart;
    document.getElementById('rangeTwoBack').value = (myCalcTimeEnd - 40);

//  beginning of the getVals function
function getVals(){

    // Get slider values for the range using new IDs instead
    var rangeOneFront = document.getElementById("rangeOneFront");
    var rangeTwoFront = document.getElementById("rangeTwoFront");
    var slide1Front = parseFloat(rangeOneFront.value);
    var slide2Front = parseFloat(rangeTwoFront.value);
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1Front > slide2Front ){ var tmp = slide2Front; slide2Front = slide1Front; slide1Front = tmp; }
    
    // Get slider values for the range using new IDs instead
    var rangeOneBack = document.getElementById("rangeOneBack");
    var rangeTwoBack = document.getElementById("rangeTwoBack");
    var slide1Back = parseFloat(rangeOneBack.value);
    var slide2Back = parseFloat(rangeTwoBack.value);
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1Back > slide2Back ){ var tmp = slide2Back; slide2Back = slide1Back; slide1Back = tmp; }
    
    
    // figure out how many minutes between start and end (the duration in minutes)
    var minDiffFront = (slide2Front - slide1Front);
    
    // figure out how many minutes between start and end (the duration in minutes)
    var minDiffBack = (slide2Back - slide1Back);
    
    // create variables
    var startTimeFront = toHoursAndMinutesAMPM(slide1Front);
    var endTimeFront = toHoursAndMinutesAMPM(slide2Front);
    var totalHoursFront = (toHoursAndMinutesDec(minDiffFront));
    
    // create variables
    var startTimeBack = toHoursAndMinutesAMPM(slide1Back);
    var endTimeBack = toHoursAndMinutesAMPM(slide2Back);
    var totalHoursBack = (toHoursAndMinutesDec(minDiffBack));
    
    // display times at end
//    document.getElementById("myEndTime").innerHTML = "Will be done at " + endTimeFront;
    
    // display the results as a range
    document.getElementById("timeMeridiem").innerHTML = (toHoursAndMinutesAMPM(slide1Front))+ " - " + (toHoursAndMinutesAMPM(slide2Front));
    
    // display the results as a duration in decimal hours
    document.getElementById("myInfo").innerHTML = (toHoursAndMinutesDec(minDiffFront));
    
    // get and display slider values for the hours
    var theHoursFront = document.getElementById("hoursInputFront");
 document.getElementById("hoursResultsFront").innerHTML = (parseFloat(theHoursFront.value));
    
    var theHoursBack = document.getElementById("hoursInputBack");
 document.getElementById("hoursResultsBack").innerHTML = "0";
    
    // get and display slider values for the minutes
    var theMinutesFront = document.getElementById("minutesInputFront");
 document.getElementById("minutesResultsFront").innerHTML = (parseFloat(theMinutesFront.value));
    
    var theMinutesBack = document.getElementById("minutesInputBack");
 document.getElementById("minutesResultsBack").innerHTML = (parseFloat(theMinutesBack.value));
    
    // get and display slider values for the seconds
    var theSecondsFront = document.getElementById("secondsInputFront");
    document.getElementById("secondsResultsFront").innerHTML = (parseFloat(theSecondsFront.value));
    
    var theSecondsBack = document.getElementById("secondsInputBack");
    document.getElementById("secondsResultsBack").innerHTML = (parseFloat(theSecondsBack.value));

    // create variables
    var startTimeFront = toHoursAndMinutesAMPM(slide1Front);
    var endTimeFront = toHoursAndMinutesAMPM(slide2Front);
    var totalHoursFront = (toHoursAndMinutes(minDiffFront));
    
    var startTimeBack = toHoursAndMinutesAMPM(slide1Back);
    var endTimeBack = toHoursAndMinutesAMPM(slide2Back);
    var totalHoursBack = (toHoursAndMinutes(minDiffBack));
    
    // now we need to get a total number of seconds 
    var myTotalSecondsFront = 
        ((parseFloat(theHoursFront.value)*3600))
         + ((parseFloat(theMinutesFront.value)*60))
        + ((parseFloat(theSecondsFront.value)));
    
    // now we need to get a total number of seconds 
    var myTotalSecondsBack = 
        ((parseFloat(0)*3600))
         + ((parseFloat(theMinutesBack.value)*60))
        + ((parseFloat(theSecondsBack.value)));
    
    
    
    // figure out how many shots/hour
	var shotsPerHourFront = (Math.ceil(1 / (myTotalSecondsFront / 3600)));
    shotsPerHourFront = isFinite(shotsPerHourFront) ? shotsPerHourFront : 0.0;
    
    // figure out how many shots/hour
	var shotsPerHourBack = (Math.ceil(1 / (myTotalSecondsBack / 3600)));
    shotsPerHourBack = isFinite(shotsPerHourBack) ? shotsPerHourBack : 0.0;
    
    //figure out how many total shots
    var totalHoursDecFront = (toHoursAndMinutesDec(minDiffFront));
    var totalShotsFront = (Math.ceil(shotsPerHourFront * totalHoursDecFront));
//    console.log(totalShots);
    totalShotsFront = isFinite(totalShotsFront) ? totalShotsFront : 0.0;
    
    //figure out how many total shots
    var totalHoursDecBack = (toHoursAndMinutesDec(minDiffBack));
    var totalShotsBack = (Math.ceil(shotsPerHourBack * totalHoursDecBack));
//    console.log(totalShots);
    totalShotsBack = isFinite(totalShotsBack) ? totalShotsBack : 0.0;
    
    // eventual video duration (total shots / fps)
    var videoDurationFront = Math.ceil(totalShotsFront/30);
    var videoDurationBack = Math.ceil(totalShotsBack/30);
    
    document.getElementById('dispValueOne').innerHTML = startTimeBack;
    document.getElementById('dispValueTwo').innerHTML = endTimeBack;
    document.getElementById('dispDifference').innerHTML = totalHoursBack;
    

    
    document.getElementById("myCalculationsFront").innerHTML = totalShotsFront + " shots (" + shotsPerHourFront + "/hour)" + " over " + totalHoursFront + ", ending at " + endTimeFront + ".<br />" + "Final video duration (at 30 fps):<br />" + videoDurationFront + " seconds.";
    
    document.getElementById("myCalculationsBack").innerHTML = totalShotsBack + " shots (" + shotsPerHourBack + "/hour)" + " over " + totalHoursBack + ", ending at " + endTimeBack + ".<br />" + "Final video duration (at 30 fps):<br />" + videoDurationBack + " seconds.";
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