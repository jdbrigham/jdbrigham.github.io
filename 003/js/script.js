// Coordinates for Boston
const lat_boston = 42.360081
const long_boston = -71.058884
// Coordinates for the Lake
const lat_lake = 43.48287
const long_lake = -73.2141504

// get date info for header
const today = new Date();
// break into date elements
const shortMonth = getShortMonthName(today);
const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(today);
const yyyy = today.getFullYear();
// reformat for display
const formattedToday = shortMonth + " " + day + " " + yyyy;

// update it
document.querySelector('.date-header').innerHTML = formattedToday;

// get xth day of year
var start = new Date(today.getFullYear(), 0, 0);
var diff = today - start;
var oneDay = 1000 * 60 * 60 * 24;
var nthday = Math.floor(diff / oneDay);

document.querySelector('#nthday').innerHTML = "Day " + nthday + " of 365";

// reset the value of the progress bar
const progressBar = document.getElementById('progressBar'); 

progressBar.value = nthday; // Set the value to 50 (out of 100, by default)

const url_boston = `https://api.sunrisesunset.io/json?lat=${lat_boston}&lng=${long_boston}`

const url_lake = `https://api.sunrisesunset.io/json?lat=${lat_lake}&lng=${long_lake}`

// retrieve sunrise/sunset info for boston coordinates
fetch(url_boston)
  .then(response => response.json())
  .then(data => {
	let sunrisetimeboston = data.results.sunrise;
	let sunsettimeboston = data.results.sunset;
	let daylengthboston = data.results.day_length;
	
	const result1boston = reformatdate(sunrisetimeboston);
	const result2boston = reformatdate(sunsettimeboston);
	
	const hoursofboston = splittime (daylengthboston);
	
	const daylighthours = justminutes (daylengthboston);
	
	$('.today').width(daylighthours);
	
//	const daylighthourspercentage = (daylighthours/1440);
	
//	console.log(daylighthours);
	document.querySelector('#thesunriseboston').innerHTML = result1boston;
    document.querySelector('#thesunsetboston').innerHTML = result2boston
	document.querySelector('#timediffboston').innerHTML = hoursofboston
//  document.querySelector('#raw-output').innerHTML = JSON.stringify(data)
  })
  .catch(error => console.error('Error:', error))

// retrieve sunrise/sunset info for lake coordinates
fetch(url_lake)
  .then(response => response.json())
  .then(data => {
	let sunrisetime = data.results.sunrise;
	let sunsettime = data.results.sunset;
	let daylength = data.results.day_length;
	
	const result1 = reformatdate(sunrisetime);
	const result2 = reformatdate(sunsettime);
	
	const hoursof = splittime (daylength);
	document.querySelector('#thesunriselake').innerHTML = result1;
    document.querySelector('#thesunsetlake').innerHTML = result2
	document.querySelector('#timedifflake').innerHTML = hoursof
//  document.querySelector('#raw-output').innerHTML = JSON.stringify(data)
  })
  .catch(error => console.error('Error:', error))

// all functions

// convert to month to short month name
function getShortMonthName(date) {
  return date.toLocaleString('en-US', { month: 'short' });
}

// reformat time string to remove seconds
function reformatdate(timestring) {
  const parts = timestring.split(":");
	const lastpart = parts[2];
	const ampm = lastpart.split(" ");
	const myformattedtime = parts[0] + ":" + parts[1] + " " + ampm[1];
  return myformattedtime;
}

// reformat length of daylight
function splittime(timestring) {
  const elements = timestring.split(":");

	const mydaylight = elements[0] + " hours " + elements[1] + " minutes of daylight";
	// console.log(myformattedtime);

  return mydaylight
}

// reformat to all minutes
function justminutes(timestring) {
  const elements = timestring.split(":");
	
  const daylighthours = (parseInt((elements[0]*60)));
  const daylightminutes = (parseInt(elements[1]));
  const totaldaylighttoday = ((daylighthours + daylightminutes)/1440);
const totaldaylighttodaypercentage = (totaldaylighttoday * 100).toFixed(0) + '%';
//	console.log(totaldaylighttodaypercentage);

  return totaldaylighttodaypercentage;
}