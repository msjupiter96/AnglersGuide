// this component must calculate and display the current lunar phase
import React, { useState, useEffect } from 'react';
import '../styles/LunarTracker.css';



const LunarTracker = () => {
    const [moonphase, setMoonPhase] = useState("");
    const [moonicon, setMoonIcon] = useState("");
    const [currentdate, setCurrentDate] = useState("");
    // images
    const Newmoon = require('../images/001-new-moon.png').default;
    const Waxingcrescent = require('../images/002-waxing-moon.png').default;
    const Firstquarter = require('../images/003-first-quarter.png').default;
    const Waxinggibbous = require('../images/004-waxing-moon-1.png').default;
    const Fullmoon = require('../images/005-moon.png').default;
    const Waninggibbous = require('../images/006-waning-moon.png').default;
    const Lastquarter = require('../images/007-crescent-moon.png').default;


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
        // returns 4 digit year
        year = newdate.getFullYear();
        // returns 2 digit day
        day = newdate.getDate();
        organizeddate = month.toString() + "/" + day.toString() + "/" + year.toString();
        setCurrentDate(organizeddate);

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
            setMoonPhase("New");
            setMoonIcon(assignIcon("New"));
        } else if (b === 1) {
            setMoonPhase("Waxing Crescent");
            setMoonIcon(assignIcon("Waxing Crescent"));
        } else if (b === 2) {
            setMoonPhase("First Quarter");
            setMoonIcon(assignIcon("First Quarter"));
        } else if (b === 3) {
            setMoonPhase("Waxing Gibbous");
            setMoonIcon(assignIcon("Waxing Gibbous"));
        } else if (b === 4) {
            setMoonPhase("Full");
            setMoonIcon(assignIcon("Full"))
        } else if (b === 5) {
            setMoonPhase("Waning Gibbous");
            setMoonIcon(assignIcon("Waning Gibbous"));
        } else if (b === 6) {
            setMoonPhase("Last Quarter");
            setMoonIcon(assignIcon("Last Quarter"));
        } else if (b === 7) {
            setMoonPhase("Waning Crescent");
            setMoonIcon(assignIcon("Waning Crescent"));
        };



    };



    // Assign url of proper icon based on current phase
    function assignIcon(moonphase) {
        let currentphaseicon;

        if (moonphase === 'New') {
            currentphaseicon = Newmoon;
        } else if (moonphase === "Waxing Crescent") {
            currentphaseicon = Waxingcrescent;
        } else if (moonphase === "First Quarter") {
            currentphaseicon = Firstquarter;
        } else if (moonphase === "Waxing Gibbous") {
            currentphaseicon = Waxinggibbous;
        } else if (moonphase === "Full") {
            currentphaseicon = Fullmoon;
        } else if (moonphase === "Waning Gibbous") {
            currentphaseicon = Waninggibbous;
        } else if (moonphase === "Last Quarter") {
            currentphaseicon = Lastquarter;
        } else {
            currentphaseicon = Waninggibbous;
        };

        return currentphaseicon;
    };




    return (
        <div className="lunar-card-container">
            <p className="lunar-phase-title">Lunar Phase</p>
            <div>
                <img className="moon-icon" src={moonicon} key={moonphase} alt="Icon of Moon Phase"></img>
            </div>
            <p className="current-phase-text">{moonphase}</p>
            <p className="date-container">{currentdate}</p>
        </div>
    )
}

export default LunarTracker;