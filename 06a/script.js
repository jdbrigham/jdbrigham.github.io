$(document).ready(function(){
  // Add smooth scrolling on all links inside the navbar
  $("#myScrollspy a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    }  // End if
  });
});

$(document).ready(function() {
  $('.nav-item').click(function() {
    // Remove markers from all other list items
    $('.nav-item').each(function() {
      if ($(this).hasClass('activeMarker')) {
        $(this).removeClass('activeMarker');
        // Additional logic to remove the marker associated with this list item
        // For example, if you're using a mapping library like Leaflet:
        // this.marker.remove(); 
      }
    });

    // Add marker to the clicked list item
    $(this).addClass('activeMarker');
    // Additional logic to add a marker associated with this list item
  });
});

//code library additions

Array.from(document.getElementsByClassName('myButton')).forEach((button) => {
  button.addEventListener('click', (e)=>{
    e.preventDefault();
	var theCodeBlock = document.getElementById('theCode'+e.target.getAttribute('data-element'));
	  
    // add the class to apply the flashing
	theCodeBlock.classList.add("flashBG");
	  
	// .5 seconds later, hide the splash
    setTimeout(function(){
      theCodeBlock.classList.remove("flashBG");
    }, 500);
	navigator.clipboard.writeText(theCodeBlock.innerHTML);
  });
});
	
$(document).ready(function() {
  $("#scroll2").click(function(event) {
      var theAScode = $('#theCode002').text();
	  
	  var theASlink = "applescript://com.apple.scripteditor?action=new&script=do shell script &quot;/opt/homebrew/bin/ " + theAScode +"&quot;";
	  
	  console.log(theASlink)
	  
	  $('body').append("<a id='link'' href='" + theASlink + "'>&nbsp;</a>");
      $('#link')[0].click();
  });	  
});
	
// $('.radio-container label').click(function() {
//  console.log('Selected processor: '.concat($(this).prev().val(), 'Name of radio: ', $(this).prev().attr('name')));
//	console.log(($this).val());
//	const radioButton = document.querySelectorAll('input[name="processor"]:checked');

// var chkVal = $('input[name="processor"]:checked');	
//console.log($('input[name="processor"]:checked').val());
// console.log($(chkVal.val()));

// });
	
$(document).ready(function() {
	
  var processorPath = 'path to';
  $('#intel-logo').hide();
  $('input[type="radio"]').change(function() {
    if ($(this).val() === 'apple') {
      // Do something for option 1
      console.log("Option 1 selected");
	  $('#intel-logo').hide();
	  $('#apple-logo').show();
	  processorPath = '/opt/homebrew/bin/ffmpeg'
	  
    } else if ($(this).val() === 'intel') {
      // Do something for option 2
      console.log("Option 2 selected");
	  $('#intel-logo').show();
	  $('#apple-logo').hide();
	  processorPath = ' /usr/local/bin/ffmpeg'
		
    } else {
      // Do something for other options
      console.log("Other option selected");
    }
	  
	 console.log(processorPath);
	 $('#thePath').html(processorPath);
  });
});
	
$(".image-container").mouseover(function () {
  $(this).attr('src', $(this).data("hover"));
}).mouseout(function () {
  $(this).attr('src', $(this).data("src"));
});

//for the binary background test

$(document).ready(function(){
  generateBinary();
	setInterval('updateBinary()', 5);
});

function generateBinary(){
  str = "";
  for ( var i = 0; i < 3500; i++ ) {
    str = str + Math.round(Math.random());
  }
  $(".bin").html(str);
}

function updateBinary() {
  str = $(".bin").html();
  n = str.length;
  r = Math.floor(Math.random() * n + 1)
  $(".bin").html(str.substring(0, r) + Math.round(Math.random()) + str.substring(r + 1));
}