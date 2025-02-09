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
				document.getElementById('compass').style.transform       = 'rotate('+compassdir+'deg)';
				
				document.getElementById('text').style.transform       = 'rotate('+compassdir+'deg)';
				
				window.addEventListener('deviceorientation', function(e) {

				}, false);
				
				var direction = degToCompass(compassdir)
				document.getElementById('myDirection').innerHTML = "compass heading (letters): " + direction;
				document.getElementById('myAngle').innerHTML = "device rotation alpha: " + rotation_degrees + "&deg;";
				
				document.getElementById('myHeading').innerHTML = "compass heading (degeees): " + compassdir + "&deg;";
        
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
	
});

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