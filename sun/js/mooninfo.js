// const SunCalc = require('suncalc');

function getMoonrise(date, latitude, longitude) {
  const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude);
  return moonTimes.rise;
}

function getMoonset(date, latitude, longitude) {
  const moonTimes = SunCalc.getMoonTimes(date, latitude, longitude);
  return moonTimes.set;
}

let moonriseTime_boston = getMoonrise(today, lat_boston, long_boston);

let moonsetTime_boston = getMoonset(today, lat_boston, long_boston);

moonriseTime_boston = moonriseTime_boston.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

moonsetTime_boston = moonsetTime_boston.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

if (moonriseTime_boston) {
//  console.log("Moonrise time:", moonriseTime_boston);
  document.querySelector('#moonriseboston').innerHTML = moonriseTime_boston;
} else {
  console.log("Moon is always above or below the horizon on this day.");
}

if (moonsetTime_boston) {
//  console.log("Moonset time:", moonsetTime_boston);
  document.querySelector('#moonsetboston').innerHTML = moonsetTime_boston;
} else {
  console.log("Moon is always above or below the horizon on this day.");
}

//repeating for lake
let moonriseTime_lake = getMoonrise(today, lat_lake, long_lake);

let moonsetTime_lake = getMoonset(today, lat_lake, long_lake);

moonriseTime_lake = moonriseTime_lake.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

moonsetTime_lake = moonsetTime_lake.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })

if (moonriseTime_lake) {
//  console.log("Moonrise time:", moonriseTime_lake);
  document.querySelector('#moonriselake').innerHTML = moonriseTime_lake;
} else {
  console.log("Moon is always above or below the horizon on this day.");
}

if (moonsetTime_lake) {
//  console.log("Moonset time:", moonsetTime_lake);
  document.querySelector('#moonsetlake').innerHTML = moonsetTime_lake;
} else {
  console.log("Moon is always above or below the horizon on this day.");
}

let moonInfo = SunCalc.getMoonIllumination(today);

//document.querySelector('#moonilluminationpercentage').innerHTML = formatAsPercent(moonInfo.fraction);

let moonphase = moonInfo.phase;
//console.log(moonphase);

//if ((moonphase >= 0) & (moonphase <0.1)) {
//	document.querySelector('#moonphasename').innerHTML = "new moon";
//} else if ((moonphase >= 0.1) & (moonphase <0.24)) {
//  document.querySelector('#moonphasename').innerHTML = "waxing crescent";
//} else if ((moonphase >= 0.24) & (moonphase <=0.26)) {
//  document.querySelector('#moonphasename').innerHTML = "first quarter";
//} else if ((moonphase > 0.26) & (moonphase <0.48)) {
//  document.querySelector('#moonphasename').innerHTML = "waxing gibbous";
//} else if ((moonphase >= 0.48) & (moonphase <=0.52)) {
//  document.querySelector('#moonphasename').innerHTML = "full moon";
//} else if ((moonphase > 0.52) & (moonphase <0.74)) {
//  document.querySelector('#moonphasename').innerHTML = "waning gibbous";
//} else if ((moonphase >= 0.74) & (moonphase <=0.76)) {
//  document.querySelector('#moonphasename').innerHTML = "last quarter";
//} else if ((moonphase > 0.76) & (moonphase <1.0)) {
//  document.querySelector('#moonphasename').innerHTML = "waning crescent";	
//} else {
//  //  block of code to be executed if the condition1 is false and condition2 is false
//}

let moonAge = calculateMoonAge(today);
let moonAgeRounded = Math.round(moonAge * 100) / 100;
//document.querySelector('#moonage').innerHTML = moonAgeRounded + " days";

function formatAsPercent(number, decimalPlaces = 0) {
  return (number * 100).toFixed(decimalPlaces) + "%";
}

function calculateMoonAge(date) {
  const julianDate = Math.floor((date.getTime() / 86400000) - (date.getTimezoneOffset()/1440) + 2440587.5);
  const newMoon = 2451549.5; // Julian date of new moon on January 6, 2000
  const synodicMonth = 29.53058868; // Average length of a synodic month

  const daysSinceNewMoon = (julianDate - newMoon) % synodicMonth;
  return daysSinceNewMoon < 0 ? daysSinceNewMoon + synodicMonth : daysSinceNewMoon;
}