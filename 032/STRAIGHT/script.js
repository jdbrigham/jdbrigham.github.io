// chatGPT method
function requestDeviceOrientationPermission() {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
            window.addEventListener('deviceorientation', handleOrientationEvent);
                }
            })
            .catch(console.error);
    } else {
        document.getElementById("myStatus").innerHTML = "This is a non-mobile device.";
  		document.getElementById("request").style.display = 'none';
		document.getElementById("myMessage").style.display = 'none';
		document.getElementById("myValues").style.display = 'none';
    }
}

function handleOrientationEventOnce(event) {
    window.removeEventListener('deviceorientation', handleOrientationEventOnce);
    
    // Capture initial event values (rounded)
    const initialAlpha = Math.round(event.alpha);
    const initialBeta = Math.round(event.beta);
    const initialGamma = Math.round(event.gamma);
    
    // console.log('Initial Alpha: ', initialAlpha);
    // console.log('Initial Beta: ', initialBeta);
    // console.log('Initial Gamma: ', initialGamma);
    document.getElementById('myMessage').innerHTML = ('Initial Alpha:' + initialAlpha + '<br>Initial Beta:' + initialBeta + '<br>Initial Gamma:' + initialGamma);
    
    
    permission();
}

// Call the function to request permission
requestDeviceOrientationPermission();

// alternate function with start/stop
function handleOrientation(event) {
//  updateFieldIfNotNull('Orientation_g', Math.round(event.gamma));
//  incrementEventCount();
}

function incrementEventCount(){
//var list = document.getElementById("valuesList");
//list.innerHTML += (Math.round(event.gamma)+"&deg;,");
}

function updateFieldIfNotNull(fieldName, value, precision=0){
//  if (value != null)
//    document.getElementById(fieldName).innerHTML = value.toFixed(precision);
}

function handleOrientation(event) {
//    console.log('function handleOrientation(event) called');
    
    var orientation = {g: Math.round(event.gamma), b: Math.round(event.beta), a: Math.round(event.alpha), o: window.orientation || 0};
        
    document.getElementById('myValues').innerHTML = "Values: a:  " + orientation.a + ", b: " + orientation.b + ", g: " + orientation.g + ", o: " +  orientation.o;
    
    var dotPos = (orientation.g * 50);
//	var dotPos = (orientation.g);
//    dot = document.getElementsByClassName("indicatorDot")[0];
    pic = document.getElementById('picContainer');
             // dot.setAttribute('style', "left:" + (dotPos) + "px;" + "top: 40%");
    pic.setAttribute('style', "left:" + (dotPos) + "px;" + "top: 0px");
    // I think this could be calculated instead, using div.offsetWidth and window width
//    if (dotPos < -5850 || dotPos > 900) {
//        console.log(dotPos);
//        window.removeEventListener("deviceorientation", handleOrientation);
//    document.getElementById("request").innerHTML = "request permission";
//    document.getElementById("request").style.color='#fff';
//    is_running = false;
//    }
}

let is_running = false;
let demo_button = document.getElementById("request");
demo_button.onclick = function(e) {
  e.preventDefault();
  
  // Request permission for iOS 13+ devices
  if (
    DeviceMotionEvent &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    DeviceMotionEvent.requestPermission();
  }
  
  if (is_running){
    window.removeEventListener("deviceorientation", handleOrientation);
    document.getElementById("request").innerHTML = "request permission";
    document.getElementById("request").style.color='#fff';
    is_running = false;
  }else{
    window.addEventListener("deviceorientation", handleOrientation);
    document.getElementById("request").innerHTML = "permission granted";
      document.getElementById("request").style.color='crimson';
    is_running = true;
  }
};

function windowSize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  document.getElementById("windowSize").innerHTML = "Width: " + w + "<br>Height: " + h;
}

window.onresize = windowSize;
window.onload = windowSize;

//var img = document.getElementById('picContainer'); 
//or however you get a handle to the IMG
//var divWidth = img.offsetWidth;
//var divHeight = img.offsetHeight;
//console.log(divWidth + "," + divHeight);

$("#closebtn").click(function(){
    $("#statusInfo").css("display", "none");
});



//additional code for scrolling movement

$(window).scroll(function() {
    	var x = $(this).scrollTop();
		$('.sliding-background').css({'backgroundPosition': '-' + x + 'px '});

    	// var clientHeight = document.getElementById('myParallax').clientHeight;
		// document.getElementById('appearance').innerHTML = "Div height: " + clientHeight + "px";
		
		// var w = window.innerWidth;
		// myPos = $('#myParallax').css("background-position");
		// document.getElementById('leftPos').innerHTML = myPos;

		var newImg = new Image();
		newImg.onload = function(e) {
	  		// document.getElementById('natural').innerHTML = "Image dimensions: " + this.naturalHeight + "px x " + this.naturalWidth + "px";
		
	  		// var myFactor = (clientHeight/this.naturalHeight);
	  
	  		// var myWidth = (this.naturalWidth*myFactor);
	  		// console.log(myWidth);
	  		// myWidth = Math.round(myWidth);
	  		// document.getElementById('calculation').innerHTML = "Calculated width: " + myWidth + "px";
			
			// document.body.style.height = myWidth - clientHeight + 350 + 'px';
		}
		newImg.src = "IMG_0541_sm.png";
});