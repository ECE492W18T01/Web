$( document ).ready(function() {
  console.log( "Loading functionUpdates.js!" );
  //var api_url = "http://crawler-api.us-west-2.elasticbeanstalk.com/api/status/";
  var apiURL = "http://localhost:3000/api/status/";
  var requestFrequency = 0.001;
  var updateFrontEndFrequency = 0.0001;

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
      "connected": 1,
      "message": "Crawler not connected.",
      "steering": -1,
      "brake": 12,
      "sonar": 12,
      "wheels": {
        "fl": 1,
        "fr": 1,
        "rl": 0,
        "rr": 1,
      }
    };


  drawWheels();



  function run() {
    console.log('Starting.');
    requestHandler = setInterval(getCrawler, 100);
    connectivityHandler = setInterval(changeConnectedStatus, 100);
    logHandler = setInterval(changeLogMessage, 100);
    steeringHandler = setInterval(changeSteeringStatus, 100);
    brakingHandler = setInterval(changeBrakingStatus, 100);
    sonarHandler = setInterval(changeSonarStatus, 100);
    wheelFLHandler = setInterval(changeWheelStatusFL, 100);
    wheelFRHandler = setInterval(changeWheelStatusFR, 100);
    wheelRLHandler = setInterval(changeWheelStatusRL, 100);
    wheelRRHandler = setInterval(changeWheelStatusRR, 100);
  }

  function end() {
    /*
      Reset most things to initial state
    */
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
 

    document.getElementById("connectivity").innerHTML = xhttp.status;
    xhttp.onreadystatechange = function (){
      if (this.readyState == 4 && this.status == 200)
        document.getElementById("connectivity").innerHTML = "inside loop";
        var responseData = JSON.parse(this.responseText);
        console.log(responseData);
        crawler = responseData.crawler;
      }


    xhttp.open("GET", "http://localhost:3000/api/status/", true);
    xhttp.send();

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

    if(crawler.message ){
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
    if(oldSteering != crawler.steering){
      if(crawler.steering  == 1 ){
        document.getElementById("fl").style.transform = "rotate("+20+"deg)";
        document.getElementById("fr").style.transform = "rotate("+20+"deg)";
        }

        else if(crawler.steering == 0){
        document.getElementById("fl").style.transform = "rotate("+0+"deg)";
        document.getElementById("fr").style.transform = "rotate("+0+"deg)";
        }

        else if(crawler.steering == -1 ){
        document.getElementById("fl").style.transform = "rotate("+-20+"deg)";
        document.getElementById("fr").style.transform = "rotate("+-20+"deg)";
        }
        oldSteering = crawler.steering;
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
    $('#sonar-message').text(crawler.sonar);
  }


  function changeWheelStatus(wheel, status){
    /*
        Changes wheel display corresponsding to status.

        wheel - String, wheel identifier. ex. "fl"
        status - Int, current status of the wheel. ex. 1
    */
      if(status == 1){
        $(wheel).animate({ backgroundColor: wheelColorSlipping, },{ duration: 100, queue: false });
      }
      else{
        $(wheel).animate({ backgroundColor: wheelColorGood, },{ duration: 100, queue: false });
      }
  }

  function changeWheelStatusFL() {
    changeWheelStatus("fl", crawler.wheels.fl);
  }

  function changeWheelStatusFR() {
    changeWheelStatus("fr", crawler.wheels.fr);
  }

  function changeWheelStatusRL() {
    changeWheelStatus("rl", crawler.wheels.rl);
  }

  function changeWheelStatusRR() {
    changeWheelStatus("rr", crawler.wheels.rr);
  }

});
