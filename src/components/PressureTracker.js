import '../styles/PressureTracker.css';

// Change result to be first. No need for start and end measurements. 6 and 12 hour difference

const PressureTracker = (props) => {
    let start = props.start;
    let end = props.end;
    let startb = props.startb;
    let endb = props.endb;
    let differenceresultthree = '';
    let differenceresultnine = '';
    let convertstart = convertToMercury(start);
    let convertend = convertToMercury(end);
    let convertstartb = convertToMercury(startb);
    let convertendb = convertToMercury(endb);
    let fontcolora = { color: 'white' };
    let fontcolorb = { color: 'white' };
    
  
    function setPressure(){
        let difference = 0;
        let recentchange = '';
        if (convertstart > convertend){
            // pressure decrease
            fontcolora = { color: 'red' };
            difference = convertstart - convertend;
            difference = Math.round(difference * 100) / 100;
            recentchange = '↓' + difference.toString();
            // assign color to class list and remove what's currently there
        } else if(convertend > convertstart){
            // pressure increase
            fontcolora = { color: 'green' };
            difference = convertend - convertstart;
            difference = Math.round(difference * 100) / 100;
            recentchange = '↑' + difference.toString();
        } else if(convertend === convertstart){
            fontcolora = { color: 'white' };
            recentchange = '0';
            // assign color to class list and remove what's currently there
        }
        return recentchange;
    };

    function setPressureNine(){
        let difference = 0;
        let recentchange = '';
        if (convertstartb > convertendb){
            // pressure decrease
            fontcolorb = { color: 'red' };
            difference = convertstartb - convertendb;
            difference = Math.round(difference * 100) / 100;
            recentchange = '↓' + difference.toString();
            // assign color to class list and remove what's currently there
        } else if(convertendb > convertstartb){
            // pressure increase
            fontcolorb = { color: 'green' };
            difference = convertendb - convertstartb;
            difference = Math.round(difference * 100) / 100;
            recentchange = '↑' + difference.toString();
        } else if(convertendb === convertstartb){
            fontcolorb = { color: 'white' };
            recentchange = '0';
            // assign color to class list and remove what's currently there
        }
        return recentchange;
    }

    



    function convertToMercury(x){
        let converted = x/33.86;
        converted = Math.round(converted * 100) / 100;
        return converted;
    };

    differenceresultthree = setPressure();
    differenceresultnine = setPressureNine();

    return(
        // html to return
        <div className="pressure-checking-machine">
            <h1 className="pressure-title">Air Pressure: </h1>
            <img className="barometer-icon" src="/weather_icons/images/barometer.png" alt="Barometer Icon"></img>
            <p className="pressure-change-value">6 Hours</p>
            <h2 className="six-hour-change" style={fontcolora}>ΔP {differenceresultthree} inHg </h2>
            <p className="pressure-change-value">9 Hours</p>
            <h2 className="nine-hour-change" style={fontcolorb}>ΔP {differenceresultnine} inHg</h2>
        </div>
    )


}


export default PressureTracker;