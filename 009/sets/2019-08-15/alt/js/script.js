$(document).ready(function(){
//   var bodyHeight = $("body").height()-$(window).height();
    
    $('.myImg').animate({ opacity: 1 }, { duration: 3000 });
    
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

        $(id).css({
            transform: 'rotate(' + val + 'deg)'
        });        
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
        
    }, 80));
    

});

const pathToImages = "../../../../ImageSets/2019-08-15/";
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

  let hours = Math.floor(timeInMinutes / 60);
  const minutes = timeInMinutes % 60;

    
  const isMorning = hours < 12;

   const formattedHours = String(isMorning ? hours || 12 : (hours - 12 || 12));
  const formattedMinutes = String(minutes).padStart(2, '0');

      myValThumb.textContent = `${formattedHours}:${formattedMinutes} ${isMorning || (hours === 24) ? 'AM' : 'PM'}`;
    
    if (timeInMinutes < 360) {
    } else if (timeInMinutes == 360) {
    $("#myPhoto").attr("src",pathToImages + bgImages[0]);
        $('#quadrant').css({"transform": "rotate(0deg)" });
        jQuery(function(){_0600();
              });
              $("#value").html("1");
    } else if (timeInMinutes == 375) {
    $("#myPhoto").attr("src",pathToImages + bgImages[1]);
        $('#quadrant').css({"transform": "rotate(90deg)" });
        jQuery(function(){_0615();
              });
              $("#value").html("2");
    } else if (timeInMinutes == 390) {
    $("#myPhoto").attr("src",pathToImages + bgImages[2]);
        $('#quadrant').css({"transform": "rotate(180deg)" });
        jQuery(function(){_0630();
              });
              $("#value").html("3");
    } else if (timeInMinutes == 405) {
    $("#myPhoto").attr("src",pathToImages + bgImages[3]);
        $('#quadrant').css({"transform": "rotate(270deg)" });
        jQuery(function(){_0645();
              });
              $("#value").html("4");
    } else if (timeInMinutes == 420) {
    $("#myPhoto").attr("src",pathToImages + bgImages[4]);
        $('#quadrant').css({"transform": "rotate(360deg)" });
        jQuery(function(){_0700();
              });
              $("#value").html("5");
    } else if (timeInMinutes == 435) {
    $("#myPhoto").attr("src",pathToImages + bgImages[5]);
        $('#quadrant').css({"transform": "rotate(450deg)" });
        jQuery(function(){_0715();
              });
              $("#value").html("6");
    } else if (timeInMinutes == 450) {
    $("#myPhoto").attr("src",pathToImages + bgImages[6]);
        $('#quadrant').css({"transform": "rotate(540deg)" });
        jQuery(function(){_0730();
              });
              $("#value").html("7");
    } else if (timeInMinutes == 465) {
    $("#myPhoto").attr("src",pathToImages + bgImages[7]);
        $('#quadrant').css({"transform": "rotate(630deg)" });
        jQuery(function(){_0745();
              });
              $("#value").html("8");
    } else if (timeInMinutes == 480) {
    $("#myPhoto").attr("src",pathToImages + bgImages[8]);
        $('#quadrant').css({"transform": "rotate(720deg)" });
        jQuery(function(){_0800();
              });
              $("#value").html("9");
    } else if (timeInMinutes == 495) {
    $("#myPhoto").attr("src",pathToImages + bgImages[9]);
        $('#quadrant').css({"transform": "rotate(810deg)" });
        jQuery(function(){_0815();
              });
              $("#value").html("10");
    } else if (timeInMinutes == 510) {
    $("#myPhoto").attr("src",pathToImages + bgImages[10]);
        $('#quadrant').css({"transform": "rotate(900deg)" });
        jQuery(function(){_0830();
              });
              $("#value").html("11");
    } else if (timeInMinutes == 525) {
    $("#myPhoto").attr("src",pathToImages + bgImages[11]);
        $('#quadrant').css({"transform": "rotate(990deg)" });
        jQuery(function(){_0845();
              });
              $("#value").html("12");
    } else if (timeInMinutes == 540) {
    $("#myPhoto").attr("src",pathToImages + bgImages[12]);
        $('#quadrant').css({"transform": "rotate(1080deg)" });
        jQuery(function(){_0900();
              });
              $("#value").html("13");
    } else if (timeInMinutes == 555) {
    $("#myPhoto").attr("src",pathToImages + bgImages[13]);
        $('#quadrant').css({"transform": "rotate(1170deg)" });
        jQuery(function(){_0915();
              });
              $("#value").html("14");
    } else if (timeInMinutes == 570) {
    $("#myPhoto").attr("src",pathToImages + bgImages[14]);
        $('#quadrant').css({"transform": "rotate(1260deg)" });
        jQuery(function(){_0930();
              });
              $("#value").html("15");
    } else if (timeInMinutes == 585) {
    $("#myPhoto").attr("src",pathToImages + bgImages[15]);
        $('#quadrant').css({"transform": "rotate(1350deg)" });
        jQuery(function(){_0945();
              });
              $("#value").html("16");
    } else if (timeInMinutes == 600) {
    $("#myPhoto").attr("src",pathToImages + bgImages[16]);
        $('#quadrant').css({"transform": "rotate(1440deg)" });
        jQuery(function(){_1000();
              });
              $("#value").html("17");
    } else if (timeInMinutes == 615) {
    $("#myPhoto").attr("src",pathToImages + bgImages[17]);
        $('#quadrant').css({"transform": "rotate(1530deg)" });
        jQuery(function(){_1015();
              });
              $("#value").html("18");
    } else if (timeInMinutes == 630) {
    $("#myPhoto").attr("src",pathToImages + bgImages[18]);
        $('#quadrant').css({"transform": "rotate(1620deg)" });
        jQuery(function(){_1030();
              });
              $("#value").html("19");
    } else if (timeInMinutes == 645) {
    $("#myPhoto").attr("src",pathToImages + bgImages[19]);
        $('#quadrant').css({"transform": "rotate(1710deg)" });
        jQuery(function(){_1045();
              });
              $("#value").html("20");
    } else if (timeInMinutes == 660) {
    $("#myPhoto").attr("src",pathToImages + bgImages[20]);
        $('#quadrant').css({"transform": "rotate(1800deg)" });
        jQuery(function(){_1100();
              });
              $("#value").html("21");
    } else if (timeInMinutes == 675) {
    $("#myPhoto").attr("src",pathToImages + bgImages[21]);
        $('#quadrant').css({"transform": "rotate(1890deg)" });
        jQuery(function(){_1115();
              });
              $("#value").html("22");
    } else if (timeInMinutes == 690) {
    $("#myPhoto").attr("src",pathToImages + bgImages[22]);
        $('#quadrant').css({"transform": "rotate(1980deg)" });
        jQuery(function(){_1130();
              });
              $("#value").html("23");
    } else if (timeInMinutes == 705) {
    $("#myPhoto").attr("src",pathToImages + bgImages[23]);
        $('#quadrant').css({"transform": "rotate(2070deg)" });
        jQuery(function(){_1145();
              });
              $("#value").html("24");
    } else if (timeInMinutes == 720) {
    $("#myPhoto").attr("src",pathToImages + bgImages[24]);
        $('#quadrant').css({"transform": "rotate(2160deg)" });
        jQuery(function(){_1200();
              });
              $("#value").html("25");
    } else if (timeInMinutes == 735) {
    $("#myPhoto").attr("src",pathToImages + bgImages[25]);
        $('#quadrant').css({"transform": "rotate(2250deg)" });
        jQuery(function(){_1215();
              });
              $("#value").html("26");
    } else if (timeInMinutes == 750) {
    $("#myPhoto").attr("src",pathToImages + bgImages[26]);
        $('#quadrant').css({"transform": "rotate(2340deg)" });
        jQuery(function(){_1230();
              });
              $("#value").html("27");
    } else if (timeInMinutes == 765) {
    $("#myPhoto").attr("src",pathToImages + bgImages[27]);
        $('#quadrant').css({"transform": "rotate(2430deg)" });
        jQuery(function(){_1245();
              });
              $("#value").html("28");
    } else if (timeInMinutes == 780) {
    $("#myPhoto").attr("src",pathToImages + bgImages[28]);
        $('#quadrant').css({"transform": "rotate(2520deg)" });
        jQuery(function(){_1300();
              });
              $("#value").html("29");
    } else if (timeInMinutes == 795) {
    $("#myPhoto").attr("src",pathToImages + bgImages[29]);
        $('#quadrant').css({"transform": "rotate(2610deg)" });
        jQuery(function(){_1315();
              });
              $("#value").html("30");
    } else if (timeInMinutes == 810) {
    $("#myPhoto").attr("src",pathToImages + bgImages[30]);
        $('#quadrant').css({"transform": "rotate(2700deg)" });
        jQuery(function(){_1330();
              });
              $("#value").html("31");
    } else if (timeInMinutes == 825) {
    $("#myPhoto").attr("src",pathToImages + bgImages[31]);
        $('#quadrant').css({"transform": "rotate(2790deg)" });
        jQuery(function(){_1345();
              });
              $("#value").html("32");
    } else if (timeInMinutes == 840) {
    $("#myPhoto").attr("src",pathToImages + bgImages[32]);
        $('#quadrant').css({"transform": "rotate(2880deg)" });
        jQuery(function(){_1400();
              });
              $("#value").html("33");
    } else if (timeInMinutes == 855) {
    $("#myPhoto").attr("src",pathToImages + bgImages[33]);
        $('#quadrant').css({"transform": "rotate(2970deg)" });
        jQuery(function(){_1415();
              });
              $("#value").html("34");
    } else if (timeInMinutes == 870) {
    $("#myPhoto").attr("src",pathToImages + bgImages[34]);
        $('#quadrant').css({"transform": "rotate(3060deg)" });
        jQuery(function(){_1430();
              });
              $("#value").html("35");
    } else if (timeInMinutes == 885) {
    $("#myPhoto").attr("src",pathToImages + bgImages[35]);
        $('#quadrant').css({"transform": "rotate(3150deg)" });
        jQuery(function(){_1445();
              });
              $("#value").html("36");
    } else if (timeInMinutes == 900) {
    $("#myPhoto").attr("src",pathToImages + bgImages[36]);
        $('#quadrant').css({"transform": "rotate(3240deg)" });
        jQuery(function(){_1500();
              });
              $("#value").html("37");
    } else if (timeInMinutes == 915) {
    $("#myPhoto").attr("src",pathToImages + bgImages[37]);
        $('#quadrant').css({"transform": "rotate(3330deg)" });
        jQuery(function(){_1515();
              });
              $("#value").html("38");
    } else if (timeInMinutes == 930) {
    $("#myPhoto").attr("src",pathToImages + bgImages[38]);
        $('#quadrant').css({"transform": "rotate(3420deg)" });
        jQuery(function(){_1530();
              });
              $("#value").html("39");
    } else if (timeInMinutes == 945) {
    $("#myPhoto").attr("src",pathToImages + bgImages[39]);
        $('#quadrant').css({"transform": "rotate(3510deg)" });
        jQuery(function(){_1545();
              });
              $("#value").html("40");
    } else if (timeInMinutes == 960) {
    $("#myPhoto").attr("src",pathToImages + bgImages[40]);
        $('#quadrant').css({"transform": "rotate(3600deg)" });
        jQuery(function(){_1600();
              });
              $("#value").html("41");
    } else if (timeInMinutes == 975) {
    $("#myPhoto").attr("src",pathToImages + bgImages[41]);
        $('#quadrant').css({"transform": "rotate(3690deg)" });
        jQuery(function(){_1615();
              });
              $("#value").html("42");
    } else if (timeInMinutes == 990) {
    $("#myPhoto").attr("src",pathToImages + bgImages[42]);
        $('#quadrant').css({"transform": "rotate(3780deg)" });
        jQuery(function(){_1630();
              });
              $("#value").html("43");
    } else if (timeInMinutes == 1005) {
    $("#myPhoto").attr("src",pathToImages + bgImages[43]);
        $('#quadrant').css({"transform": "rotate(3870deg)" });
        jQuery(function(){_1645();
              });
              $("#value").html("44");
    } else if (timeInMinutes == 1020) {
    $("#myPhoto").attr("src",pathToImages + bgImages[44]);
        $('#quadrant').css({"transform": "rotate(3960deg)" });
        jQuery(function(){_1700();
              });
              $("#value").html("45");
    } else if (timeInMinutes == 1035) {
    $("#myPhoto").attr("src",pathToImages + bgImages[45]);
        $('#quadrant').css({"transform": "rotate(4050deg)" });
        jQuery(function(){_1715();
              });
              $("#value").html("46");
    } else if (timeInMinutes == 1050) {
    $("#myPhoto").attr("src",pathToImages + bgImages[46]);
        $('#quadrant').css({"transform": "rotate(4140deg)" });
        jQuery(function(){_1730();
              });
              $("#value").html("47");
    } else if (timeInMinutes == 1065) {
    $("#myPhoto").attr("src",pathToImages + bgImages[47]);
        $('#quadrant').css({"transform": "rotate(4230deg)" });
        jQuery(function(){_1745();
              });
              $("#value").html("48");
    } else if (timeInMinutes == 1080) {
    $("#myPhoto").attr("src",pathToImages + bgImages[48]);
        $('#quadrant').css({"transform": "rotate(4320deg)" });
        jQuery(function(){_1800();
              });
              $("#value").html("49");
    } else if (timeInMinutes == 1095) {
    $("#myPhoto").attr("src",pathToImages + bgImages[49]);
        $('#quadrant').css({"transform": "rotate(4410deg)" });
        jQuery(function(){_1815();
              });
              $("#value").html("50");
    } else if (timeInMinutes == 1110) {
    $("#myPhoto").attr("src",pathToImages + bgImages[50]);
        $('#quadrant').css({"transform": "rotate(4500deg)" });
        jQuery(function(){_1830();
              });
              $("#value").html("51");
    } else if (timeInMinutes == 1125) {
    $("#myPhoto").attr("src",pathToImages + bgImages[51]);
        $('#quadrant').css({"transform": "rotate(4590deg)" });
        jQuery(function(){_1845();
              });
              $("#value").html("52");
    } else if (timeInMinutes == 1140) {
    $("#myPhoto").attr("src",pathToImages + bgImages[52]);
        $('#quadrant').css({"transform": "rotate(4680deg)" });
        jQuery(function(){_1900();
              });
              $("#value").html("53");
    } else if (timeInMinutes == 1155) {
    $("#myPhoto").attr("src",pathToImages + bgImages[53]);
        $('#quadrant').css({"transform": "rotate(4770deg)" });
        jQuery(function(){_1915();
              });
              $("#value").html("54");
    } else if (timeInMinutes == 1170) {
    $("#myPhoto").attr("src",pathToImages + bgImages[54]);
        $('#quadrant').css({"transform": "rotate(4860deg)" });
        jQuery(function(){_1930();
              });
              $("#value").html("55");
 } else {
//    $("#myPhoto").attr("src",pathToImages +  bgImages[54]);
                }

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
    
    var pos = getVerticalScrollPercentage(document.body);
    
    var newValue = (value * scrollFactor);
    
    $("html, body").scrollTop(newValue);

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