// duration of scroll animation
var scrollDuration = 300;
// paddles
var leftPaddle = document.getElementsByClassName('left-paddle');
var rightPaddle = document.getElementsByClassName('right-paddle');
// get items dimensions
var itemsLength = $('.menu-item').length;
var itemSize = $('.menu-item').outerWidth(true);
// get some relevant size for the paddle triggering point
var paddleMargin = 20;

// get wrapper width
var getMenuWrapperSize = function() {
	return $('.menu-wrapper').outerWidth();
}
var menuWrapperSize = getMenuWrapperSize();
// the wrapper is responsive
$(window).on('resize', function() {
	menuWrapperSize = getMenuWrapperSize();
});
// size of the visible part of the menu is equal as the wrapper size 
var menuVisibleSize = menuWrapperSize;

// get total width of all menu items
var getMenuSize = function() {
	return itemsLength * itemSize;
};
var menuSize = getMenuSize();
// get how much of menu is invisible
var menuInvisibleSize = menuSize - menuWrapperSize;

// get how much have we scrolled to the left
var getMenuPosition = function() {
	return $('.menu-menu').scrollLeft();
};

// finally, what happens when we are actually scrolling the menu
$('.menu-menu').on('scroll', function() {

	// get how much of menu is invisible
	menuInvisibleSize = menuSize - menuWrapperSize;
	// get how much have we scrolled so far
	var menuPosition = getMenuPosition();

	var menuEndOffset = menuInvisibleSize - paddleMargin;
    
    
    
//    inserting my own logic
//    First, find out how many items there are in the array
    var arrayNumber = imgTimes.length;
//    Multiply that by a number meant to represent the approx. width of each time in the menu, and then subtract the width of a paddle
    var calcWidth = ((arrayNumber * 215)-paddleMargin);
   
	// show & hide the paddles 
	// depending on scroll position
	if (menuPosition <= paddleMargin) {
//        alert(menuInvisibleSize);
        $(leftPaddle).addClass('hidden');
        $(rightPaddle).removeClass('hidden');
	} else if (menuPosition > paddleMargin && menuPosition < calcWidth) {
//		alert(calcWidth);
        
        // show both paddles in the middle
		$(leftPaddle).removeClass('hidden');
        $('.menu-menu').css('margin-left','25px');
		$(rightPaddle).removeClass('hidden');
	} else if (menuPosition >= calcWidth) {
//		alert('THREE');
        $(leftPaddle).removeClass('hidden');
		$(rightPaddle).addClass('hidden');
}

	// print important values
	$('#print-wrapper-size span').text(menuWrapperSize);
	$('#print-menu-size span').text(menuSize);
	$('#print-menu-invisible-size span').text(menuInvisibleSize);
	$('#print-menu-position span').text(menuPosition);

});

// scroll to left
$(rightPaddle).on('click', function() {
//	$('.menu-menu').animate( { scrollLeft: menuInvisibleSize}, scrollDuration);
    $('.menu-menu').animate( { scrollLeft: '+=600'}, scrollDuration);
});

// scroll to right
$(leftPaddle).on('click', function() {
	$('.menu-menu').animate( { scrollLeft: '0' }, scrollDuration);
});