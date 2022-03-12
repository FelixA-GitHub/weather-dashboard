
// let currentWData = document.querySelector("#current-weather");
// let currentWCity = document.querySelector("#current-weather-city");
// var displayName;

// // load the dom elements
// var searchInput = document.querySelector("#search-input");
// var searchButton = document.querySelector("#search-button");
// var confirmLocationModal = document.querySelector("#confirm-location-modal");
// var searchHistoryItems = document.querySelector("#search-history-items");
// var forecastElement = document.querySelector("#forecast");
// var searchTerms = [];
// var searchHistory = [];


// //display the location as city
// var defineDisplayName = function(location) {
//     // define the location components
//     var city = location.adminArea5;

//     // varruct an array of the location components
//     var tempDisplayName = [];
//     if (city) {
//         tempDisplayName.push(city);
//     }
//     // return the joined array so that we don't need to deal with extra commas
//     return tempDisplayName.join(", ");
// }

// var saveLocation = function(location) {
//     /* add the display names and coordinates for each search to localStorage */

//     // set the displayName value
//     displayName = defineDisplayName(location);

//     // if the term is already in the search history, remove it from the arrays and DOM
//     if (searchTerms.includes(displayName)) {

//         // remove the display name from the search arrays
//         var index = searchTerms.indexOf(displayName);
//         searchTerms.splice(index, 1);
//         searchHistory.splice(index, 1);

//         // remove the element
//         var dataLocationName = displayName.split(" ").join("+");
//         var searchHistoryItem = searchHistoryItems.querySelector("[data-location-name='" + dataLocationName + "']");
//         searchHistoryItems.removeChild(searchHistoryItem);
//     }

//     // define the object to save
//     var cityData = {
//         displayName: displayName,
//         coords: location.latLng
//     };

//     // update the search history arrays
//     if (searchTerms.length == 5) {

//         // remove the last element if the array has 5 items
//         searchTerms.splice(0, 1);
//         searchHistory.splice(0, 1);

//         // also remove it from the DOM
//         var fifthChild = searchHistoryItems.childNodes[4];
//         searchHistoryItems.removeChild(fifthChild);
//     }
//     searchTerms.push(displayName);
//     searchHistory.push(cityData);

//     // update localStorage
//     localStorageHistory = {
//         searchTerms: searchTerms,
//         searchHistory: searchHistory
//     }
//     localStorage.setItem("searchHistory", JSON.stringify(localStorageHistory));

//     // update the search history
//     createSearchHistoryElement(cityData);
// }

// var getGeoCoords = function(searchTerm) {
//     //use mapquest API to geocode the location based on the search terms
//     searchTerm = searchTerm.split(" ").join("+");
//     var geoApiUrl = "https://www.mapquestapi.com/geocoding/v1/address?key=nxjwALvGJN6Zw9316EAAFxvobBHjvX3L&location=" + searchTerm;
//     fetch(geoApiUrl).then(function(response) {
//         if (response.ok) {
//             response.json().then(function(data) {
//                 //use inputted location to generate the weather
//                 var locations = data.results[0].locations;
//                 if (locations.length == 1) {
//                     saveLocation(locations[0]);
//                     getWeather(locations[0].latLng);
//                 } else {
//                     confirmLocation(locations);  // prompt the user to confirm the location
//                 }
//             })
//         } else {
//             console.log("Couldn't get the coordinates from the mapquest API: ", response.text);
//         }
//     });
// }

// var getWeather = function(coords) {
//     //api call to get the weather based on a set of coordinates
//     var weatherApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + coords.lat + "&lon=" + coords.lng + "&units=imperial&exclude=minutely,hourly&appid=33d05024949e3f3d2fc78856ad6d0554";
//     fetch(weatherApiUrl).then(function(response){
//         if (response.ok) {
//             response.json().then(function(data){
//                  //display the current weather and forecast
//                 displayCurrWeather(data);
//             })
//         } else {
//             console.log("Unable to obtain the weather data from the OpenWeatherMap API: ", response.text);
//         }
//     })
// }

// getWeather();

// var displayIcon = function() {

// }

// var createSearchHistoryElement = function(searchHistoryData) {
//     /* helper function to create search history card */
    
//     // display the header
//     var searchHistoryHeader = document.querySelector("#search-history-title");
//     searchHistoryHeader.style.display = "block";

//     // create the card for the location
//     var newCard = document.createElement("div");
//     newCard.classList = "uk-card-default uk-card uk-card-body uk-card-hover uk-card-small uk-text-center search-history-item";
//     newCard.textContent = searchHistoryData.displayName;
//     newCard.setAttribute("data-location-name", searchHistoryData.displayName.split(" ").join("+"));
//     searchHistoryItems.insertBefore(newCard, searchHistoryItems.firstChild);
// }

