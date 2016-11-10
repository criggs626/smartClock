jQuery.ajaxSetup({async:false});
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('time').innerHTML =
    h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function getCity(){
	var city="";
	$.get("img/city.txt",function(data){
		city = data;
	});
	return city;
}

function getWeather(){
	var weather="";
	var city=getCity();
	$.get("http://api.openweathermap.org/data/2.5/weather?q=" + city + ",us&&units=imperial&&APPID=b7be14db38278a763b2c5702ed1ba1d2",function(data){
		weather=data;
	});
	return weather;
	
}

function setWeather(){
	var weather=getWeather();
	var description = weather.weather[0].description;
	var name = weather.name;
	var temperature= weather.main.temp;
	var min=weather.main.temp_min;
	var max=weather.main.temp_max;
	$("#city").html(name);
	$("#temp").html(temperature);
	$("#description").html(description);
	$("#hilo").html(max+"/"+min);
}

function getEvents(){
	var events="";
	$.get('php/getEvents.php', function (data) {
		events=JSON.parse(data);
	});
	return events;
}

function setEvents(){
	var events=getEvents();
	var today = new Date();
	var currentM=today.getMonth()+1;
	var currentD=today.getDate();
	
	for(var i=0;i<events.data.length;i++){
		if(currentM==parseInt(events.data[i][3].substring(0,2)) && currentD==events.data[i][3].substring(3,5)){
			$("#events").append("<div style='display:inline-block;padding:5px;' id='"+events.data[i][0]+"'><h3>"+events.data[i][1]+"</h3><h3>"+events.data[i][2]+"</h3><h3>"+events.data[i][3]+"</h3></div>");
		}
	}
	
}

startTime();
setWeather();
//setEvents();
var t = setTimeout(refresh, 60000)
function refresh(){
	location.reload();
}
