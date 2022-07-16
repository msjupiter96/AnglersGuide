import React, { useState }  from 'react';
import '../styles/WeatherData.css';
import LunarTracker from '../components/LunarTracker.js';
import PressureTracker from '../components/PressureTracker.js';
import Footer from '../components/Footer.js';

// function expression holding the entire weather card

const AppContents = () => {
    // State variables for program located here
    const [cityname, setCity] = useState('Seattle');
    const [currentdate, setDate] = useState('');
    const [currenttemp, setTemp] = useState('29.15°');
    const [weathercode, setWeatherCode] = useState('800');
    const [weatherlink, setWeatherLink] = useState('/weather_icons/images/sunny.png');
    const [currentdecription, setDescription] = useState('Overcast');
    const [windspeed, setWind] = useState('2.25mph');
    const [userInput, setSearchValue] = useState('Seattle');
    const [startingPressure, setStartPressure] = useState(0);
    const [endingPressure, setEndPressure] = useState(0);
    const [startingPressureB, setStartPressureB] = useState(0);
    const [endingPressureB, setEndingPressureB] = useState(0);


    async function fetchWeatherJSON() {
        const response = await fetch("https://community-open-weather-map.p.rapidapi.com/forecast?q=" + userInput + "%2Cus&units=imperial", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
                "x-rapidapi-key": "b5f5e3e434mshaaf4a42ec34cc73p1320b3jsn614676da6c86",
            }
        })
        .catch((error) => {
            alert("There was an error: " + error);
        });

        // get current date to display by default
        let newDate = new Date();
        let date = newDate.getMonth()+ 1 + '/' + newDate.getDate() + '/' + newDate.getFullYear();
        setDate(date);
        
        
        // convert to json object
        const weatherData = await response.json();
        // assign state variables to corresponding object value
        setCity(weatherData.city.name);
        setStartPressure(weatherData.list[0].main.pressure);
        setEndPressure(weatherData.list[2].main.pressure);
        setStartPressureB(weatherData.list[0].main.pressure);
        setEndingPressureB(weatherData.list[3].main.pressure);
        setTemp(weatherData.list[0].main.temp + '°F');
        setWeatherCode(weatherData.list[0].weather[0].id.toString());
        setDescription(weatherData.list[0].weather[0].description);
        setWind(weatherData.list[0].wind.speed.toString() + ' mph');
        setWeatherLink(getWeatherImage());
        
    };

    const getUserInput = (event) =>{
        // Update search value based on input
        setSearchValue(event.target.value);
    };






    function getWeatherImage(){
        let url = '';
        let identifier = weathercode.charAt(0);
        if (identifier === '2'){
            // thunderstorm icons
            url = 'images/thunderstorm.png';
        } else if (identifier === '3'){
            // drizzle icons
            url = 'images/rain-sun.png';
        } else if (identifier === '5'){
            // rain icons
            url = 'images/rainy.png';
        } else if (identifier === '6'){
            // snow icons
            url = 'images/snowing.png';
        } else if (identifier === '7'){
            // atmospheric icons
            url = 'images/dark-clouds.png';
        } else if (identifier === '8'){
            // test whether clear of cloudy
            if (weathercode === '800'){
                // clear icon
                url = 'images/sunny.png';
            } else{
                //cloudy icon
                url = 'images/dark-clouds.png';
            }
        } else{
            // no identifiers matched
            url = 'images/sunny.png';
        };
        return url;
    }

    

    

    

    

    // JSX displaying the html/css of the weather app with functions intertwined
    return (
        <div className='weather-card-wrapper'>
            <h1>Enter City Name </h1>
            <input type="text" name="submit" onChange={getUserInput} className="user-search"></input>
            <button onClick={() => {fetchWeatherJSON()}} className='search-button'>Search</button>
            <div className='app-sections'>
                <div className="weather-data-return">
                    <h2>{cityname}</h2>
                    <img className='weather-icon' src={weatherlink} alt="Weather Icon"></img>
                    <p className='current-temp'>{currenttemp}</p>
                    <p className='current-desc'>{currentdecription}</p>
                    <p className='current-wind'>Wind Speed: {windspeed}</p>
                </div>

                <div className='lunar-tracking-container-1'>
                    <LunarTracker />
                </div>

                <div className='pressure-tracker-container-1'>
                    <PressureTracker start={startingPressure} end={endingPressure} startb={startingPressureB} endb={endingPressureB}/>
                </div>

            </div>

            <div className='footer-outer-container'>
                    <Footer />
            </div>


        </div>

    
    )
}

export default AppContents;
