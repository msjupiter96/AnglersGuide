import React, { useEffect, useState, useCallback }  from 'react';
import '../styles/WeatherData.css';
import LunarTracker from '../components/LunarTracker.js';
import PressureTracker from '../components/PressureTracker.js';
import Footer from '../components/Footer.js';

// function expression holding the entire weather card

const AppContents = () => {
    // State variables for program located here
    const [cityname, setCity] = useState('Seattle');
    const [currenttemp, setTemp] = useState('60°');
    const [weathercode, setWeatherCode] = useState('800');
    const [weatherlink, setWeatherLink] = useState(require('../images/sunny.png').default);
    const [currentdecription, setDescription] = useState('Sunny');
    const [windspeed, setWind] = useState('2.25mph');
    const [userInput, setSearchValue] = useState('Seattle');
    const [startingPressure, setStartPressure] = useState(0);
    const [endingPressure, setEndPressure] = useState(0);
    const [startingPressureB, setStartPressureB] = useState(0);
    const [endingPressureB, setEndingPressureB] = useState(0);
    const [imagekey, setImageKey] = useState(0);
    // Images
    const Thunderstorm = require('../images/thunderstorm.png').default;
    const Drizzle = require('../images/rain-sun.png').default;
    const Rain = require('../images/rainy.png').default;
    const Snow = require('../images/snowing.png').default;
    const Darkcloud = require('../images/dark-clouds.png').default;
    const Sunny = require('../images/sunny.png').default;
    let WeatherData;


     // callback for useeffect dependency
    const imageUpdate = useCallback(() => {
        let identifier = weathercode.charAt(0);
        let result;
        if (identifier === '2'){
            // thunderstorm icons
            result = Thunderstorm;
        } else if (identifier === '3'){
            // drizzle icons
            result = Drizzle;
        } else if (identifier === '5'){
            // rain icons
            result = Rain;
        } else if (identifier === '6'){
            // snow icons
            result = Snow;
        } else if (identifier === '7'){
            // atmospheric icons
            result = Darkcloud;
        } else if (identifier === '8'){
            // test whether clear of cloudy
            if (weathercode === '800'){
                // clear icon
                result = Sunny;
            } else{
                //cloudy icon
                result = Darkcloud;
            }
        } else{
            // no identifiers matched
            result = Sunny;
        };

        return result;
    }, [weathercode, Darkcloud, Drizzle, Rain, Snow, Sunny, Thunderstorm])
    

    // Function sets the first letter of each word to an uppercase letter
    function capitalizeWords(original) {
        let words = original.split(" ");
        // loop through words and capitalize
        for (let i = 0; i < words.length; i++) {
            // combine capitalized letter with rest of word
            words[i] = words[i][0].toUpperCase() + words[i].substr(1) + " ";
        };
        // combine words back together
        words.join();
        return words;
    }



    // This side-effect checks to see if the image has been updated after fetching the data
    // If not, the weather icon's state is updated appropriately
    useEffect(() => {
        if (imagekey === 0) {
            let imgval = imageUpdate();
            setWeatherLink(imgval);
        }
    }, [imagekey, imageUpdate]);




    const fetchWeatherJSON = async () => {
        const a = "b7c65c655ba222bd25122964bd56d8ae";
        fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&appid=" + a + "&units=imperial", {
        "method": "GET",
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error("Error retrieving data");
            }
        })
        .then(data => {
            WeatherData = data;
            console.log(WeatherData)
            setCity(userInput);
            setStartPressure(WeatherData.list[0].main.pressure);
            setEndPressure(WeatherData.list[2].main.pressure);
            setStartPressureB(WeatherData.list[0].main.pressure);
            setEndingPressureB(WeatherData.list[3].main.pressure);
            setTemp(Math.round(WeatherData.list[0].main.temp) + '°F');
            setWeatherCode(WeatherData.list[0].weather[0].id.toString());
            setDescription(capitalizeWords(WeatherData.list[0].weather[0].description));
            setWind(WeatherData.list[0].wind.speed.toString() + ' mph');
            setImageKey(WeatherData.list[0].weather[0].id);
            return WeatherData;
        }).catch((error) => {
            alert("Error occurred: " + error);
        })
    }

        
        
       

    const getUserInput = (event) =>{
        // Update search value based on input
        setSearchValue(event.target.value);
    };









    

    

    

    

    // JSX displaying the html/css of the weather app with functions intertwined
    return (
        <div className='weather-card-wrapper'>
            <h1>Enter City Name </h1>
            <input type="text" name="submit" onChange={getUserInput} className="user-search"></input>
            <button onClick={() => {fetchWeatherJSON()}} onKeyDown={(e) => {fetchWeatherJSON()}} className='search-button'>Search</button>
            <div className='app-sections'>
                <div className="weather-data-return">
                    <h2>{cityname}</h2>
                    <img className='weather-icon' src={weatherlink} key={imagekey} alt="Weather Icon"></img>
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
