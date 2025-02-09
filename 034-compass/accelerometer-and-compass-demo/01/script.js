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

var init = function() {

    //Find our div containers in the DOM
    var dataContainerOrientation = document.getElementById('dataContainerOrientation');
    var dataContainerMotion = document.getElementById('dataContainerMotion');

    //Check for support for DeviceOrientation event
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', function(event) {
            var alpha = event.alpha;
            var beta = event.beta;
            var gamma = event.gamma;

            if (alpha != null || beta != null || gamma != null) {
                dataContainerOrientation.innerHTML = 'alpha: ' + alpha + '<br/>beta: ' + beta + '<br />gamma: ' + gamma;

                compassRotate(alpha, beta, gamma);
            }
        }, false);
    }

    // Check for support for DeviceMotion events
    if (window.DeviceMotionEvent) {
        window.addEventListener('devicemotion', function(event) {
            var x = event.accelerationIncludingGravity.x;
            var y = event.accelerationIncludingGravity.y;
            var z = event.accelerationIncludingGravity.z;
            var r = event.rotationRate;
            var html = 'Acceleration:<br />';
            html += 'x: ' + x + '<br />y: ' + y + '<br/>z: ' + z + '<br />';
            html += 'Rotation rate:<br />';
            if (r != null) html += 'alpha: ' + r.alpha + '<br />beta: ' + r.beta + '<br/>gamma: ' + r.gamma + '<br />';
            dataContainerMotion.innerHTML = html;

            moveBall(x, y, z);
        });
    }
}

function permission () {
    if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
        // (optional) Do something before API request prompt.
        DeviceMotionEvent.requestPermission()
            .then( response => {
            // (optional) Do something after API prompt dismissed.
            if ( response == "granted" ) {
                window.addEventListener( "devicemotion", (e) => {
                    console.log('permission has been granted');
                })
            }
        })
            .catch( console.error )
    } else {
        alert( "DeviceMotionEvent is not defined" );
    }
}
const btn = document.getElementById( "request" );
btn.addEventListener( "click", permission );

init();