
function init() {
    var currentWeatherEl = document.getElementById("current-weather");
    var fiveDayEl = document.getElementById("five-day-forecast");
    var cityEl = document.getElementById("enter-city");
    var searchEl = document.getElementById("search-button");
    var clearEl = document.getElementById("clear-history");
    var nameEl = document.getElementById("city-name");
    var currentIconEl = document.getElementById("current-weather-icon");
    var currentTempEl = document.getElementById("current-weather-temp");
    var currentHumidityEl = document.getElementById("current-weather-humidity");
    var currentWindEl = document.getElementById("current-weather-wind");
    var currentUvEl = document.getElementById("current-weather-uv-index");
    var historyEl = document.getElementById("history");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];


    function getWeather(cityName) {
        //get request for weather from OpenWeatherMap API
        let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=33d05024949e3f3d2fc78856ad6d0554";

        axios.get(weatherApiUrl)
            .then(function (response) {
                //removes d-none so that current weather may be displayed in container
                currentWeatherEl.classList.remove("d-none");

                //parses the response
                var currentDate = new Date(response.data.dt * 1000);
                var day = currentDate.getDate();
                var month = currentDate.getMonth() + 1;
                var year = currentDate.getFullYear();
                nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                let weatherIcon = response.data.weather[0].icon;
                currentIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
                currentIconEl.setAttribute("alt", response.data.weather[0].description);
                currentTempEl.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
                currentHumidityEl.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                currentWindEl.innerHTML = "Wind: " + response.data.wind.speed + " MPH";
                currentUvEl.innerHTML = "UV Index: " + response.data.uvi;
                
                
                //retrieve uv index
                let lat = response.data.coord.lat;
                let lon = response.data.coord.lon;
                let uvIndexApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,daily&appid=33d05024949e3f3d2fc78856ad6d0554";
                axios.get(uvIndexApiUrl)
                    .then(function (response) {
                        let uvIndex = document.createElement("span");
                        
                        //for uv index, favorable is green, moderate is yellow, severe is red
                        if (response.data[0].value < 4 ) {
                            uvIndex.setAttribute("class", "badge badge-success");
                        }
                        else if (response.data[0].value < 8) {
                            uvIndex.setAttribute("class", "badge badge-warning");
                        }
                        else {
                            uvIndex.setAttribute("class", "badge badge-danger");
                        }
                        console.log(response.data[0].value);
                        uvIndex.innerHTML = response.data[0].value;
                        currentUvEl.innerHTML = "UV Index: ";
                        currentUvEl.append(uvIndex);
                    });
                
                //5 day forecast
                let cityID = response.data.id;//pulls city id from weatherApiUrl get response to insert into forecastApiUrl
                let forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=33d05024949e3f3d2fc78856ad6d0554";

                axios.get(forecastApiUrl)
                    .then(function (response) {
                        //removes the d-none class
                        fiveDayEl.classList.remove("d-none");
                        
                        //parses the response for 5 day forecast
                        var forecastEls = document.querySelectorAll(".forecast");
                        for (i = 0; i < forecastEls.length; i++) {
                            forecastEls[i].innerHTML = "";
                            var forecastIndex = i * 8 + 4;
                            var forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            var forecastDay = forecastDate.getDate();
                            var forecastMonth = forecastDate.getMonth() + 1;
                            var forecastYear = forecastDate.getFullYear();
                            var forecastDateEl = document.createElement("p");
                            forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date fw-bold fs-5");
                            forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                            forecastEls[i].append(forecastDateEl);

                            //icons, temp, wind speed, and humidity, for 5 day forecast
                            var forecastWeatherEl = document.createElement("img");
                            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                            forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                            forecastWeatherEl.setAttribute("class", "forecast-icon");
                            forecastEls[i].append(forecastWeatherEl);
                            var forecastTempEl = document.createElement("p");
                            forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                            forecastEls[i].append(forecastTempEl);
                            var forecastWindEl = document.createElement("p");
                            forecastWindEl.innerHTML = "Wind: " + response.data.list[forecastIndex].wind.speed + " MPH";
                            forecastEls[i].append(forecastWindEl);
                            var forecastHumidityEl = document.createElement("p");
                            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                            forecastEls[i].append(forecastHumidityEl);
                        }
                    })
            });
    }

    //get history from localStorage
    searchEl.addEventListener("click", function () {
        var searchTerm = cityEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        listSearchHistory();
    })

    //button to clear history array
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        listSearchHistory();
    })

    //converts kelvin to fahrenheit
    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    //displays the search history list 
    function listSearchHistory() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
            //this capitalizes the first letter in the city
            searchHistory[i] = searchHistory[i].charAt(0).toUpperCase() + searchHistory[i].slice(1);
            
            var historyItem = document.createElement("input");
            historyItem.setAttribute("type", "text");
            historyItem.setAttribute("readonly", true);
            historyItem.setAttribute("class", "form-control d-block");
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click", function () {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
            
        }
    }

    listSearchHistory();

    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
    
}

init();