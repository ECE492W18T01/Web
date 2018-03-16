
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

var ResponseTimer = setInterval(getCrawler, 1000);

var crawler = "stuff"
var BatteryResponse = 0; 
var FLResponse = 0;
var FRResponse = 0;
var RLResponse = 0;
var RRREsponse = 0;
var sonarResponse = 0 ;
var OfflineResponse = 0; 

function getCrawler(){

	var xhttp = new XMLHttpRequest();
	xhttp.onreadyystatechange = function (){
		if (this.readystate == 4 && this.stats ==200)
			crawler = Json.parse(this.responseText);
			// later parse response text; and place values into vars.
			// assuming the parse will be similar to '{"battery": "value", "FL": "value" .... 
			// will change parse names to w.e later
			BatteryResponse = crawler.battery
			FLResponse = crawler.FL
			FRResponse = crawler.FR
			RLResponse = crawler.RL
			RRREsponse = crawler.RR
			sonarResponse = crawler.sonar
			OfflineResponse = crawler.off


	} 
	xhttp.open("GET", "crawler.com/api/get-crawler", true);
	xhttp.send();

}



// Figure out the variable outputs and convert that.
// Variables below will the variables getting the output from the website *change later once confirmed with steven*

// Time function
var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
}


// wheel function
var wheelUpdate = setInterval(changeWheelStatus, 3000);
var wheelStatus = 1;

function changeWheelStatus(){
    var div = $("wheel");
    	if(wheelStatus == 1){
        div.animate({ backgroundColor: "#98bf21", },);
        wheelStatus = 2;
   		}	
   		else{	
        div.animate({ backgroundColor: "#d9534f", },);
        wheelStatus = 1;
        }
}



// sonar function
var sonarUpdate = setInterval(sonarFunction, 3000);
var sonarNumber = 1;
function sonarFunction() {
    document.getElementById("sonarStatus").innerHTML = sonarNumber;
    sonarNumber++;
}


//battery function

var batteryUpdate = setInterval(batteryFunction, 1000);
var batteryNumber  = 100;

var OfflineFlag = 0;

function batteryFunction(){
	batteryNumber -= 10; ;
	if(batteryNumber <= 80 && batteryNumber >60){
		document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-3");
	}
	else if(batteryNumber <= 60 && batteryNumber >40 ){
		document.getElementById('batteryPosition').classList.replace("fa-battery-3","fa-battery-2");
		document.getElementById('batteryPosition').style.color = "#ffff00"
		OfflineFlag = 1;
	}
	else if((batteryNumber <= 40 && batteryNumber >20) && OfflineFlag == 0 ){

		document.getElementById('batteryPosition').classList.replace("fa-battery-2","fa-battery-1");
		document.getElementById('batteryPosition').style.color = "#ff0000"
	}
	else if(batteryNumber <= 20 && OfflineFlag == 0){
		document.getElementById('batteryPosition').classList.replace("fa-battery-1","fa-battery-0");
		document.getElementById('batteryPosition').style.color = "#000000"
	}

}


