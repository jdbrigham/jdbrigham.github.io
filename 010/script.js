// always start with the overnight image from August
var body = document.getElementsByTagName('body')[0];
var pictureinfo = document.getElementById('picInfo');

var srcmonth = "0815"
var myURL = "url(img/0815/_08152019.jpg)";

var day = new Date();
var hr = day.getHours();
hr = ("0" + hr).slice(-2);

const augTimes = ["August 15th 2019 7:00 AM","August 15th 2019 8:00 AM","August 15th 2019 9:00 AM","August 15th 2019 10:00 AM","August 15th 2019 11:00 AM","August 15th 2019 12:00 PM","August 15th 2019 1:00 PM","August 15th 2019 2:00 PM","August 15th 2019 3:00 PM","August 15th 2019 4:00 PM","August 15th 2019 5:00 PM","August 15th 2019 6:00 PM","August 15th 2019 7:00 PM"]

const octTimes = ["October 15th 2019 7:00 am","October 15th 2019 8:00 am","October 15th 2019 9:00 am","October 15th 2019 10:00 am","October 15th 2019 11:00 am","October 15th 2019 12:00 pm","October 15th 2019 1:00 pm","October 15th 2019 2:00 pm","October 15th 2019 3:00 pm","October 15th 2019 4:00 pm","October 15th 2019 5:00 pm","October 15th 2019 6:00 pm","October 15th 2019 7:00 pm"]

var theSet = augTimes;

$(document).ready(function(){
    // console.log('running function from lines 11-14');
	setInterval(function(){ reload_page(); },60*6000);
	changeBackground(srcmonth)
 });

 function reload_page() {
    // console.log('running function from lines 16-19');
	 window.location.reload(true);
 }	
	
function setMonth(radio) {
      srcmonth=radio.value;
	  // console.log(srcmonth);
//	  body.style.backgroundImage = myURL;
	  changeBackground(srcmonth)
      }
	
function changeBackground() {
	// console.log("passed variable: " + srcmonth);
	if (srcmonth == "0815") {
		theSet = augTimes
		var theOvernight = "August 15th 2019 6:00 am"
	} else {	
		theSet = octTimes
		var theOvernight = "October 15th 2019 6:00 am"
	}
	
	myURL = "url(img/"+srcmonth+"/"+hr+"_"+srcmonth+"2019.jpg)";
	// console.log(myURL);
	if ((hr > 0) && (hr < 7)) {
		  body.style.backgroundImage = 'url(img/'+srcmonth+'/00_'+srcmonth+'2019.jpg)';
		  pictureinfo.innerHTML = theOvernight;
		}
		if (hr == 7) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[0];
		}
		if (hr == 8) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[1];
		}
		if (hr == 9) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[2];
		}
		if (hr == 10) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[3];
		}
		if (hr == 11) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[4];
		}
		if (hr == 12) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[5];
		  
		}
		if (hr == 13) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[6];
		}
		if (hr == 14) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[7];
		}
		if (hr == 15) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[8];
		}
		if (hr == 16) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[9];
		}
		if (hr == 17) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[10];
		}
		if (hr == 18) {
		  body.style.backgroundImage = myURL;
		  pictureinfo.innerHTML = theSet[11];
		}
		if ((hr >= 19) && (hr <= 23))  {
		  body.style.backgroundImage = 'url(img/0815/00_08152019.jpg)';
		  pictureinfo.innerHTML = theOvernight;
		}
}


function NumberToWords(e) {
  var words = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen',
  'Eighteen', 'Nineteen', 'Twenty'];
  words[30] = 'Thirty';
  words[40] = 'Forty';
  words[50] = 'Fifty';
  words[60] = 'Sixty';
  words[70] = 'Seventy';
  words[80] = 'Eighty';
  words[90] = 'Ninety';
  amount = e.toString();
  var atemp = amount.split(".");
  var number = atemp[0].split(",").join("");
  var n_length = number.length;
  var word = "";
  if (n_length <= 9) {
    var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    var received_n_array = new Array();
    for (var i = 0; i < n_length; i++) {
      received_n_array[i] = number.substr(i, 1);
    }
    for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
      n_array[i] = received_n_array[j];
    }
    for (var i = 0, j = 1; i < 9; i++, j++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        if (n_array[i] == 1) {
          n_array[j] = 10 + parseInt(n_array[j]);
          n_array[i] = 0;
        }
      }
    }
    value = "";
    for (var i = 0; i < 9; i++) {
      if (i == 0 || i == 2 || i == 4 || i == 7) {
        value = n_array[i] * 10;
      } else {
        value = n_array[i];
      }
      if (value != 0) {
        word += words[value] + " ";
      }
    }
    word = word.split("  ").join(" ");
  }
  return word;
}

function Display(m, h) {
  text.innerHTML = NumberToWords(m) + "Minute Past " + NumberToWords(H);
}

function setDate() {
  var it = "";
  const text = document.getElementsByClassName('time')[0];
  const Time = new Date();
  //const Time = new Date('3/29/2019 14:1:34');
  //const Time = new Date('3/29/2019 12:0:34');
  const Hours = Time.getHours();
  const Hours12 = Time.getHours() % 12 || 12;
  const Minutes = Time.getMinutes();
  const AMPM = Hours >= 12 ? 'pm' : 'am';

  // inserting code for getting date
    var date = new Date();
    var myDate = document.getElementById("myDate");
    var dayList = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    var monthNames = [
      "JAN",
      "FEB",
      "MAR",
      "APR",
      "MAY",
      "JUN",
      "JUL",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ];
    var dayName = dayList[date.getDay()];
    var monthName = monthNames[date.getMonth()];
    var theYear = date.getFullYear();
    var today = `${dayName} ${monthName} ${date.getDate()} ${date.getFullYear()}`;
    myDate.innerText = `${today}`;

  if (Minutes === 0)
  {
    text.innerHTML = it + NumberToWords(Hours12) + " O' Clock ";
  } else
  if (Minutes === 1)
  {
    text.innerHTML = it + NumberToWords(Minutes) + "Minute Past " + NumberToWords(Hours12);
  } else

  if (Minutes === 59)
  {
    var tmp = [60 - Minutes];
    var tmp1 = [Hours12 + 1];
    //Hours12 = Hours12 + "1"
    text.innerHTML = it + NumberToWords(tmp) + " Minute To " + NumberToWords(tmp1);
  } else
  if (Minutes === 15)
  {
    text.innerHTML = it + "Quarter Past  " + NumberToWords(Hours12);
  } else
  if (Minutes === 30)
  {
    text.innerHTML = it + "Half Past " + NumberToWords(Hours12);
  } else
  if (Minutes === 45)
  {
    var tmp1 = [Hours12 + 1];
    text.innerHTML = it + "Quarter To " + NumberToWords(tmp1);
  } else

  if (Minutes <= 30)
  {
    text.innerHTML = it + NumberToWords(Minutes) + "Minutes Past " + NumberToWords(Hours12);
  } else

  if (Minutes > 30)
  {
    var tmp = [60 - Minutes];
    var tmp1 = [Hours12 + 1];
    text.innerHTML = it + NumberToWords(tmp) + " Minutes To " + NumberToWords(tmp1);
  }



}
setInterval(setDate, 1000);
