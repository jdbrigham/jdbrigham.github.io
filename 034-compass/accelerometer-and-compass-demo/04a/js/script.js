if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  
}else{
  // false for not mobile device
  document.getElementById("accelPermsButton").disabled = true;
  
}

// function called from button to allow use of device motion
function getAccel(){
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {

		
       // Add a listener to get smartphone orientation 
           // in the alpha-beta-gamma axes (units in degrees)
            window.addEventListener('deviceorientation',(event) => {
                // Expose each orientation angle in a more readable way
                rotation_degrees = event.alpha;
                frontToBack_degrees = event.beta;
                leftToRight_degrees = event.gamma;
				compassdir = event.webkitCompassHeading;
				
				// Recall that the alpha value of the deviceorientation event corresponds to the compass bearing of the device (from https://mobiforge.com/design-development/html5-mobile-web-device-orientation-events)
				// rotate the compass arrow based on event input
				document.getElementById('g5').style.transform       = 'rotate('+rotation_degrees+'deg)';
				
				window.addEventListener('deviceorientation', function(e) {
    				console.log(e.webkitCompassHeading);
				}, false);
				
				var direction = degToCompass(rotation_degrees)
				document.getElementById('myDirection').innerHTML = "device: " + direction;
				document.getElementById('myAngle').innerHTML = "device: " + rotation_degrees + "&deg;";
				
				document.getElementById('myHeading').innerHTML = "compass: " + compassdir + "&deg;";

        
            });
        } else {
		
        }
    });
}

//$lat_lake = 43.48287;    // North
//$long_lake = -73.2141504;    // East

window.navigator.geolocation.getCurrentPosition(function(pos) {
  
  // first, get my location (not dependent on device orientation so it can work on non-mobile devices)
  var lat = pos.coords.latitude;
  var lon = pos.coords.longitude;
  $("#myPosition").html("My location: " + lat + "," + lon);
	
	
  // next, calculate the as-the-crow-flies distance from my location to the Lake coordinates	
  var distanceToLake = getDistanceFromLatLonInKm(lat,lon,43.48287,-73.2141504).toFixed(1);
  // and also an angle to the Lake (but this requires device orientation)
  var angleToLake = angleFromCoordinate(lat,lon,43.48287,-73.2141504).toFixed(1);
	
  angleToLake = Number(angleToLake);
	
  // angleToLake = Math.abs(angleToLake);
	
  angleToLake = (360+angleToLake);
	
  console.log(angleToLake);
	
  var directionToLake = degToCompass(angleToLake);
  console.log(directionToLake);
  
	
  // $("#myDistance").html("Distance to Lake: " + distanceToLake + " miles");
});

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
    
	// var latang1 = this.latCoords
    // var lonang1 = this.lngCoords
    // var latang2 = this.destLat;
    // var lonang2 = this.destLong;
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

$('#horizontal').on('input', function() {
  let hvalue=$('#horizontal').val();
  console.log(hvalue);
  $('#textonpath').css('transform','rotate('+hvalue+'deg)');
  document.getElementById('g5').style.transform       = 'rotate('+hvalue+'deg)';
});