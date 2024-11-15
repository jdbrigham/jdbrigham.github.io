var slider = document.getElementById("myRange");
var output = document.getElementById("direction");
output.innerHTML = "Facing: " + slider.value + "&deg;" ; // Display the default slider value

var adjusteddirection = 297.2;

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  var compassdirection = this.value;
  output.innerHTML = "Facing: " + compassdirection + "&deg;" ;
  var diff = (adjusteddirection-compassdirection);
  document.getElementById('goal').innerHTML = adjusteddirection + "&deg;";
  document.getElementById('diff1').innerHTML = "Raw diff: " + diff + "&deg;";
  diff = Math.round(diff);
  document.getElementById('diff2').innerHTML = "Rounded: " + diff + "&deg;";
  diff = Math.abs(diff);
  document.getElementById('diff3').innerHTML = "Absolute value: " + diff;
	
  var inputRange = 297;
  var outputRange = 570;
  var rangeFactor = (outputRange/inputRange);
  var calculatedPosition = (diff*rangeFactor);
	
  document.getElementById('diff4').innerHTML = "inputRange,outputRange,rangeFactor: " + inputRange + ", " + outputRange + ", " + rangeFactor;
	
  document.getElementById('diff5').innerHTML = "Calculated position: " + calculatedPosition;
	
  // let's trying re-calculating
  var calculatedRangeStart = 570;
  var calculatedRangeEnd = 0;
  var calculatedRange = (calculatedRangeEnd-calculatedRangeStart);
  var desiredRangeStart = 0;
  var desiredRangeEnd = 570;
  var desiredRange = (desiredRangeEnd-desiredRangeStart);
  var reCalculatedPosition = (calculatedRangeStart + (calculatedRange / desiredRange) * (calculatedPosition - desiredRangeStart));
  reCalculatedPosition = (reCalculatedPosition+30);
	
  document.getElementById('diff7').innerHTML = "re-Calculated position: " + reCalculatedPosition;
  
  // now let's try moving the object
  document.getElementById("mvtest").style.bottom = reCalculatedPosition + "px";
  // and in space
  var zPos = (reCalculatedPosition*2);
  document.getElementById('mvtest').style.transform = "translateX(50%) translateZ(-" + zPos + "px)";
	
  if (reCalculatedPosition == 600) {
  	document.getElementById("mvtest").style.boxShadow = "0px 0px 22px skyblue";
	document.getElementById("g135").style.display = "block";
  	} else {
  	document.getElementById("mvtest").style.boxShadow = 'none';
	}
	
	
	
	
  
}
