
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
var servoResponse = 0;
var breakResponse = 0;
var batteryResponse = 0;
var FLResponse = 0;
var FRResponse = 0;
var RLResponse = 0;
var RRResponse = 0;
var sonarResponse = 0 ;
var connectedResponse = 0;
var commandsResponse = "";

function getCrawler(){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function (){
		//might be this.readyState == 4 && this.status == 200 for the real thing.
		//change to this.status for checking dummy test
		if (this.readyState == 4 && this.status == 200)

			var crawler = JSON.parse(this.responseText);
			// later parse response text; and place values into vars.
			// assuming the parse will be similar to '{"battery": "value", "FL": "value" ....
			// will change parse names to w.e later
			batteryResponse = crawler.battery;
			FLResponse = crawler.wheels.fl;
			FRResponse = crawler.wheels.fr;
			RLResponse = crawler.wheels.rl;
			RRResponse = crawler.wheels.rr;
			sonarResponse = crawler.sonar;
			connectedResponse = crawler.connected;
			servoResponse = crawler.servo;
			brakeResponse = crawler.brake;
      commandsResponse = crawler.commands;

		}



	xhttp.open("GET", "http://localhost:3000/api/status/", true);
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



// Time function, connection, command log, moving or breaking
var myVar = setInterval(myTimer, 500);
var state = 1;
var oldCommand = "";
function myTimer() {
    var d = new Date();

    document.getElementById("time").innerHTML = d.toLocaleTimeString();

    if(commandsResponse != oldCommand){
        document.getElementById("loginfo").innerHTML += commandsResponse+ "<br />";
        document.getElementById("loginfo").scrollTop =  document.getElementById("loginfo").scrollHeight;
        oldCommand = commandsResponse;
    }

     if (connectedResponse == 1){
        document.getElementById("JSTRING").innerHTML = "connected";
    }

    else {
        document.getElementById("JSTRING").innerHTML = "offline";
    }


    if(sonarResponse < 10){
        state = 0;
        document.getElementById("break").innerHTML = "Brake";
        document.getElementsByClassName('fa fa-cog fa-spin')[0].classList.toggle("fa-spin");

    }

    else if(sonarResponse > 10 && state == 0){
        state = 1;
        document.getElementById("break").innerHTML = "Moving";
        document.getElementsByClassName('fa fa-cog')[0].classList.toggle("fa-spin");

    }
}





//servo function
var updateMotor = setInterval(changeMotorStatus, 1000);

var old = 0;
function changeMotorStatus(){

	if(old != servoResponse){
		if(servoResponse  == 1 ){
			document.getElementById("fl").style.transform = "rotate("+20+"deg)";
			document.getElementById("fr").style.transform = "rotate("+20+"deg)";
  		}

    	else if(servoResponse == 0){
			document.getElementById("fl").style.transform = "rotate("+0+"deg)";
			document.getElementById("fr").style.transform = "rotate("+0+"deg)";
   		}

    	else if(servoResponse == -1 ){
			document.getElementById("fl").style.transform = "rotate("+-20+"deg)";
			document.getElementById("fr").style.transform = "rotate("+-20+"deg)";
	    }
    	old = servoResponse;
	}

}


// wheel function
var wheelUpdate1 = setInterval(changeWheelStatus1, 500);
var wheelUpdate2 = setInterval(changeWheelStatus2, 500);
var wheelUpdate3 = setInterval(changeWheelStatus3, 500);
var wheelUpdate4 = setInterval(changeWheelStatus4, 500);



function changeWheelStatus1(){
    var div = $("fl");
    	if(FLResponse == 1){
        div.animate({ backgroundColor: "#98bf21", },{ duration: 100, queue: false });
   		}
   		else{
        div.animate({ backgroundColor: "#d9534f", },{ duration: 100, queue: false });
        }
}

function changeWheelStatus2(){
    var div = $("fr");
    	if(FRResponse == 1){
        div.animate({ backgroundColor: "#98bf21", },{ duration: 300, queue: false });
   		}
   		else{
        div.animate({ backgroundColor: "#d9534f", },{ duration: 300, queue: false });
        }
}

function changeWheelStatus3(){
    var div = $("rl");
    	if(RLResponse == 1){
        div.animate({ backgroundColor: "#98bf21", },{ duration: 300, queue: false });
   		}
   		else{
        div.animate({ backgroundColor: "#d9534f", },{ duration: 300, queue: false });
        }
}

function changeWheelStatus4(){
    var div = $("rr");
    	if(RRResponse == 1){
        div.animate({ backgroundColor: "#98bf21", },{ duration: 300, queue: false });
   		}
   		else{
        div.animate({ backgroundColor: "#d9534f", },{ duration: 300, queue: false });
        }
}



// sonar function
var sonarUpdate = setInterval(sonarFunction, 1000);
function sonarFunction() {
    document.getElementById("sonarStatus").innerHTML = sonarResponse.toString();

}


//battery function
/*
var batteryUpdate = setInterval(batteryFunction, 1000);
<i id="batteryPosition" class="fa fa-battery-4" style="font-size:80px;color:green;"></i>
function batteryFunction(){
	if(batteryResponse <= 80 && batteryResponse >60){
		document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-3");
        document.getElementById('batteryPosition').classList.replace("fa-battery-2","fa-battery-3");
        document.getElementById('batteryPosition').classList.replace("fa-battery-1","fa-battery-3");
        document.getElementById('batteryPosition').classList.replace("fa-battery-0","fa-battery-3");
        document.getElementById('batteryPosition').style.color = "green"

	}
	else if(batteryResponse <= 60 && batteryResponse >40 ){
        document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-2");
        document.getElementById('batteryPosition').classList.replace("fa-battery-3","fa-battery-2");
	    document.getElementById('batteryPosition').classList.replace("fa-battery-1","fa-battery-2");
		document.getElementById('batteryPosition').classList.replace("fa-battery-0","fa-battery-2");
		document.getElementById('batteryPosition').style.color = "#ffff00"
	}
	else if(batteryResponse <= 40 && batteryResponse >20 ){
        document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-1");
        document.getElementById('batteryPosition').classList.replace("fa-battery-3","fa-battery-1");
        document.getElementById('batteryPosition').classList.replace("fa-battery-2","fa-battery-1");
		document.getElementById('batteryPosition').classList.replace("fa-battery-0","fa-battery-1");
		document.getElementById('batteryPosition').style.color = "#ff0000"
	}
    // To be cautious:
    // made it look zero even at 20% because we should turn it off and charge it to avoid any problems.
	else if(batteryResponse <= 20 ){
        document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-0");
        document.getElementById('batteryPosition').classList.replace("fa-battery-3","fa-battery-0");
	    document.getElementById('batteryPosition').classList.replace("fa-battery-2","fa-battery-0");
		document.getElementById('batteryPosition').classList.replace("fa-battery-1","fa-battery-0");
		document.getElementById('batteryPosition').style.color = "#000000"
	}
    else if(batteryResponse > 80 ){
        document.getElementById('batteryPosition').classList.replace("fa-battery-3","fa-battery-4");
        document.getElementById('batteryPosition').classList.replace("fa-battery-2","fa-battery-4");
        document.getElementById('batteryPosition').classList.replace("fa-battery-1","fa-battery-4");
        document.getElementById('batteryPosition').classList.replace("fa-battery-0","fa-battery-4");
        document.getElementById('batteryPosition').style.color = "green"
    }

}*/
