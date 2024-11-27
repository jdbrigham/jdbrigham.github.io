$(document).ready(function(){
//   var bodyHeight = $("body").height()-$(window).height();
    
    // define variables
    var m = moment();
    var minutes = (m.hour() * 60) + m.minute();
    var progresshour = 0;
    var clockHeight = $('#clock').height();
    var viewportHeight = window.innerHeight;
    var scrollbarHeight = viewportHeight / $(document).height() * viewportHeight;
    
    const documentHeight = $(document).height();
    var viewportHeight = window.innerHeight;
    
    function progressToText(progress, ratio, adjustment) {
        return  ((progress * ratio) + adjustment).toString();
    }
    function rotateElement(id, val) {
//        if (id=='#svg-hour') {
//            val = val - 213.9692307692;
//        } else { 
//        val = val + 48;
//        }
//        $("#newValue").html(val);
        $(id).css({
            transform: 'rotate(' + val + 'deg)'
        });

//        $("#newValue").html(val);

        
    }
    
//    progress is the incoming scroll position, 460 and 5460 are the total elapsed degrees and 150 and 48 are the starting degrees for sunrise and sunset
    function updateUI(progress) {
        rotateElement('#svg-hour', progressToText(progress, 460, 150));
        rotateElement('#svg-minute', progressToText(progress, 5460, 48));
        
        }
    function scrollClock(e) {
        var progress = $(window).scrollTop()/ (documentHeight - viewportHeight);
//        var progress = $(window).scrollTop();
        updateUI(progress);
//        $("#scrollPosition").html(progress);
        
    };
    
    $(window).scroll(_.throttle(function() {
        scrollClock();
        
//        for info & display only
//        var $height = $(window).scrollTop();
//        $("#scrollPosition").html(documentHeight - viewportHeight);
        
    }, 80));
    

});

let myAngle = 0;
const pathToImages = "../../../../_ImageSets/2019-08-15/";
var bgImages = [
  "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
    "11.jpg",
    "12.jpg",
    "13.jpg",
    "14.jpg",
    "15.jpg",
    "16.jpg",
    "17.jpg",
    "18.jpg",
    "19.jpg",
    "20.jpg",
    "21.jpg",
    "22.jpg",
    "23.jpg",
    "24.jpg",
    "25.jpg",
    "26.jpg",
    "27.jpg",
    "28.jpg",
    "29.jpg",
    "30.jpg",
    "31.jpg",
    "32.jpg",
    "33.jpg",
    "34.jpg",
    "35.jpg",
    "36.jpg",
    "37.jpg",
    "38.jpg",
    "39.jpg",
    "40.jpg",
    "41.jpg",
    "42.jpg",
    "43.jpg",
    "44.jpg",
    "45.jpg",
    "46.jpg",
    "47.jpg",
    "48.jpg",
    "49.jpg",
    "50.jpg",
    "51.jpg",
    "52.jpg",
    "53.jpg",
    "54.jpg",
    "55.jpg"

];

var scrollPositions = [
"0.056950398040416406",
"0.07356480809346609",
"0.09019186832835388",
"0.10681892856324167",
"0.131270487732195",
"0.131270487732195",
"0.15572204690114694",
"0.1723491071360347",
"0.18897616737092252",
"0.2056032276058103",
"0.221677893447642",
"0.2382118799755052",
"0.2554844083104737",
"0.2711334061786034",
"0.2878138395590937",
"0.3043875266483789",
"0.328862471223761",
"0.33",
"0.3533374157991427",
"0.3698714023270055",
"0.38654476545605976",
"0.40317182569094756",
"0.41979888592583536",
"0.43642594616072317",
"0.45305300639561097",
"0.46870200426374065",
"0.4853290644986284",
"0.5019561247335163",
"0.518583184968404",
"0.53",
"0.5518373054381795",
"0.5684643656730674",
"0.584113363541197",
"0.6007404237760848",
"0.6173674840109726",
"0.6339945442458604",
"0.6506216044807482",
"0.667248664715636",
"0.6838757249505238",
"0.6995247228186535",
"0.7161517830535413",
"0.725",
"0.7494059035233168",
"0.7660329637582046",
"0.7826600239930924",
"0.7985303123086344",
"0.8149360820961099",
"0.8315982853643601",
"0.8481902025658855",
"0.8648172628007733",
"0.8814443230356611",
"0.8980713832705488",
"0.9146984435054366",
"0.93",
"0.9469745016084541"
];

