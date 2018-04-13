/*
Creation date: March 1, 2018

Created by Fredric Mendi
Modified by Steven Lagrange

Javascript /jquery functions to update HTML components and stream video feed 
*/



$( document ).ready(function() {
	console.log( "Loading functionUpdates.js!" );
	//var api_url = "http://crawler-api.us-west-2.elasticbeanstalk.com/api/status/";
	var piIP = "http://192.168.0.15:"
	var piPort = 3000
	var apiURL = piIP + piPort + "/api/status/";
	var requestFrequency = 0.001;
	var updateFrontEndFrequency = 0.001;

	var oldMessage = "";
	var oldSteering = 0;
	var state = 1;
	var oldBrakeState = 0;

	var connectedMessage = "Connected.";
	var offlineMessage = "Offline.";
	var wheelColorSlipping = "#98bf21";
	var wheelColorGood =  "#d9534f";

	var requestHandler;
	var connectivityHandler;
	var logHandler;
	var steeringHandler;
	var brakingHandler;
	var sonarHandler;
	var wheelFLHandler;
	var wheelFRHandler;
	var wheelRLHandler;
	var wheelRRHandler;

	var crawler = {
    'connected' : 1,
    'message' : "Crawler not connected.",
    'brake' : 0,
    'distance' : 0,
    'last_updated': "",
    'motors' : {
        'fl' : 0,
        'fr' : 0,
        'rl' : 0,
        'rr' : 0,
        'steering' : 0
    },
    'sensors' : {
        'fl' : 0,
        'fr' : 0,
        'rl' : 0,
        'rr' : 0,
        'steering' : 0,
    },
    'fuzzy' : {
        'enabled': 0,
        'fl' : 0,
        'fr' : 0,
        'rl' : 0,
        'rr' : 0,
        'steering' : 0,
    }
};


	drawWheels();



	function run() {
		console.log('Starting.');
		requestHandler = setInterval(getCrawler, 1/requestFrequency);
		connectivityHandler = setInterval(changeConnectedStatus, 1/updateFrontEndFrequency);
		logHandler = setInterval(changeLogMessage, 1/updateFrontEndFrequency);
		steeringHandler = setInterval(changeSteeringStatus, 1/updateFrontEndFrequency);
		brakingHandler = setInterval(changeBrakingStatus, 1/updateFrontEndFrequency);
		sonarHandler = setInterval(changeSonarStatus, 1/updateFrontEndFrequency);
		wheelFLHandler = setInterval(changeWheelStatusFL, 1/updateFrontEndFrequency);
		wheelFRHandler = setInterval(changeWheelStatusFR, 1/updateFrontEndFrequency);
		wheelRLHandler = setInterval(changeWheelStatusRL, 1/updateFrontEndFrequency);
		wheelRRHandler = setInterval(changeWheelStatusRR, 1/updateFrontEndFrequency);
	}

	function end() {
		document.getElementById("connectivity").innerHTML = offlineMessage;
    	$('#sonar-message').text("N/A");
    	brakeMessage.text("-");
    	brakeCog.removeClass("fa-spin");
    	oldBrakeState = 0;


		console.log('Ending.');
		clearInterval(requestHandler);
		clearInterval(logHandler);
		clearInterval(steeringHandler);
		clearInterval(brakingHandler);
		clearInterval(sonarHandler);
		clearInterval(wheelFLHandler);
		clearInterval(wheelFRHandler);
		clearInterval(wheelRLHandler);
		clearInterval(wheelRRHandler);
	}

	$('#request').click(function() {
		if ($(this).hasClass('running')) {
			end();
			$(this).text('Connect');
			$(this).removeClass('running');
			$(this).removeClass('btn-warning');
			$(this).addClass('btn-success');
		} else {
			run();
			$(this).text('Disconnect');
			$(this).addClass('running');
			$(this).addClass('btn-warning');
			$(this).removeClass('btn-success');
		}
	});

	function drawWheels() {
		// Drawing lines wheel to wheel making it look attached.
		var c = document.getElementById("wheels-canvas");
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
	}


	function getCrawler(){
		/*
			AJAX request to Crawler API. Updates JSON Crawler variable.
		*/
		var xhttp = new XMLHttpRequest();
		console.log(apiURL);
		xhttp.open("GET", apiURL, true);
		xhttp.send();

		xhttp.onreadystatechange = function (){
			if (this.readyState == 4 && this.status == 200)
				var responseData = JSON.parse(this.responseText);
				console.log(responseData);
				crawler = responseData.crawler;
			}
	}


	function changeConnectedStatus() {
		/*
			Updates the connectivity status on the front end of the website.

			status = Int, used to indicate connectivty of crawler.
		*/
			if (crawler.connected == 1){
				 document.getElementById("connectivity").innerHTML = connectedMessage;
			}
			else {
				 document.getElementById("connectivity").innerHTML = offlineMessage;
			}
	}


	function changeLogMessage() {
		/*
			Updates Log Message on front end.
		*/
		var now = new Date();
	  	document.getElementById("time").innerHTML = now.toLocaleTimeString();

	  	if(crawler.message != oldMessage){
	    		document.getElementById("logger-message").innerHTML += crawler.message+ "<br />";

				document.getElementById("logger-message").scrollTop =  document.getElementById("logger-message").scrollHeight;

	     	 oldMessage = crawler.message;
	 	 }
	}


	function changeSteeringStatus(){
		/*
			Animate steering from the Crawler.

			steering - Int, latest steering status recieved.
		*/
		if(oldSteering != crawler.motors.steering){
			if(crawler.motors.steering  == 1 ){
				document.getElementById("fl").style.transform = "rotate("+20+"deg)";
				document.getElementById("fr").style.transform = "rotate("+20+"deg)";
	  		}

	    	else if(crawler.motors.steering == 0){
				document.getElementById("fl").style.transform = "rotate("+0+"deg)";
				document.getElementById("fr").style.transform = "rotate("+0+"deg)";
	   		}

	    	else if(crawler.motors.steering == -1 ){
				document.getElementById("fl").style.transform = "rotate("+-20+"deg)";
				document.getElementById("fr").style.transform = "rotate("+-20+"deg)";
		    }
	    	oldSteering = crawler.motors.steering;
		}
	}


	 function changeBrakingStatus() {
    /*
      Update displayed breaking status of crawler.
    */
    brakeMessage = $('#brake-message');
    brakeCog = $('#brake-cog > i');

    if(crawler.brake < 10 && oldBrakeState != crawler.brake){
        oldBrakeState = crawler.brake;
        brakeMessage.text("Stopping");
        brakeCog.removeClass("fa-spin");
    }

    else if(crawler.brake > 10 && oldBrakeState != crawler.brake){
        oldBrakeState = crawler.brake;
        brakeMessage.text("Moving.");
        brakeCog.addClass("fa-spin");
    }
  }


	function changeSonarStatus() {
		/*
			Change sonar string displayed on frontend.
		*/
		$('#sonar-message').text(crawler.distance);
	}


	function changeWheelStatus(wheel, status){
		/*
				Changes wheel display corresponsding to status.

				wheel - String, wheel identifier. ex. "fl"
				status - Int, current status of the wheel. ex. 1
		*/
			rate = 100;
            console.log(status);
	    if(status == 1){
	      $(wheel).animate({ backgroundColor: wheelColorGood, },{ duration: rate, queue: false });
	   	}
	   	else{
	    	$(wheel).animate({ backgroundColor: wheelColorSlipping, },{ duration: rate, queue: false });
	    }
	}

	function changeWheelStatusFL() {
		changeWheelStatus("fl", crawler.motors.fl);
		console.log(crawler.motors.fl);
	}

	function changeWheelStatusFR() {
		changeWheelStatus("fr", crawler.motors.fr);
	}

	function changeWheelStatusRL() {
		changeWheelStatus("rl", crawler.motors.rl);
	}

	function changeWheelStatusRR() {
		changeWheelStatus("rr", crawler.motors.rr);
	}

});
