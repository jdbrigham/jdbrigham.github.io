$(document).on('input', '#myRange', function() {
    // $('#slider_value').html( $(this).val() );
	
	// let perspective = $(this).val();
	// console.log(perspective);
	// $(".container").css("perspective", perspective);
	
	
	// var y = document.getElementsByClassName('container');
	// var myContainer = y[0];
	// myContainer.style.perspective = perspective + "px";
});

	let inc=5;
    $("#mover").click(function(){
        inc +=10;
		$('.slice').css('background-position-x', '-='+inc+'px');
        // var bgPosition = $('#finalSlice').css('backgroundPosition').split(" ");
        // let xPos = bgPosition[0];
        // xPos = xPos.replace('px', '');
        // console.log(xPos);
//        Note: the value below is specific to the window I'm testing in - next need to universalize it
        // if (xPos <=-2583) {
          // inc=0;
          // $('#testShift').prop("disabled",true);
        // }
     });

function updateSlider(slideAmount) {
    // var sliderDiv = document.getElementById("sliderAmount");
    // sliderDiv.innerHTML = slideAmount;
	console.log(slideAmount);
	var y = document.getElementsByClassName('container');
	var myContainer = y[0];
	myContainer.style.perspective = slideAmount + "px";
    }