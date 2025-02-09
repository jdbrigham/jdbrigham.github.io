if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  
}else{
  // false for not mobile device
  // document.getElementById("accelPermsButton").disabled = true;
  
}

var heading;

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
				
				document.getElementById('g5').style.transform       = 'rotate('+rotation_degrees+'deg)';
				
				heading = compassHeading(event.alpha, event.beta, event.gamma);
				
				// console.log(heading);
				
				const direction = ['north','north east', 'east','south east', 'south','south west', 'west','north west'][Math.floor(((heading+22.5)%360)/45)];
				// console.log(direction);
				document.getElementById('myDirection').innerHTML = direction;

        
            });
        } else {
		
        }
    });
}

//$lat_lake = 43.48287;    // North
//$long_lake = -73.2141504;    // East

window.navigator.geolocation.getCurrentPosition(function(pos) {
  var lat = pos.coords.latitude;
  var lon = pos.coords.longitude;
  $("#myPosition").html("My location: " + lat + "," + lon);
	
  // alert(getDistanceFromLatLonInKm(lat,lon,43.48287,-73.2141504).toFixed(1));
  var distanceToLake = getDistanceFromLatLonInKm(lat,lon,43.48287,-73.2141504).toFixed(1)
	
  $("#myDistance").html("Distance to Lake: " + distanceToLake + " miles");
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