// var displaySearchHistory = function() {
//     /* display search history cards if there's a search history in localStorage */

//     var loadedSearchHistory = JSON.parse(localStorage.getItem("searchHistory"));
//     if(loadedSearchHistory) {
//         searchTerms = loadedSearchHistory.searchTerms;
//         searchHistory = loadedSearchHistory.searchHistory;
//         for (var i=0; i < searchTerms.length; i++) {
//             if (!searchTerms.includes(searchHistory[i])) {
//                 createSearchHistoryElement(searchHistory[i]);  // add a search term to the search history panel
//             }
//         }
//     }
// }

// var displayCurrWeather = function(weatherData) {
//     //current city
//     cityEl.textContent = displayName;
//     //current date
//     var dateEl = currentWData.querySelector("#current-weather-date");
//     var unixDate = weatherData.current.dt; 
//     var currentWDate = moment.unix(unixDate).format(' (MM/DD/YYYY)');
//     dateEl.textContent = currentWDate;
//     //current temp
//     var tempEl = currentWData.querySelector("#current-weather-temp");
//     var temperature = Math.floor(weatherData.current.temp);
//     tempEl.textContent = "Temp: " + temperature + " °F";
//     //current wind
//     var windEl = currentWData.querySelector("#current-weather-wind");
//     var windSpeed = weatherData.current.wind_speed;
//     windEl.textContent = "Wind: " + windSpeed + " MPH";
//     //current humidity
//     var humidEL = currentWData.querySelector("#current-weather-humidity");
//     var humidity = weatherData.current.humidity;
//     humidEL.textContent = "Humidity: " + humidity + "%";
//     //current uv index
//     var uvEl = currentWData.querySelector("#current-weather-uv-index");
//     var uvIndex = weatherData.current.uvi;
//     uvEl.textContent = "UV Index: " + uvIndex;

//     var weatherContainer = document.querySelector("#weather-container");
//     var currentWeather = document.querySelector("#current-weather");
//     weatherContainer.style.display = "block";
//     currentWeather.style.display = "block";
// }

// var displayForecast = function() {

// }

// var searchButton = function(){

// }

// var displaySearchHistory = function() {

// }

// //event handlers

function init() {
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
    var fiveDayEl = document.getElementById("five-day-forecast");
    var currentWeatherEl = document.getElementById("current-weather");
    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];


    function getWeather(cityName) {
        // Execute a current weather get request from open weather api
        let weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=33d05024949e3f3d2fc78856ad6d0554";

        axios.get(weatherApiUrl)
            .then(function (response) {

                currentWeatherEl.classList.remove("d-none");

                // Parse response to display current weather
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
                currentWindEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
                
                // Get UV Index
                let lat = response.data.coord.lat;
                let lon = response.data.coord.lon;
                let uvIndexApiUrl = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=33d05024949e3f3d2fc78856ad6d0554";
                axios.get(uvIndexApiUrl)
                    .then(function (response) {
                        let uvIndex = document.createElement("span");
                        
                        // When UV Index is good, shows green, when ok shows yellow, when bad shows red
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
                
                // Get 5 day forecast for this city
                let cityID = response.data.id;
                let forecastApiUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=33d05024949e3f3d2fc78856ad6d0554";

                axios.get(forecastApiUrl)
                    .then(function (response) {
                        fiveDayEl.classList.remove("d-none");
                        
                        //  Parse response to display forecast for next 5 days
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

                            // Icon for current weather
                            var forecastWeatherEl = document.createElement("img");
                            forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                            forecastWeatherEl.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                            forecastWeatherEl.setAttribute("class", "forecast-icon");
                            forecastEls[i].append(forecastWeatherEl);
                            var forecastTempEl = document.createElement("p");
                            forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                            forecastEls[i].append(forecastTempEl);
                            var forecastHumidityEl = document.createElement("p");
                            forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                            forecastEls[i].append(forecastHumidityEl);
                        }
                    })
            });
    }

    // Get history from local storage if any
    searchEl.addEventListener("click", function () {
        var searchTerm = cityEl.value;
        getWeather(searchTerm);
        searchHistory.push(searchTerm);
        localStorage.setItem("search", JSON.stringify(searchHistory));
        listSearchHistory();
    })

    // Clear History button
    clearEl.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        listSearchHistory();
    })

    function k2f(K) {
        return Math.floor((K - 273.15) * 1.8 + 32);
    }

    function listSearchHistory() {
        historyEl.innerHTML = "";
        for (let i = 0; i < searchHistory.length; i++) {
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