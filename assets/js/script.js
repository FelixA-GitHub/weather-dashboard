
let currentWCity = document.querySelector("#current-weather-city");
let currentWData = document.querySelector("#current-weather");
var displayName;


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

var displayCurrWeather = function(weatherData) {
    //current city
    currentWCity.textContent = displayName;
    //current date
    var dateEl = currentWData.querySelector("#current-weather-date");
    var unixDate = weatherData.current.dt; 
    var currentWDate = moment.unix(unixDate).format(' (MM/DD/YYYY)');
    dateEl.textContent = currentWDate;
    //current temp
    var tempEl = currentWData.querySelector("#current-weather-temp");
    var temperature = Math.floor(weatherData.current.temp);
    tempEl.textContent = "Temp: " + temperature + " °F";
    //current wind
    var windEl = currentWData.querySelector("current-weather-wind");
    var windSpeed = weatherData.current.wind_speed;
    windEl.textContent = "Wind: " + windSpeed + " MPH";
    //current humidity
    var humidEL = currentWData.querySelector("current-weather-humidity");
    var humidity = weatherData.current.humidity;
    humidEL.textContent = "Humidity: " + humidity + " %";
    //current uv index
    var uvEl = currentWData.querySelector("current-weather-uv-index");
    var uvIndex = weatherData.current.uvi;
    uvEl.textContent = "UV Index: " + uvIndex;

    var weatherContainer = document.querySelector("#weather-container");
    var currentWeather = document.querySelector("#current-weather");
    weatherContainer.style.display = "block";
    currentWeather.style.display = "block";
}

var displayForecast = function() {

}

var searchButton = function(){

}

var displaySearchHistory = function() {

}

//event handlers