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

//  beginning of the getVals function for getting values from any input slider
function getVals(){
    // Get slider values for the range 
//    var parent = this.parentNode;
//    var slides = parent.getElementsByTagName("input");
//    var slide1 = parseFloat( slides[0].value );
//    var slide2 = parseFloat( slides[1].value );
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
    
    // Get slider values for the range using new IDs instead
    var rangeOne = document.getElementById("rangeOne");
    var rangeTwo = document.getElementById("rangeTwo");
    var slide1 = parseFloat(rangeOne.value);
    var slide2 = parseFloat(rangeTwo.value);
    // Neither slider will clip the other, so make sure we determine which is larger
    if( slide1 > slide2 ){ var tmp = slide2; slide2 = slide1; slide1 = tmp; }
    
    
    // figure out how many minutes between start and end (the duration in minutes)
    var minDiff = (slide2 - slide1);

    // create variables
    var startTime = toHoursAndMinutesAMPM(slide1);
    var endTime = toHoursAndMinutesAMPM(slide2);
    var totalHours = (toHoursAndMinutesDec(minDiff));
    
    // display times at end
//    document.getElementById("myStartTime").innerHTML = startTime;
//    document.getElementById("myEndTime").innerHTML = "Will be done at " + endTime;
    
    // . display the results as a range
    document.getElementById("timeMeridiem").innerHTML = (toHoursAndMinutesAMPM(slide1))+ " - " + (toHoursAndMinutesAMPM(slide2));
    
    // display the results as a duration in decimal hours
    document.getElementById("myInfo").innerHTML = (toHoursAndMinutesDec(minDiff));
    
    // get and display slider values for the hours
    var theHours = document.getElementById("hoursInput");
    document.getElementById("hoursResults").innerHTML = (parseFloat(theHours.value));
    
    // get and display slider values for the hours
    var theMinutes = document.getElementById("minutesInput");
 document.getElementById("minutesResults").innerHTML = (parseFloat(theMinutes.value));
    
    // get and display slider values for the seconds
    var theSeconds = document.getElementById("secondsInput");
    document.getElementById("secondsResults").innerHTML = (parseFloat(theSeconds.value));
    
    // how we need to add them all together to get a total number of seconds
    var myTotalSeconds = 
        ((parseFloat(theHours.value)*3600))
         + ((parseFloat(theMinutes.value)*60))
        + ((parseFloat(theSeconds.value)));
    
    
    // figure out how many shots/hour
	var shotsPerHour = (Math.ceil(1 / (myTotalSeconds / 3600)));
    shotsPerHour = isFinite(shotsPerHour) ? shotsPerHour : 0.0;
    
    
    
    //figure out how many total shots
    var totalHours = (toHoursAndMinutesDec(minDiff));
    var totalShots = (Math.ceil(shotsPerHour * totalHours));
//    console.log(totalShots);
    totalShots = isFinite(totalShots) ? totalShots : 0.0;
    
//	var totalShots = Math.ceil(totalHours * shotsPerHour);
    
    // example of final results display:  "40 shots (4/hour)" - that's 10 hours of 15 minute intervals
    
    // display the calculation results
    document.getElementById("myCalculations").innerHTML = totalShots + " shots (" + shotsPerHour + "/hour)";
    
}
//  end of the getVals function



// this will need to be changed 
// declare a variable for the eventual results
//var $myResults = $("#myResults");

// as will this.
//  calculation functions for the interval


// beginning of the convertToSeconds function, which will sum all of the intervals to a total number of seconds
// it's called from the ENTER button onclick
function convertToSeconds(hours, minutes){
  //first, establish the numbers I'm receiving
//  var hours = document.getElementById("hours").value;
//  var minutes = +document.getElementById("minutes").value;
//  var seconds = +document.getElementById("seconds").value;
    
//this used to be where/how we'd get the total number of hours, as entered in the number input
//  var totalHours = +document.getElementById("totalHours").value;


  // convert the interval to all seconds
//	var secondsPerHour = hours * 3600
//  var secondsPerMinute = minutes * 60
//  var totalSec = secondsPerHour + secondsPerMinute + seconds;

    // figure out how many shots/hour
//	var shotsPerHour = (1 / (totalSec / 3600));

	//figure out how many total shots
//    var totalHours = (toHoursAndMinutesDec(minDiff));
//	var totalShots = Math.ceil(totalHours * shotsPerHour);


  
}
// end of the convertToSeconds function


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