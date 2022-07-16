// this component must calculate and display the current lunar phase
import React, { useState, useEffect } from 'react';
import '../styles/LunarTracker.css';



const LunarTracker = () => {
    const [moonphase, setMoonPhase] = useState("");
    const [moonicon, setMoonIcon] = useState("");
    const [currentdate, setCurrentDate] = useState("");


    // Initialize data in component once component is loaded
    useEffect(() => {
        // eslint-disable-next-line
        calculatePhase();
    }, []);

    // main function to calculate the current phase
    function calculatePhase() {
        // establish date variables
        // establishes date object
        let newdate = new Date();
        let month = 0;
        let day = 0;
        let year = 0;
        let organizeddate = "";
        // returns month with 0-11, with 1 added to make 1-12
        month = newdate.getMonth() + 1;
        console.log("Month: " + month);
        // returns 4 digit year
        year = newdate.getFullYear();
        console.log("Year: " + year);
        // returns 2 digit day
        day = newdate.getDate();
        console.log("Day: " + day);
        organizeddate = month.toString() + "/" + day.toString() + "/" + year.toString();
        setCurrentDate(organizeddate);
        console.log(currentdate);

        // establish julian date variables
        let c = 0;
        let e = 0;
        let juliandate = 0;
        let b = 0;

        if (month < 3) {
            year--;
            month += 12;
        };

        ++month;
        c = 365.25 * year;
        e = 30.6 * month;
        juliandate = c + e + day - 694039.09;
        juliandate /= 29.5305882;
        b = parseInt(juliandate);
        juliandate -= b;
        b = Math.round(juliandate * 8);
        if (b >= 8) {
            b = 0;
        };

        // update phase based on result
        // also use callback function to get url for correct moon icon based on current phase
        if (b === 0) {
            console.log("New moon");
            setMoonPhase("New");
            setMoonIcon(assignIcon("New"));
        } else if (b === 1) {
            console.log("Waxing Crescent");
            setMoonPhase("Waxing Crescent");
            setMoonIcon(assignIcon("Waxing Crescent"));
        } else if (b === 2) {
            console.log("Fist Quarter");
            setMoonPhase("First Quarter");
            setMoonIcon(assignIcon("First Quarter"));
        } else if (b === 3) {
            console.log("Waxing Gibbous");
            setMoonPhase("Waxing Gibbous");
            setMoonIcon(assignIcon("Waxing Gibbous"));
        } else if (b === 4) {
            console.log("Full moon");
            setMoonPhase("Full");
            setMoonIcon(assignIcon("Full"))
        } else if (b === 5) {
            console.log("Waning Gibbous");
            setMoonPhase("Waning Gibbous");
            setMoonIcon(assignIcon("Waning Gibbous"));
        } else if (b === 6) {
            console.log("Last Quarter");
            setMoonPhase("Last Quarter");
            setMoonIcon(assignIcon("Last Quarter"));
        } else if (b === 7) {
            console.log("Waning Crescent");
            setMoonPhase("Waning Crescent");
            setMoonIcon(assignIcon("Waning Crescent"));
        };



    };



    // Assign url of proper icon based on current phase
    function assignIcon(moonphase) {
        let url = "";

        if (moonphase === 'New') {
            url = "moon_icons/png/001-new-moon.png";
        } else if (moonphase === "Waxing Crescent") {
            url = "moon_icons/png/002-waxing-moon.png";
        } else if (moonphase === "First Quarter") {
            url = "moon_icons/png/003-first-quarter.png";
        } else if (moonphase === "Waxing Gibbous") {
            url = "moon_icons/png/004-waxing-moon-1.png";
        } else if (moonphase === "Full") {
            url = "moon_icons/png/005-moon.png";
        } else if (moonphase === "Waning Gibbous") {
            url = "moon_icons/png/006-waning-moon.png";
        } else if (moonphase === "Last Quarter") {
            url = "moon_icons/png/007-crescent-moon.png";
        } else {
            url = "moon_icons/png/006-waning-moon.png";
        };

        return url;
    };




    return (
        <div className="lunar-card-container">
            <p className="lunar-phase-title">Lunar Phase</p>
            <div>
                <img className="moon-icon" src={moonicon} alt="Icon of Moon Phase"></img>
            </div>
            <p className="current-phase-text">{moonphase}</p>
            <p className="date-container">{currentdate}</p>
        </div>
    )
}

export default LunarTracker;
