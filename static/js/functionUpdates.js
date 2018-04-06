
// drawing lines wheel to wheel making it look attached.
var c = document.getElementById("drawlines");
var ctx = c.getContext("2d");
ctx.beginPath();
ctx.moveTo(15, 15);
ctx.lineTo(190,15 );
ctx.lineTo(150,15 );
ctx.lineTo(150,140 );
ctx.lineTo(15,140);
ctx.lineTo(190,140);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150, 15);
ctx.lineTo(15,15);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150,140);
ctx.lineTo(190,140);
ctx.stroke();


//ajax set up
// The the url in the httpRequest.open is the crawler.com/api/get-crawler? then grab reponse text or obj (will change to
// which ever

//TODO make a button toggle to ask for

//var ResponseTimer = setInterval(getCrawler, 1000);
var crawler = {
    "connected": 0,
    "message": "Crawler not connected.",
    "servo": 0,
    "brake": 0,
    "battery" : 0,
    "sonar": 0,
    "wheels": {
      "fl": 0,
      "fr": 0,
      "rl": 0,
      "rr": 0,
		}
  };

function getCrawler(){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function (){
		//might be this.readyState == 4 && this.status == 200 for the real thing.
		//change to this.status for checking dummy test
		if (this.readyState == 4 && this.status == 200)
			var response_data = JSON.parse(this.responseText);
			crawler = response_data.crawler;
		}


	//api_url = "http://crawler-api.us-west-2.elasticbeanstalk.com/api/status/"
	api_url = "http://localhost:3000/api/status/"
	xhttp.open("GET", api_url, true);
	xhttp.send();
}

//Toggle the buttons to show, To see if we need to request or if we want to stop requesting
function SwitchButtons(buttonId) {
  var hideBtn, showBtn, menuToggle;
  if (buttonId == 'batteryPosition') {
    menuToggle = 'menu2';
    showBtn = 'batteryPosition2';
    hideBtn = 'batteryPosition';
  } else {
    menuToggle = 'menu3';
    showBtn = 'batteryPosition';
    hideBtn = 'batteryPosition2';
  }
  //I don't have your menus, so this is commented out.  just uncomment for your usage
  // document.getElementById(menuToggle).toggle(); //step 1: toggle menu
  document.getElementById(hideBtn).style.display = 'none'; //step 2 :additional feature hide button
  document.getElementById(showBtn).style.display = ''; //step 3:additional feature show button


}


function changeConnectedStatus() {
		if (connectedResponse == 1){
			 document.getElementById("JSTRING").innerHTML = "connected";
		}

		else {
			 document.getElementById("JSTRING").innerHTML = "offline";
		}
}


// Time function, connection, command log, moving or breaking
var myVar = setInterval(myTimer, 500);
var oldCommand = "";
function changeLogMessage() {
    var d = new Date();

    document.getElementById("time").innerHTML = d.toLocaleTimeString();

    if(commandsResponse != oldCommand){
        document.getElementById("loginfo").innerHTML += commandsResponse+ "<br />";
        document.getElementById("loginfo").scrollTop =  document.getElementById("loginfo").scrollHeight;
        oldCommand = commandsResponse;
    }





}

//Breaking animation
var state = 1;
function changeBreakingStatus() {
	if(sonarResponse < 10){
			state = 0;
			document.getElementById("break").innerHTML = "Break";
			document.getElementsByClassName('fa fa-cog fa-spin')[0].classList.toggle("fa-spin");

	}

	else if(sonarResponse > 10 && state == 0){
			state = 1;
			document.getElementById("break").innerHTML = "Moving";
			document.getElementsByClassName('fa fa-cog')[0].classList.toggle("fa-spin");

	}
}





//Steering Animation
var updateSteering = setInterval(changeSteeringStatus(crawler.servo), 1000);

var old = 0;
function changeSteeringStatus(servo){

	if(old != servo){
		if(servo  == 1 ){
			document.getElementById("fl").style.transform = "rotate("+20+"deg)";
			document.getElementById("fr").style.transform = "rotate("+20+"deg)";
  		}

    	else if(servo == 0){
			document.getElementById("fl").style.transform = "rotate("+0+"deg)";
			document.getElementById("fr").style.transform = "rotate("+0+"deg)";
   		}

    	else if(servo == -1 ){
			document.getElementById("fl").style.transform = "rotate("+-20+"deg)";
			document.getElementById("fr").style.transform = "rotate("+-20+"deg)";
	    }
    	old = servo;
	}

}


// Wheel animation
var wheel_update_frequency = 0.5
var wheelUpdateFL = setInterval(changeWheelStatus("fl", FLResponse), 1/wheel_update_frequency);
var wheelUpdateFR = setInterval(changeWheelStatus("fr", FLResponse), 1/wheel_update_frequency);
var wheelUpdateRL = setInterval(changeWheelStatus("rl", FLResponse), 1/wheel_update_frequency);
var wheelUpdateRR = setInterval(changeWheelStatus("rr", FLResponse), 1/wheel_update_frequency);

function changeWheelStatus(wheel, status){
	/*
		Changes wheel display corresponsding to status.
			wheel - String, wheel identifier. ex. "fl"
			status - Int, current status of the wheel. ex. 1
	*/
		var good = "#98bf21";
		var bad =  "#d9534f";

    var div = $(wheel);
    	if(status == 1){
        div.animate({ backgroundColor: good, },{ duration: 100, queue: false });
   		}
   		else{
        div.animate({ backgroundColor: bad, },{ duration: 100, queue: false });
        }
}





// Sonar Animation
var sonarUpdateFrequency = 0.5
var sonarID = "sonarStatus"
var sonarUpdate = setInterval(sonarFunction(sonarID), 1/sonarUpdateFrequency);
function sonarFunction() {
	/*
		Change sonar string displayed on frontend.
	*/
    document.getElementById(sonarID).innerHTML = sonarResponse.toString();

}