let length = bgImages.length;
let lastElement = bgImages[bgImages.length - 1];
let firstElement = bgImages[0];
var scrollPosValue = 0;
const sliderWrapper = document.querySelector('.slider-wrapper');
const sliderSvg = document.querySelector('.slider-svg');
const sliderPath = document.querySelector('.slider-svg-path');
const sliderPathLength = sliderPath.getTotalLength();
const sliderThumb = document.querySelector('.slider-thumb');
const sliderThumbIcon = document.querySelector('#circle892');
const sliderInput = document.querySelector('.slider-input');
const sliderMinValue = +sliderInput.min || 0;
const sliderMaxValue = +sliderInput.max || 100;
const time = document.querySelector('.slider-value');
const bodyHeight = $("body").height()-$(window).height();
let scrollFactor = (bodyHeight/ (sliderMaxValue - sliderMinValue));
const myVal = document.querySelector('#newValue');
const myScrollVal = document.querySelector('#scrollValue');
const myValThumb = document.querySelector('#thumb-time');

document.onscroll = function(){ 
    var pos = getVerticalScrollPercentage(document.body);
    var photoPos = getVerticalScrollPercentage(document.body);

    if (photoPos >= 0  && photoPos <= 6.8307692307692305) {
                  $("#myPhoto").attr("src",pathToImages + bgImages[0]);
                  jQuery(function(){
                    _0600();
                  });
                  $("#value").html('1');
                } else if (photoPos >= 6.83076923076923  && photoPos <  8.48069666182874) {
           $("#myPhoto").attr("src",pathToImages + bgImages[1]);
           jQuery(function(){
            _0615();
          });
          var scrollPosValue = 2;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 6.83076923076923  && photoPos <  8.48069666182874) {
           $("#myPhoto").attr("src",pathToImages + bgImages[1]);
           jQuery(function(){
            _0615();
          });
          var scrollPosValue = 2;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 8.48069666182874  && photoPos <  10.1306240928883) {
           $("#myPhoto").attr("src",pathToImages + bgImages[2]);
           jQuery(function(){
            _0630();
          });
          var scrollPosValue = 3;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 10.1306240928883  && photoPos <  11.7805515239478) {
           $("#myPhoto").attr("src",pathToImages + bgImages[3]);
           jQuery(function(){
            _0645();
          });
          var scrollPosValue = 4;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 11.7805515239478  && photoPos <  13.4304789550073) {
           $("#myPhoto").attr("src",pathToImages + bgImages[4]);
           jQuery(function(){
            _0700();
          });
          var scrollPosValue = 5;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 13.4304789550073  && photoPos <  15.0804063860668) {
           $("#myPhoto").attr("src",pathToImages + bgImages[5]);
           jQuery(function(){
            _0715();
          });
          var scrollPosValue = 6;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 15.0804063860668  && photoPos <  16.7303338171263) {
           $("#myPhoto").attr("src",pathToImages + bgImages[6]);
           jQuery(function(){
            _0730();
          });
          var scrollPosValue = 7;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 16.7303338171263  && photoPos <  18.3802612481858) {
           $("#myPhoto").attr("src",pathToImages + bgImages[7]);
           jQuery(function(){
            _0745();
          });
          var scrollPosValue = 8;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 18.3802612481858  && photoPos <  20.0301886792453) {
           $("#myPhoto").attr("src",pathToImages + bgImages[8]);
           jQuery(function(){
            _0800();
          });
          var scrollPosValue = 9;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 20.0301886792453  && photoPos <  21.6801161103048) {
           $("#myPhoto").attr("src",pathToImages + bgImages[9]);
           jQuery(function(){
            _0815();
          });
          var scrollPosValue = 10;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 21.6801161103048  && photoPos <  23.3300435413643) {
           $("#myPhoto").attr("src",pathToImages + bgImages[10]);
           jQuery(function(){
            _0830();
          });
          var scrollPosValue = 11;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 23.3300435413643  && photoPos <  24.9799709724238) {
           $("#myPhoto").attr("src",pathToImages + bgImages[11]);
           jQuery(function(){
            _0845();
          });
          var scrollPosValue = 12;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 24.9799709724238  && photoPos <  26.6298984034833) {
           $("#myPhoto").attr("src",pathToImages + bgImages[12]);
           jQuery(function(){
            _0900();
          });
          var scrollPosValue = 13;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 26.6298984034833  && photoPos <  28.2798258345428) {
           $("#myPhoto").attr("src",pathToImages + bgImages[13]);
           jQuery(function(){
            _0915();
          });
          var scrollPosValue = 14;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 28.2798258345428  && photoPos <  29.9297532656023) {
           $("#myPhoto").attr("src",pathToImages + bgImages[14]);
           jQuery(function(){
            _0930();
          });
          var scrollPosValue = 15;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 29.9297532656023  && photoPos <  31.5796806966618) {
           $("#myPhoto").attr("src",pathToImages + bgImages[15]);
           jQuery(function(){
            _0945();
          });
          var scrollPosValue = 16;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 31.5796806966618  && photoPos <  33.2296081277213) {
           $("#myPhoto").attr("src",pathToImages + bgImages[16]);
           jQuery(function(){
            _1000();
          });
          var scrollPosValue = 17;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 33.2296081277213  && photoPos <  34.8795355587808) {
           $("#myPhoto").attr("src",pathToImages + bgImages[17]);
           jQuery(function(){
            _1015();
          });
          var scrollPosValue = 18;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 34.8795355587808  && photoPos <  36.5294629898403) {
           $("#myPhoto").attr("src",pathToImages + bgImages[18]);
           jQuery(function(){
            _1030();
          });
          var scrollPosValue = 19;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 36.5294629898403  && photoPos <  38.1793904208998) {
           $("#myPhoto").attr("src",pathToImages + bgImages[19]);
           jQuery(function(){
            _1045();
          });
          var scrollPosValue = 20;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 38.1793904208998  && photoPos <  39.8293178519593) {
           $("#myPhoto").attr("src",pathToImages + bgImages[20]);
           jQuery(function(){
            _1100();
          });
          var scrollPosValue = 21;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 39.8293178519593  && photoPos <  41.4792452830188) {
           $("#myPhoto").attr("src",pathToImages + bgImages[21]);
           jQuery(function(){
            _1115();
          });
          var scrollPosValue = 22;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 41.4792452830188  && photoPos <  43.1291727140783) {
           $("#myPhoto").attr("src",pathToImages + bgImages[22]);
           jQuery(function(){
            _1130();
          });
          var scrollPosValue = 23;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 43.1291727140783  && photoPos <  44.7791001451378) {
           $("#myPhoto").attr("src",pathToImages + bgImages[23]);
           jQuery(function(){
            _1145();
          });
          var scrollPosValue = 24;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 44.7791001451378  && photoPos <  46.4290275761973) {
           $("#myPhoto").attr("src",pathToImages + bgImages[24]);
           jQuery(function(){
            _1200();
          });
          var scrollPosValue = 25;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 46.4290275761973  && photoPos <  48.0789550072568) {
           $("#myPhoto").attr("src",pathToImages + bgImages[25]);
           jQuery(function(){
            _1215();
          });
          var scrollPosValue = 26;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 48.0789550072568  && photoPos <  49.7288824383163) {
           $("#myPhoto").attr("src",pathToImages + bgImages[26]);
           jQuery(function(){
            _1230();
          });
          var scrollPosValue = 27;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 49.7288824383163  && photoPos <  51.3788098693758) {
           $("#myPhoto").attr("src",pathToImages + bgImages[27]);
           jQuery(function(){
            _1245();
          });
          var scrollPosValue = 28;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 51.3788098693758  && photoPos <  53.0287373004353) {
           $("#myPhoto").attr("src",pathToImages + bgImages[28]);
           jQuery(function(){
            _1300();
          });
          var scrollPosValue = 29;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 53.0287373004353  && photoPos <  54.6786647314948) {
           $("#myPhoto").attr("src",pathToImages + bgImages[29]);
           jQuery(function(){
            _1315();
          });
          var scrollPosValue = 30;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 54.6786647314948  && photoPos <  56.3285921625543) {
           $("#myPhoto").attr("src",pathToImages + bgImages[30]);
           jQuery(function(){
            _1330();
          });
          var scrollPosValue = 31;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 56.3285921625543  && photoPos <  57.9785195936138) {
           $("#myPhoto").attr("src",pathToImages + bgImages[31]);
           jQuery(function(){
            _1345();
          });
          var scrollPosValue = 32;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 57.9785195936138  && photoPos <  59.6284470246733) {
           $("#myPhoto").attr("src",pathToImages + bgImages[32]);
           jQuery(function(){
            _1400();
          });
          var scrollPosValue = 33;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 59.6284470246733  && photoPos <  61.2783744557328) {
           $("#myPhoto").attr("src",pathToImages + bgImages[33]);
           jQuery(function(){
            _1415();
          });
          var scrollPosValue = 34;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 61.2783744557328  && photoPos <  62.9283018867923) {
           $("#myPhoto").attr("src",pathToImages + bgImages[34]);
           jQuery(function(){
            _1430();
          });
          var scrollPosValue = 35;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 62.9283018867923  && photoPos <  64.5782293178518) {
           $("#myPhoto").attr("src",pathToImages + bgImages[35]);
           jQuery(function(){
            _1445();
          });
          var scrollPosValue = 36;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 64.5782293178518  && photoPos <  66.2281567489113) {
           $("#myPhoto").attr("src",pathToImages + bgImages[36]);
           jQuery(function(){
            _1500();
          });
          var scrollPosValue = 37;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 66.2281567489113  && photoPos <  67.8780841799708) {
           $("#myPhoto").attr("src",pathToImages + bgImages[37]);
           jQuery(function(){
            _1515();
          });
          var scrollPosValue = 38;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 67.8780841799708  && photoPos <  69.5280116110303) {
           $("#myPhoto").attr("src",pathToImages + bgImages[38]);
           jQuery(function(){
            _1530();
          });
          var scrollPosValue = 39;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 69.5280116110303  && photoPos <  71.1779390420898) {
           $("#myPhoto").attr("src",pathToImages + bgImages[39]);
           jQuery(function(){
            _1545();
          });
          var scrollPosValue = 40;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 71.1779390420898  && photoPos <  72.8278664731493) {
           $("#myPhoto").attr("src",pathToImages + bgImages[40]);
           jQuery(function(){
            _1600();
          });
          var scrollPosValue = 41;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 72.8278664731493  && photoPos <  74.4777939042088) {
           $("#myPhoto").attr("src",pathToImages + bgImages[41]);
           jQuery(function(){
            _1615();
          });
          var scrollPosValue = 42;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 74.4777939042088  && photoPos <  76.1277213352683) {
           $("#myPhoto").attr("src",pathToImages + bgImages[42]);
           jQuery(function(){
            _1630();
          });
          var scrollPosValue = 43;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 76.1277213352683  && photoPos <  77.7776487663278) {
           $("#myPhoto").attr("src",pathToImages + bgImages[43]);
           jQuery(function(){
            _1645();
          });
          var scrollPosValue = 44;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 77.7776487663278  && photoPos <  79.4275761973873) {
           $("#myPhoto").attr("src",pathToImages + bgImages[44]);
           jQuery(function(){
            _1700();
          });
          var scrollPosValue = 45;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 79.4275761973873  && photoPos <  81.0775036284468) {
           $("#myPhoto").attr("src",pathToImages + bgImages[45]);
           jQuery(function(){
            _1715();
          });
          var scrollPosValue = 46;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 81.0775036284468  && photoPos <  82.7274310595063) {
           $("#myPhoto").attr("src",pathToImages + bgImages[46]);
           jQuery(function(){
            _1730();
          });
          var scrollPosValue = 47;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 82.7274310595063  && photoPos <  84.3773584905658) {
           $("#myPhoto").attr("src",pathToImages + bgImages[47]);
           jQuery(function(){
            _1745();
          });
          var scrollPosValue = 48;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 84.3773584905658  && photoPos <  86.0272859216253) {
           $("#myPhoto").attr("src",pathToImages + bgImages[48]);
           jQuery(function(){
            _1800();
          });
          var scrollPosValue = 49;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 86.0272859216253  && photoPos <  87.6772133526848) {
           $("#myPhoto").attr("src",pathToImages + bgImages[49]);
           jQuery(function(){
            _1815();
          });
          var scrollPosValue = 50;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 87.6772133526848  && photoPos <  89.3271407837443) {
           $("#myPhoto").attr("src",pathToImages + bgImages[50]);
           jQuery(function(){
            _1830();
          });
          var scrollPosValue = 51;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 89.3271407837443  && photoPos <  90.9770682148038) {
           $("#myPhoto").attr("src",pathToImages + bgImages[51]);
           jQuery(function(){
            _1845();
          });
          var scrollPosValue = 52;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 90.9770682148038  && photoPos <  92.6269956458633) {
           $("#myPhoto").attr("src",pathToImages + bgImages[52]);
           jQuery(function(){
            _1900();
          });
          var scrollPosValue = 53;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 92.6269956458633  && photoPos <  94.2769230769228) {
           $("#myPhoto").attr("src",pathToImages + bgImages[53]);
           jQuery(function(){
            _1915();
          });
          var scrollPosValue = 54;
          $("#value").html(scrollPosValue);
} else if (photoPos >= 94.2769230769228  && photoPos <  100) {
           $("#myPhoto").attr("src",pathToImages + bgImages[54]);
           jQuery(function(){
            _1930();
          });
          var scrollPosValue = 55;
          $("#value").html(scrollPosValue);
                } else {
                    $("#myPhoto").attr("src",pathToImages +  bgImages[54]);
                }
            }

