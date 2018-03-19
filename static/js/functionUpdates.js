
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



var ResponseTimer = setInterval(getCrawler, 200);
var servoResponse = 0;
var breakResponse = 0;
var batteryResponse = 0; 
var FLResponse = 0;
var FRResponse = 0;
var RLResponse = 0;
var RRResponse = 0;
var sonarResponse = 0 ;
var connectedResponse = 0; 

function getCrawler(){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function (){
		//might be this.readyState == 4 && this.status == 200 for the real thing.
		//change to this.status for checking dummy test
		if (this.readyState = 4 && this.status == 200)
			
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
			breakResponse = crawler.break;
			 
		}


	
	xhttp.open("GET", "http://localhost:3000/api/status/", true);
	xhttp.send();

}



var online = setInterval(connected, 1000);
function connected(){
	if (connectedResponse == 1){
		document.getElementById("JSTRING").innerHTML = "connected";
	}

	else {
		document.getElementById("JSTRING").innerHTML = "offline";
	}
}

// Time function and Tells if breaking or moving
var myVar = setInterval(myTimer, 1000);
var state = 1;
function myTimer() {
    var d = new Date();
    
    document.getElementById("time").innerHTML = d.toLocaleTimeString();

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

var batteryUpdate = setInterval(batteryFunction, 1000);

function batteryFunction(){
	if(batteryResponse <= 80 && batteryResponse >60){
		document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-3");
	}
	else if(batteryResponse <= 60 && batteryResponse >40 ){
		if (document.getElementById('batteryPosition').classList.contains("fa-battery-4")){
			document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-2");
			document.getElementById('batteryPosition').style.color = "#ffff00"		
		}
		document.getElementById('batteryPosition').classList.replace("fa-battery-3","fa-battery-2");
		document.getElementById('batteryPosition').style.color = "#ffff00"
	}
	else if(batteryResponse <= 40 && batteryResponse >20 ){
        if (document.getElementById('batteryPosition').classList.contains("fa-battery-4")){
			document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-1");
			document.getElementById('batteryPosition').style.color = "#ff0000"		
		}
		document.getElementById('batteryPosition').classList.replace("fa-battery-2","fa-battery-1");
		document.getElementById('batteryPosition').style.color = "#ff0000"
	}
	else if(batteryResponse <= 20 ){
		if (document.getElementById('batteryPosition').classList.contains("fa-battery-4")){
			document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-0");
			document.getElementById('batteryPosition').style.color = "#000000"		
		}
		document.getElementById('batteryPosition').classList.replace("fa-battery-1","fa-battery-0");
		document.getElementById('batteryPosition').style.color = "#000000"
	}

}


//maybe use probably not
/*
// FROM STACK OVERFLOW FOURMS https://stackoverflow.com/questions/20445357/canvas-rotate-circle-in-certain-speed-using-requestanimationframe
// wheel moves 
var Canvas = document.getElementById("canvas");
var ctx = Canvas.getContext("2d");
    
var startAngle = (2*Math.PI);
var endAngle = (Math.PI*1.5);
var currentAngle = 0;

var oldTime = getTime();

function getTime() {
    return (new Date()).getTime();
}


    var raf = window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame;
    
//initial draw
var newTime = getTime(),
            	diff = newTime - oldTime;
        
        	oldTime = newTime;
        
        	//Clears
        	ctx.clearRect(0,0,Canvas.width,Canvas.height);
        
        	//Drawing
        	ctx.beginPath();                  
        	ctx.arc(40, 40, 30, startAngle + currentAngle, endAngle + currentAngle, false);
        
       		ctx.strokeStyle = "black";
        	ctx.lineWidth = 20.0;	
        	ctx.stroke();
        
       	 	currentAngle += diff * 0.001 ;
        
        	currentAngle %= 2 * Math.PI;

    function Update(){
    	if (sonarResponse > 10){
        	var newTime = getTime(),
            	diff = newTime - oldTime;
        
        	oldTime = newTime;
        
        	//Clears
        	ctx.clearRect(0,0,Canvas.width,Canvas.height);
        
        	//Drawing
        	ctx.beginPath();                  
        	ctx.arc(40, 40, 30, startAngle + currentAngle, endAngle + currentAngle, false);
        
       		ctx.strokeStyle = "black";
        	ctx.lineWidth = 20.0;	
        	ctx.stroke();
        
       	 	currentAngle += diff * 0.001 ;
        
        	currentAngle %= 2 * Math.PI;
        
        	
        }
       
        raf(Update);
    }
    raf(Update);

*/
