$(document).ready(function(){
   var bodyHeight = $("body").height()-$(window).height();
    
    // init
    var m = moment();
    var minutes = (m.hour() * 60) + m.minute();
    var progresshour = 0;
    var clockHeight = $('#clock').height();
    var viewportHeight = window.innerHeight;
    var scrollbarHeight = viewportHeight / $(document).height() * viewportHeight;
    
    
   window.onscroll = function() {

      //Determine the amount to rotate by.
      var deg = window.scrollY*(7200/bodyHeight);
       progressBarScroll();
   };
});

var bgImages = [
  "../../../../_ImageSets/2019-08-15/01.jpg",
"../../../../_ImageSets/2019-08-15/02.jpg",
"../../../../_ImageSets/2019-08-15/03.jpg",
"../../../../_ImageSets/2019-08-15/04.jpg",
"../../../../_ImageSets/2019-08-15/05.jpg",
"../../../../_ImageSets/2019-08-15/06.jpg",
"../../../../_ImageSets/2019-08-15/07.jpg",
"../../../../_ImageSets/2019-08-15/08.jpg",
"../../../../_ImageSets/2019-08-15/09.jpg",
"../../../../_ImageSets/2019-08-15/10.jpg",
"../../../../_ImageSets/2019-08-15/11.jpg",
"../../../../_ImageSets/2019-08-15/12.jpg",
"../../../../_ImageSets/2019-08-15/13.jpg",
"../../../../_ImageSets/2019-08-15/14.jpg",
"../../../../_ImageSets/2019-08-15/15.jpg",
"../../../../_ImageSets/2019-08-15/16.jpg",
"../../../../_ImageSets/2019-08-15/17.jpg",
"../../../../_ImageSets/2019-08-15/18.jpg",
"../../../../_ImageSets/2019-08-15/19.jpg",
"../../../../_ImageSets/2019-08-15/20.jpg",
"../../../../_ImageSets/2019-08-15/21.jpg",
"../../../../_ImageSets/2019-08-15/22.jpg",
"../../../../_ImageSets/2019-08-15/23.jpg",
"../../../../_ImageSets/2019-08-15/24.jpg",
"../../../../_ImageSets/2019-08-15/25.jpg",
"../../../../_ImageSets/2019-08-15/26.jpg",
"../../../../_ImageSets/2019-08-15/27.jpg",
"../../../../_ImageSets/2019-08-15/28.jpg",
"../../../../_ImageSets/2019-08-15/29.jpg",
"../../../../_ImageSets/2019-08-15/30.jpg",
"../../../../_ImageSets/2019-08-15/31.jpg",
"../../../../_ImageSets/2019-08-15/32.jpg",
"../../../../_ImageSets/2019-08-15/33.jpg",
"../../../../_ImageSets/2019-08-15/34.jpg",
"../../../../_ImageSets/2019-08-15/35.jpg",
"../../../../_ImageSets/2019-08-15/36.jpg",
"../../../../_ImageSets/2019-08-15/37.jpg",
"../../../../_ImageSets/2019-08-15/38.jpg",
"../../../../_ImageSets/2019-08-15/39.jpg",
"../../../../_ImageSets/2019-08-15/40.jpg",
"../../../../_ImageSets/2019-08-15/41.jpg",
"../../../../_ImageSets/2019-08-15/42.jpg",
"../../../../_ImageSets/2019-08-15/43.jpg",
"../../../../_ImageSets/2019-08-15/44.jpg",
"../../../../_ImageSets/2019-08-15/45.jpg",
"../../../../_ImageSets/2019-08-15/46.jpg",
"../../../../_ImageSets/2019-08-15/47.jpg",
"../../../../_ImageSets/2019-08-15/48.jpg",
"../../../../_ImageSets/2019-08-15/49.jpg",
"../../../../_ImageSets/2019-08-15/50.jpg",
"../../../../_ImageSets/2019-08-15/51.jpg",
"../../../../_ImageSets/2019-08-15/52.jpg",
"../../../../_ImageSets/2019-08-15/53.jpg",
"../../../../_ImageSets/2019-08-15/54.jpg",
"../../../../_ImageSets/2019-08-15/55.jpg"

];


