var url = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=33d05024949e3f3d2fc78856ad6d0554"; //enter a valid url 
//use fetch to get some data from the api!
fetch(url)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        //do something with the json data
        console.log(data);
    });