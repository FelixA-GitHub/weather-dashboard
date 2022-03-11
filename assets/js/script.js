//variable to display the date with format preference
let currentWDate = moment().format(' (MM/DD/YYYY)');
let currentWCity = "City";
let currentWIcon = " 🌤";

$("#current-weather-city").html(currentWCity);
$(".current-weather-date").html(currentWCity + currentWDate + currentWIcon);


var getWeather = function(coords) {
    //make the api call to get the weather based on a set of coordinates
    var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coords.lat + "&lon=" + coords.lng + "&units=imperial&exclude=minutely,hourly&appid=33d05024949e3f3d2fc78856ad6d0554";
    fetch(weatherApiUrl).then(function(response){
        if (response.ok) {
            response.json().then(function(data){
                displayCurrWeather(data);  // display the current weather and forecast
            })
        } else {
            console.log("Couldn't get the weather data from the openweathermap API: ", response.text);
        }
    })
}

var displayIcon = function() {

}

var displayCurrWeather = function() {

}

var displayForecast = function() {

}

var searchButton = function(){
    
}

var displaySearchHistory = function() {

}

//event handlers