document.onscroll = function(){ 
  var pos = getVerticalScrollPercentage(document.body);


var photoPos = getVerticalScrollPercentage(document.body);
    
// begin the if logic
        if (photoPos > 0  && photoPos < 1.75438596491228) {
          $("#myPhoto").attr("src",bgImages[0]);
          $("#svg-minute").css({
            "transform": "rotate(0deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(180deg)",
            });
            $('.ampm').text('A M');

        } else if (photoPos >= 1.75438596491228  && photoPos < 3.50877192982456) {
           $("#myPhoto").attr("src",bgImages[1]);
            $("#svg-minute").css({
            "transform": "rotate(90deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(180deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 3.50877192982456  && photoPos < 5.26315789473684) {
           $("#myPhoto").attr("src",bgImages[2]);
    $("#svg-minute").css({
            "transform": "rotate(180deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(180deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 5.26315789473684  && photoPos < 7.01754385964912) {
           $("#myPhoto").attr("src",bgImages[3]);
    $("#svg-minute").css({
            "transform": "rotate(270deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(180deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 7.01754385964912  && photoPos < 8.7719298245614) {
           $("#myPhoto").attr("src",bgImages[4]);
    $("#svg-minute").css({
            "transform": "rotate(360deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(210deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 8.7719298245614  && photoPos < 10.5263157894737) {
           $("#myPhoto").attr("src",bgImages[5]);
    $("#svg-minute").css({
            "transform": "rotate(450deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(210deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 10.5263157894737  && photoPos < 12.280701754386) {
           $("#myPhoto").attr("src",bgImages[6]);
    $("#svg-minute").css({
            "transform": "rotate(540deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(210deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 12.280701754386  && photoPos < 14.0350877192983) {
           $("#myPhoto").attr("src",bgImages[7]);
    $("#svg-minute").css({
            "transform": "rotate(630deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(210deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 14.0350877192983  && photoPos < 15.7894736842106) {
           $("#myPhoto").attr("src",bgImages[8]);
    $("#svg-minute").css({
            "transform": "rotate(720deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(240deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 15.7894736842106  && photoPos < 17.5438596491229) {
           $("#myPhoto").attr("src",bgImages[9]);
    $("#svg-minute").css({
            "transform": "rotate(810deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(240deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 17.5438596491229  && photoPos < 19.2982456140352) {
           $("#myPhoto").attr("src",bgImages[10]);
    $("#svg-minute").css({
            "transform": "rotate(900deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(240deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 19.2982456140352  && photoPos < 21.0526315789475) {
           $("#myPhoto").attr("src",bgImages[11]);
    $("#svg-minute").css({
            "transform": "rotate(990deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(240deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 21.0526315789475  && photoPos < 22.8070175438598) {
           $("#myPhoto").attr("src",bgImages[12]);
    $("#svg-minute").css({
            "transform": "rotate(1080deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(270deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 22.8070175438598  && photoPos < 24.5614035087721) {
           $("#myPhoto").attr("src",bgImages[13]);
    $("#svg-minute").css({
            "transform": "rotate(1170deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(270deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 24.5614035087721  && photoPos < 26.3157894736844) {
           $("#myPhoto").attr("src",bgImages[14]);
    $("#svg-minute").css({
            "transform": "rotate(1260deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(270deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 26.3157894736844  && photoPos < 28.0701754385967) {
           $("#myPhoto").attr("src",bgImages[15]);
    $("#svg-minute").css({
            "transform": "rotate(1350deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(270deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 28.0701754385967  && photoPos < 29.824561403509) {
           $("#myPhoto").attr("src",bgImages[16]);
    $("#svg-minute").css({
            "transform": "rotate(1440deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(300deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 29.824561403509  && photoPos < 31.5789473684213) {
           $("#myPhoto").attr("src",bgImages[17]);
    $("#svg-minute").css({
            "transform": "rotate(1530deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(300deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 31.5789473684213  && photoPos < 33.3333333333336) {
           $("#myPhoto").attr("src",bgImages[18]);
    $("#svg-minute").css({
            "transform": "rotate(1620deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(300deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 33.3333333333336  && photoPos < 35.0877192982459) {
           $("#myPhoto").attr("src",bgImages[19]);
    $("#svg-minute").css({
            "transform": "rotate(1710deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(300deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 35.0877192982459  && photoPos < 36.8421052631582) {
           $("#myPhoto").attr("src",bgImages[20]);
    $("#svg-minute").css({
            "transform": "rotate(1800deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(330deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 36.8421052631582  && photoPos < 38.5964912280705) {
           $("#myPhoto").attr("src",bgImages[21]);
    $("#svg-minute").css({
            "transform": "rotate(1890deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(330deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 38.5964912280705  && photoPos < 40.3508771929828) {
           $("#myPhoto").attr("src",bgImages[22]);
    $("#svg-minute").css({
            "transform": "rotate(1980deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(330deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 40.3508771929828  && photoPos < 42.1052631578951) {
           $("#myPhoto").attr("src",bgImages[23]);
    $("#svg-minute").css({
            "transform": "rotate(2070deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(330deg)",
            });
            $('.ampm').text('A M');
} else if (photoPos >= 42.1052631578951  && photoPos < 43.8596491228074) {
           $("#myPhoto").attr("src",bgImages[24]);
    $("#svg-minute").css({
            "transform": "rotate(2160deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(360deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 43.8596491228074  && photoPos < 45.6140350877197) {
           $("#myPhoto").attr("src",bgImages[25]);
    $("#svg-minute").css({
            "transform": "rotate(2250deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(360deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 45.6140350877197  && photoPos < 47.368421052632) {
           $("#myPhoto").attr("src",bgImages[26]);
    $("#svg-minute").css({
            "transform": "rotate(2340deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(360deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 47.368421052632  && photoPos < 49.1228070175443) {
           $("#myPhoto").attr("src",bgImages[27]);
    $("#svg-minute").css({
            "transform": "rotate(2430deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(360deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 49.1228070175443  && photoPos < 50.8771929824566) {
           $("#myPhoto").attr("src",bgImages[28]);
    $("#svg-minute").css({
            "transform": "rotate(2520deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(390deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 50.8771929824566  && photoPos < 52.6315789473689) {
           $("#myPhoto").attr("src",bgImages[29]);
    $("#svg-minute").css({
            "transform": "rotate(2610deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(390deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 52.6315789473689  && photoPos < 54.3859649122812) {
           $("#myPhoto").attr("src",bgImages[30]);
    $("#svg-minute").css({
            "transform": "rotate(2700deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(390deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 54.3859649122812  && photoPos < 56.1403508771935) {
           $("#myPhoto").attr("src",bgImages[31]);
    $("#svg-minute").css({
            "transform": "rotate(2790deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(390deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 56.1403508771935  && photoPos < 57.8947368421058) {
           $("#myPhoto").attr("src",bgImages[32]);
    $("#svg-minute").css({
            "transform": "rotate(2880deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(420deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 57.8947368421058  && photoPos < 59.6491228070181) {
           $("#myPhoto").attr("src",bgImages[33]);
    $("#svg-minute").css({
            "transform": "rotate(2970deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(420deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 59.6491228070181  && photoPos < 61.4035087719304) {
           $("#myPhoto").attr("src",bgImages[34]);
    $("#svg-minute").css({
            "transform": "rotate(3060deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(420deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 61.4035087719304  && photoPos < 63.1578947368427) {
           $("#myPhoto").attr("src",bgImages[35]);
    $("#svg-minute").css({
            "transform": "rotate(3150deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(420deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 63.1578947368427  && photoPos < 64.912280701755) {
           $("#myPhoto").attr("src",bgImages[36]);
    $("#svg-minute").css({
            "transform": "rotate(3240deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(450deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 64.912280701755  && photoPos < 66.6666666666673) {
           $("#myPhoto").attr("src",bgImages[37]);
    $("#svg-minute").css({
            "transform": "rotate(3330deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(450deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 66.6666666666673  && photoPos < 68.4210526315796) {
           $("#myPhoto").attr("src",bgImages[38]);
    $("#svg-minute").css({
            "transform": "rotate(3420deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(450deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 68.4210526315796  && photoPos < 70.1754385964919) {
           $("#myPhoto").attr("src",bgImages[39]);
    $("#svg-minute").css({
            "transform": "rotate(3510deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(450deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 70.1754385964919  && photoPos < 71.9298245614042) {
           $("#myPhoto").attr("src",bgImages[40]);
    $("#svg-minute").css({
            "transform": "rotate(3600deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(480deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 71.9298245614042  && photoPos < 73.6842105263165) {
           $("#myPhoto").attr("src",bgImages[41]);
    $("#svg-minute").css({
            "transform": "rotate(3690deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(480deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 73.6842105263165  && photoPos < 75.4385964912288) {
           $("#myPhoto").attr("src",bgImages[42]);
    $("#svg-minute").css({
            "transform": "rotate(3780deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(480deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 75.4385964912288  && photoPos < 77.1929824561411) {
           $("#myPhoto").attr("src",bgImages[43]);
    $("#svg-minute").css({
            "transform": "rotate(3870deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(480deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 77.1929824561411  && photoPos < 78.9473684210534) {
           $("#myPhoto").attr("src",bgImages[44]);
    $("#svg-minute").css({
            "transform": "rotate(3960deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(510deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 78.9473684210534  && photoPos < 80.7017543859657) {
           $("#myPhoto").attr("src",bgImages[45]);
    $("#svg-minute").css({
            "transform": "rotate(4050deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(510deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 80.7017543859657  && photoPos < 82.456140350878) {
           $("#myPhoto").attr("src",bgImages[46]);
    $("#svg-minute").css({
            "transform": "rotate(4140deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(510deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 82.456140350878  && photoPos < 84.2105263157903) {
           $("#myPhoto").attr("src",bgImages[47]);
    $("#svg-minute").css({
            "transform": "rotate(4230deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(510deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 84.2105263157903  && photoPos < 85.9649122807026) {
           $("#myPhoto").attr("src",bgImages[48]);
    $("#svg-minute").css({
            "transform": "rotate(4320deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(540deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 85.9649122807026  && photoPos < 87.7192982456149) {
           $("#myPhoto").attr("src",bgImages[49]);
    $("#svg-minute").css({
            "transform": "rotate(4410deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(540deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 87.7192982456149  && photoPos < 89.4736842105272) {
           $("#myPhoto").attr("src",bgImages[50]);
    $("#svg-minute").css({
            "transform": "rotate(4500deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(540deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 89.4736842105272  && photoPos < 91.2280701754395) {
           $("#myPhoto").attr("src",bgImages[51]);
    $("#svg-minute").css({
            "transform": "rotate(4590deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(540deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 91.2280701754395  && photoPos < 92.9824561403518) {
           $("#myPhoto").attr("src",bgImages[52]);
    $("#svg-minute").css({
            "transform": "rotate(4680deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(570deg)",
            });
            $('.ampm').text('P M');
} else if (photoPos >= 92.9824561403518  && photoPos < 100) {
           $("#myPhoto").attr("src",bgImages[53]);
    $("#svg-minute").css({
            "transform": "rotate(4770deg)",
            });
          $("#svg-hour").css({
            "transform": "rotate(570deg)",
            });
            $('.ampm').text('P M');
            $('range-slider').addClass('settingSun');


        } else {
            $("#myPhoto").attr("src",bgImages[53]);
        }

        // end the if logic
    function scrollClock(e) {
        const documentHeight = $(document).height();

        var viewportHeight = window.innerHeight;
        var scrollbarHeight = viewportHeight / documentHeight * viewportHeight;
        var progress = $(window).scrollTop() / (documentHeight - viewportHeight);
        var distanceCircle = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - clockHeight/2;

        //functions block
        posLayout(scrollbarHeight);
        updateUI(distanceCircle, progress);

    };
    }

function getVerticalScrollPercentage( elm ){
  var p = elm.parentNode
  return (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
}

function progressBarScroll() {
      let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
          height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
          scrolled = (winScroll / height) * 100;
      document.getElementById("progressBar").style.width = scrolled + "%";
    
      // Script 4: the progressive fill of the slider
      $('#range-slider__range').on('input', function(e){
          var min = e.target.min,
              max = e.target.max,
              val = e.target.value;

          $(e.target).css({
            'backgroundSize': (val - min) * 100 / (max - min) + '% 100%'
          });
        }).trigger('input'); 
        }

//additional script logic for managing the slider's progressive fill

var elem = document.getElementById('cw-arrows');
var elem2 = document.getElementById('ccw-arrows');
window.addEventListener('scroll', function() {
	var value = window.scrollY * 0.85;
	elem.style.transform = `rotate(${value}deg)`; 
    elem2.style.transform = `rotate(${value}deg)`;
});

//var i = document.querySelector('input')
var i = document.getElementById("range-slider__range");

var myHeight = document.body.scrollHeight;
var limit = window.clientHeight;

i.addEventListener('input', function () {
  const num = parseNum(i.value);
    $(window).scrollTop(num);
})


// this listener is used to update the slider based on the scroll position
window.addEventListener('scroll', function(e) {
  i.value = parseNum(window.scrollY);
  windowScrollTop = $(window).scrollTop();
    
var pos = getVerticalScrollPercentage(document.body);
  
var mydocHeight = $(document).height();
var mywinHeight = $(window).height();

    
    
}, false);



// attempting to change the max value of the slider
$(document).ready(function() {
    
    var myMaxValue = ($(document).height()-$(window).height());
    
    $("#range-slider__range").attr({
       "max" : myMaxValue,        // substitute your own
       "min" : 0          // values (or variables) here
    });
});

// the functions that get called
function parseNum(v) {
  return Number(v).toFixed(2);
}

function getVerticalScrollPercentage( elm ){
  var p = elm.parentNode
  return (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
}

