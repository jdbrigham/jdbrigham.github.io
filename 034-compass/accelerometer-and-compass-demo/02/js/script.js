if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
  // true for mobile device
  
}else{
  // false for not mobile device
  // document.getElementById("accelPermsButton").disabled = true;
  
}

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

        
            });
        } else {
		
        }
    });
}


var motionMultiplier = 30;

var center = {
    x: $(window).width()/2,
    y: $(window).height()/2
}

var compassRotate = function(_a, _b, _g) {
    $('.ball').css({
        transform: 'rotateZ(' + _a + 'deg)'
    });
}

var moveBall = function(x, y, z) {
    $('.ball').css({
        top: Math.ceil(center.y + y * motionMultiplier),
        left: Math.ceil(center.x + -1 * x * motionMultiplier)
    });
}

compassRotate(90, 45, 45);
moveBall(0, 0, 0);