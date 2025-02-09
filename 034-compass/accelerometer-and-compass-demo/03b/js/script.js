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

const compassHeading = (alpha, beta, gamma) => {

    // Convert degrees to radians
    const alphaRad = alpha * (Math.PI / 180);
    const betaRad = beta * (Math.PI / 180);
    const gammaRad = gamma * (Math.PI / 180);

    // Calculate equation components
    const cA = Math.cos(alphaRad);
    const sA = Math.sin(alphaRad);
    const cB = Math.cos(betaRad);
    const sB = Math.sin(betaRad);
    const cG = Math.cos(gammaRad);
    const sG = Math.sin(gammaRad);

    // Calculate A, B, C rotation components
    const rA = - cA * sG - sA * sB * cG;
    const rB = - sA * sG + cA * sB * cG;
    const rC = - cB * cG;

    // Calculate compass heading
    let compassHeading = Math.atan(rA / rB);

    // Convert from half unit circle to whole unit circle
    if(rB < 0) {
        compassHeading += Math.PI;
    }else if(rA < 0) {
        compassHeading += 2 * Math.PI;
    }

    // Convert radians to degrees
    compassHeading *= 180 / Math.PI;

    return compassHeading;
};


function distance(lon1, lat1, lon2, lat2) {
  var R = 6371; // Radius of the earth in km
  var dLat = (lat2-lat1).toRad();  // Javascript functions in radians
  var dLon = (lon2-lon1).toRad(); 
  var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
          Math.sin(dLon/2) * Math.sin(dLon/2); 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
  Number.prototype.toRad = function() {
    return this * Math.PI / 180;
  }
}

window.navigator.geolocation.getCurrentPosition(function(pos) {
  // console.log(pos);
  // $('#myPosition').innerHTML = pos;
  var lat = pos.coords.latitude;
  var lon = pos.coords.longitude;
  $("#myPosition").html(lat + "," + lon);
  let myD = distance(pos.coords.longitude, pos.coords.latitude, 43.48287, -73.2141504)
  console.log(
    distance(pos.coords.longitude, pos.coords.latitude, 43.48287, -73.2141504));
	$("#myDistance").html(myD);
});

//$lat_lake = 43.48287;    // North
//$long_lake = -73.2141504;    // East