'use strict';

const apiKey = "64fad3299d97c6a6bb6db8597c2a032b";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&lang=en";

/*
In this example, the getWeather function is declared as async, which means that it returns a promise. 
Inside the function, the fetch method is used to make an API call to OpenWeatherMap, a website that provides weather information by city. 
The await keyword is used to wait for the promise returned by the fetch method to resolve, and the response is saved to a variable.

Once the response is received, the json() method is called on the response object and the await keyword is used to wait for the promise to resolve. 
The resolved data is then logged to the console. This data will contain information like temperature, humidity, wind speed, etc.
*/

//Xmain temperature //weather clear, cloudy etc
//Xmax/Xmin temps, Xfeels like
//humidity, wind

let btnSearch = document.querySelector('.search button');
let searchBox = document.querySelector('.search input');
let locationIcon = document.querySelector('.weather-icon');

function clear(){
    locationIcon.innerHTML = `<img src="icons\\unknown.png">`;
    document.querySelector(".city").innerHTML = "-";
    document.querySelector(".temperature").innerHTML = "-";
    document.querySelector(".feels-like").innerHTML = "feels like:";
    document.querySelector(".min").innerHTML = "min:";
    document.querySelector(".max").innerHTML = "max:";
    document.querySelector(".humidity").innerHTML = "-";
    document.querySelector(".wind-speed").innerHTML = "-";
}

async function checkWeather(city){
    try{
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);

        if(!response.ok){
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();

        console.log(data);
        clear();
        
        //getting the current weather icon and updating it
        var {icon} = data.weather[0];
        locationIcon.innerHTML = `<img src="icons\\${icon}.png">`;

        //updating rest of information
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".feels-like").innerHTML += Math.round(data.main.feels_like) + "°F";
        document.querySelector(".min").innerHTML += Math.round(data.main.temp_min) + "°F";
        document.querySelector(".max").innerHTML += Math.round(data.main.temp_max) + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind-speed").innerHTML = data.wind.speed + " mph";

    } catch(error){
        console.log(error);
    }
}

btnSearch.addEventListener("click", function(){
    const city = searchBox.value.trim();
    if(city != ""){
        checkWeather(city);
    }
    if(city === ""){
        clear();
    }
});

