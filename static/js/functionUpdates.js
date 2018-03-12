

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


var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    document.getElementById("time").innerHTML = d.toLocaleTimeString();
}

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

var sonarUpdate = setInterval(sonarFunction, 3000);
var sonarNumber = 1;
function sonarFunction() {
    document.getElementById("sonarStatus").innerHTML = sonarNumber;
    sonarNumber++;
}


var batteryUpdate = setInterval(batteryFunction, 2000);
var batteryNumber  = 100;


function batteryFunction(){
	batteryNumber -= 10; ;
	if(batteryNumber <= 80 && batteryNumber >60){
		document.getElementById('batteryPosition').classList.replace("fa-battery-4","fa-battery-3");
	}
	else if(batteryNumber <= 60 && batteryNumber >40){
		document.getElementById('batteryPosition').classList.replace("fa-battery-3","fa-battery-2");
		document.getElementById('batteryPosition').style.color = "#ffff00"
	}
	else if(batteryNumber <= 40 && batteryNumber >20){
		document.getElementById('batteryPosition').classList.replace("fa-battery-2","fa-battery-1");
		document.getElementById('batteryPosition').style.color = "#ff0000"
	}
	else if(batteryNumber <= 20){
		document.getElementById('batteryPosition').classList.replace("fa-battery-1","fa-battery-0");
		document.getElementById('batteryPosition').style.color = "#000000"
	}

}


