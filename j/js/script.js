if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  
}else{
  // false for not mobile device
  // disable the request button
  document.getElementById("accelPermsButton").disabled = true;
  document.getElementById("accelPermsButton").innerHTML = '[disabled]';
  
}

// function called from button to allow use of device motion
function getAccel(){
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
           window.addEventListener('deviceorientation',(event) => {
              // Expose each orientation angle in a more readable way
              // rotation_degrees = event.alpha;
              // frontToBack_degrees = event.beta;
              // leftToRight_degrees = event.gamma;
			  compassdir = event.webkitCompassHeading;
				
			  var compassHeading = degToCompass(compassdir);
			  window.addEventListener('deviceorientation', function(e) {
				}, false);
				
	//	inserting code to calculate and display the angle and distance to lake
	
	let myPos = navigator.geolocation.getCurrentPosition(function(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
		
		var lakeLatitude = 43.48287;
		var lakeLongitude = -73.2141504;
		console.log(lakeLatitude + "(" + typeof lakeLatitude + ")," + lakeLongitude + "("+ typeof lakeLongitude + ")");
		// confirmed from console these are captured as type=Number
		
		var distanceToLake = getDistanceFromLatLonInKm(latitude,longitude,43.48287,-73.2141504).toFixed(1);
		
		var angleToLake = angleFromCoordinate(latitude,longitude,43.48287,-73.2141504).toFixed(1);
		
		angleToLake = Number(angleToLake);
		
		angleToLake = Math.abs(angleToLake)
		
		$("#myDistance").html(distanceToLake + " miles away.");
		
		var adjustedHeading = (compassdir+angleToLake);
		document.getElementById('svg4').style.transform = 'rotate('+ adjustedHeading +'deg)';
		
		var diff = ((360-angleToLake)-compassdir);
		diff = Math.round(diff);
		diff = Math.abs(diff);
		// $("#thediff").html(thediff + "&deg;");
		$("#goal").html("angleToLake: " + angleToLake + "&deg; (or " + (360-angleToLake) + "&deg;)");
		$("#goal2").html("adjustedHeading: " + Math.round(adjustedHeading) + "&deg;");
		$("#diff").html("DIFF: " + diff + "&deg;");
		
		//calculate and perform movement based on 'closeness'
		// input range comes from the furthest possible point?
		var inputRange = 297;
		// outputRange comes from the range of movement
        var outputRange = 570;
        var rangeFactor = (outputRange/inputRange);
        var calculatedPosition = (diff*rangeFactor);
		
		// let's trying re-calculating
	    var calculatedRangeStart = 570;
	    var calculatedRangeEnd = 0;
	    var calculatedRange = (calculatedRangeEnd-calculatedRangeStart);
	    var desiredRangeStart = 0;
	    var desiredRangeEnd = 570;
	    var desiredRange = (desiredRangeEnd-desiredRangeStart);
	    var reCalculatedPosition = (calculatedRangeStart + (calculatedRange / desiredRange) * (calculatedPosition - desiredRangeStart));
	    reCalculatedPosition = (reCalculatedPosition+30);
		
		// display the value
		document.getElementById("pos").innerHTML = reCalculatedPosition;
		
		// now let's try moving the object
  		document.getElementById("mvtest").style.bottom = reCalculatedPosition + "px";
  		// and in space
  		var zPos = (reCalculatedPosition*2);
  		document.getElementById('mvtest').style.transform = "translateX(50%) translateZ(-" + zPos + "px)";
	
  		if (reCalculatedPosition == 600) {
  		document.getElementById("mvtest").style.boxShadow = "0px 0px 22px skyblue";
  		} else {
  		document.getElementById("mvtest").style.boxShadow = 'none';
		}
		
		// show and hide elements based on direction
		if (compassdir >= 0 && compassdir <= 180) {
		  
			compassdir = Math.round(compassdir);
			document.getElementById('directions').innerHTML = "Facing " + compassdir + "&deg; (turn left)";
			 document.getElementById("bg").style.opacity = "0";
		} else if (compassdir > 180 && compassdir <= 290) {
		  compassdir = Math.round(compassdir);
			document.getElementById('directions').innerHTML = "Facing " + compassdir + "&deg; (turn right)";
			 document.getElementById("bg").style.opacity = "0";
		} else if (compassdir >= 310 && compassdir <= 360) {
		  compassdir = Math.round(compassdir);
			document.getElementById('directions').innerHTML = "Facing " + compassdir + "&deg; (turn left)";
			
			document.getElementById("bg").style.opacity = "0";
		} else {
		 
			compassdir = Math.round(compassdir);
			document.getElementById('directions').innerHTML = "Facing " + compassdir + "&deg; (this way!)";
			document.getElementById("bg").style.opacity = "1.0";
			document.getElementById("svg4").style.opacity = ".5";
			document.getElementById("accelPermsButton").style.opacity = ".1";
		}
		
    });
        
            });
        } else {
		
        }
    });
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return  (d* 0.621371); // convert to miles
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

function angleFromCoordinate(latang1, lonang1, latang2, lonang2) {
    
	var p1 = {
      x: latang1,
      y: lonang1
    };

    var p2 = {
      x: latang2,
      y: lonang2
    };
    var angleDeg = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    // console.log(angleDeg);
    return angleDeg;
	
  }

function degToCompass(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

//$('#mvtest').click(function(){
//    //alert("button");
//	 $("#mvtest").toggleClass("moveUp");
//});