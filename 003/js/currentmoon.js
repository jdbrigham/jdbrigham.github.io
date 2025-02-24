let image;
    var pageImage = document.querySelector("img");
var phase = document.querySelector("#phase");
var d = new Date();
    var dd = d.getDate();
    var mm = d.getMonth()+1;
    var yy = d.getFullYear();
var Moon = {
  phase: function (yy,mm,dd) {
    
    var c = e = jd = b = 0;

    if (mm < 3) {
      yy--;
      mm += 12;
    }

    ++mm;
    c = 365.25 * yy;
    e = 30.6 * mm;
    jd = c + e + dd - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    b = parseInt(jd); // int(jd) -> b, take integer part of jd
    jd -= b; // subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round

    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0
    
    switch (b) {
      case 0:
        pageImage.src = "images/newmoon.png";
        phase.innerHTML = 'New-Moon';
        break;
      case 1:
        pageImage.src = 'images/waxingcrescent.png';
        phase.innerHTML = 'Waxing-Crescent-Moon';
        break;
      case 2:
        pageImage.src = "images/firstquarter.png";
        phase.innerHTML = 'Quarter-Moon';
        break;
        
      case 3:
        pageImage.src = "images/waxinggibbous.png";
        phase.innerHTML = 'Waxing-Gibbous-Moon';
        break;
      case 4:
        pageImage.src = "images/fullmoon.png";
        phase.innerHTML = 'Full-Moon';
        break;
      case 5:
        pageImage.src = "images/waninggibbous.png";
        phase.innerHTML = 'Waning-Gibbous-Moon';
        break;
      case 6:
        pageImage.src = "images/lastquarter.png";
        phase.innerHTML = 'Last-Quarter-Moon';
        
        break;
      case 7:
        pageImage.src = "images/waningcrescent.png";
        phase.innerHTML = 'Waning-Crescent-Moon';
        break;
    }
    
  }
};



// console.log(Moon.phase());

//document.addEventListener("keydown", function(e){
//  if (e.keyCode === 13){
//    dd = document.getElementById("day").value;
//    mm = document.getElementById("month").value;
//    yy = document.getElementById("year").value;
//    Moon.phase(yy,mm,dd);
//    document.getElementById("day").value = "";
//    document.getElementById("month").value = "";
//    document.getElementById("year").value = "";
//    document.querySelector(".imageHeader").innerHTML = `Moon phase on ${dd}/${mm}/${yy}: `;
//  }
//});

//const search = document.querySelector(".searchBtn");
//search.addEventListener("click", function(){
//  document.querySelector(".main").style.opacity = "1";
//})


Moon.phase(yy,mm,dd);