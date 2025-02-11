if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  
}else{
  // false for not mobile device
  // disable the request button
  document.getElementById("accelPermsButton").disabled = true;
  document.getElementById("accelPermsButton").innerHTML = '[disabled]';
  document.getElementById("svg4").style.opacity = ".2";
  // document.getElementById("compassHeading").innerHTML = '[compass heading]';
  // document.getElementById("lakeHeading").innerHTML = '[lake heading]';
  
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
				
				var compassHeading = degToCompass(compassdir)
				
				document.getElementById('compassHeading').innerHTML = "Facing: " + compassHeading;
				
				document.getElementById("svg4").style.opacity = "1.0";
				
				window.addEventListener('deviceorientation', function(e) {

				}, false);

				
	//	inserting code to calculate and display the angle and distance to lake
	
	let myPos = navigator.geolocation.getCurrentPosition(function(position) {
        // The user's latitude and longitude are in position.coords.latitude and position.coords.longitude
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
		
//		var lakeLatitude = 43.48287;
//		var lakeLongitude = -73.2141504;
//		console.log(lakeLatitude + "(" + typeof lakeLatitude + ")," + lakeLongitude + "("+ typeof lakeLongitude + ")");
		// confirmed from console these are captured as type=Number
		
//		var distanceToLake = getDistanceFromLatLonInKm(latitude,longitude,43.48287,-73.2141504).toFixed(1);
//		
//		var angleToLake = angleFromCoordinate(latitude,longitude,43.48287,-73.2141504).toFixed(1);
//		
//		angleToLake = Number(angleToLake);
//		
//		angleToLake = Math.abs(angleToLake)
//		
//		$("#myDistance").html(distanceToLake + " miles away.");
		
//		var adjustedHeading = (compassdir+angleToLake);
		
		// document.getElementById('diff').innerHTML = "The difference: " + adjustedAngle + "&deg;";
		// rotate pine tree arrow 
		document.getElementById('svg4').style.transform = 'rotate('+ compassdir +'deg)';
		// rotate outer compass
		// document.getElementById('g1').style.transform = 'rotate('+ angleToLake +'deg)';
		
//		if (compassdir >= 0 && compassdir <= 180) {
//		  
//			compassdir = Math.round(compassdir);
//			document.getElementById('directions').innerHTML = "Facing " + compassdir + "&deg; (turn left)";
//			 document.getElementById("bg").style.opacity = "0";
//		} else if (compassdir > 180 && compassdir <= 290) {
//		  compassdir = Math.round(compassdir);
//			document.getElementById('directions').innerHTML = "Facing " + compassdir + "&deg; (turn right)";
//			 document.getElementById("bg").style.opacity = "0";
//		} else if (compassdir >= 310 && compassdir <= 360) {
//		  compassdir = Math.round(compassdir);
//			document.getElementById('directions').innerHTML = "Facing " + compassdir + "&deg; (turn left)";
//			
//			document.getElementById("bg").style.opacity = "0";
//		} else {
//		 
//			compassdir = Math.round(compassdir);
//			document.getElementById('directions').innerHTML = "Facing " + compassdir + "&deg; (this way!)";
//			document.getElementById("bg").style.opacity = "1.0";
//			document.getElementById("svg4").style.opacity = ".5";
//			
//			document.getElementById("accelPermsButton").style.opacity = ".1";
//		}
//		
    });
        
            });
        } else {
		
        }
    });
}

//$lat_lake = 43.48287;    // North
//$long_lake = -73.2141504;    // East


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