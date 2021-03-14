import React from 'react';
import './WeatherIcons.css';

const Snowy = () => {
    return (
        <div className="icon flurries">
            <div className="cloud"></div>
            {/* <div className="snow"> */}
            <div className="flake"></div>
            <div className="flake"></div>
            <div className="flake"></div>
            <div className="flake"></div>
            {/* </div> */}
        </div>
    );
}

export default Snowy;