function parseNum(v) {
  return Number(v).toFixed(2);
}
function getVerticalScrollPercentage( elm ){
  var p = elm.parentNode
  return (elm.scrollTop || p.scrollTop) / (p.scrollHeight - p.clientHeight ) * 100
}

const updateTime = (timeInMinutes) => {
  
//  the following line can be used for a slider that runs from sunrise to sunset
  timeInMinutes = timeInMinutes + 308;
    
//  timeInMinutes = timeInMinutes + 360;
    
    if (timeInMinutes == 360) {
      $('#scrollPosition').html('ONE');
    } else if (timeInMinutes == 375) { 
      $('#scrollPosition').html('TWO');
    } else if (timeInMinutes == 390) { 
      $('#scrollPosition').html('THREE');
    } else if (timeInMinutes == 405) { 
      $('#scrollPosition').html('FOUR');
    } else {
    }

  let hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;
//    if (minutes > 0 && minutes <= 15) {
//        minutesRounded = 15;
//    } else if (minutes > 15 && minutes <= 30) {
//        minutesRounded = 15;
//    } else if (minutes > 30 && minutes <= 45) {
//        minutesRounded = 30;
//    } else if (minutes > 45 && minutes <= 59) {
//        minutesRounded = 45;
//    } else {
//      minutesRounded = 00
//    }
    
  const isMorning = hours < 12;
//  const formattedHours = String(isMorning ? hours || 12 : (hours - 12 || 12)).padStart(2, '0');
    const formattedHours = String(isMorning ? hours || 12 : (hours - 12 || 12));
  const formattedMinutes = String(minutes).padStart(2, '0');

    
    if (formattedMinutes == 15 || formattedMinutes == 30 || formattedMinutes == 45 || formattedMinutes == 00) {
        $('#thumb-time').css('color', 'firebrick');
        myAngle+=90
        $('#quadrant').css({'transform': `rotate(${myAngle}deg)`});
          
   } else {
      $('#thumb-time').css('color', 'white');
//      $('#circle892').css('fill', 'none');
      $("#camera-icon").html('');
    }
    
//        if (formattedMinutes == 00) {
//          $('#quadrant').css({
//                    "transform": "rotate(0deg)" 
//                });
//    } else if (formattedMinutes == 15) { 
//          $('#quadrant').css({
//                        "transform": "rotate(90deg)" 
//                    });
//    } else if (formattedMinutes == 30) { 
//          $('#quadrant').css({
//                        "transform": "rotate(180deg)" 
//                    });
//    } else if (formattedMinutes == 45) { 
//          $('#quadrant').css({
//                        "transform": "rotate(270deg)" 
//                    });
//    } else {
//    }

      myValThumb.textContent = `${formattedHours}:${formattedMinutes} ${isMorning || (hours === 24) ? 'AM' : 'PM'}`;

}
const updatePosition = (progress) => {
    
//    this limits the 'scrollable area' to an area corresponding to the times of photos
    
//    if (progress < 0.056937747858578296) {
//      progress = 0.056937747858578296;
//    } else if (progress > 0.9469745016084541) { 
//      progress = 0.9469745016084541;
//    } else {
//    }
    
  const point = sliderPath.getPointAtLength(progress * sliderPathLength);
  const svgRect = sliderSvg.getBoundingClientRect();
  const scaleX = svgRect.width / sliderSvg.viewBox.baseVal.width;
  const scaleY = svgRect.height / sliderSvg.viewBox.baseVal.height;
  sliderThumb.style.left = `${point.x * scaleX * 100 / svgRect.width}%`;
  sliderThumb.style.top = `${point.y * scaleY * 100 / svgRect.height}%`;
  const value = Math.round(progress * (sliderMaxValue - sliderMinValue));
    
  // I think this is for rounding to 15 minute increments
  // let roundedValue = Math.round(value / 5) * 5;
  
  sliderInput.value = value;
    
    
    
  if (value < 300) {
    $("#circle892").css({ fill: '#E25729' });
    $("#theRays").css({ fill: '#e67812' });
} else if (value < 600) {
    $("#circle892").css({ fill: '#EC860E' });
    $("#theRays").css({ fill: '#EC860E' });
} else {
    $("#circle892").css({ fill: '#E25729' });
    $("#theRays").css({ fill: '#E25729' });
}
  updateTime(value);
    
    // is there some way I can pass this value to the analog clock?
    
    
    var pos = getVerticalScrollPercentage(document.body);
    
    var newValue = (value * scrollFactor);
    
    $("html, body").scrollTop(newValue);
    
    
    
    // attempt to capture the 'scroll position value'
//    var $bigExperiment = $('#value').text();
//    scrollPosValue = $bigExperiment;
//    myScrollVal.textContent = scrollPosValue;
     
//      val = scrollPositions[scrollPosValue + 1];
      

};
const handlePointerMove = (event) => {
  const sliderWidth = sliderPath.getBoundingClientRect().width;
  const pointerX = event.clientX - sliderPath.getBoundingClientRect().left;
  const progress = Math.min(Math.max(pointerX / sliderWidth, 0), 1);
  updatePosition(progress);
};
const handlePointerDown = (event) => {
  const sliderWidth = sliderPath.getBoundingClientRect().width;
  const pointerX = event.clientX - sliderPath.getBoundingClientRect().left;
  const progress = Math.min(Math.max(pointerX / sliderWidth, 0), 1);
  const isThumb = event.target.classList.contains('slider-thumb');
  if (!isThumb) updatePosition(progress);
  window.addEventListener('pointermove', handlePointerMove);
  window.addEventListener('pointerup', () => {
    window.removeEventListener('pointermove', handlePointerMove);
  });
};

sliderInput.addEventListener('input', () => {
  const progress = sliderInput.valueAsNumber / (sliderMaxValue - sliderMinValue);
    
  updatePosition(progress);
});

sliderThumb.addEventListener('pointerdown', handlePointerDown);
sliderPath.addEventListener('pointerdown', handlePointerDown);

updatePosition(0.0);

sliderWrapper.addEventListener('selectstart', (event) => {
  event.preventDefault();
})

// this listener is used to update the slider based on the scroll position
window.addEventListener('scroll', function(e) {

    let scrollPosition = parseNum(window.scrollY);
    let sliderValueTemp = (scrollPosition/scrollFactor);
    let sliderValue = (sliderValueTemp / (sliderMaxValue - sliderMinValue));
    
    updatePosition(sliderValue);
  
}, false);

// code for handling the arrows around the play button
var elem = document.getElementById('cw-arrows');
var elem2 = document.getElementById('ccw-arrows');
window.addEventListener('scroll', function() {
	var value = window.scrollY * 0.85;
	elem.style.transform = `rotate(${value}deg)`; 
    elem2.style.transform = `rotate(${value}deg)`;
});