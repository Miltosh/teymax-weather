import React from 'react';
import './WeatherIcons.css';

const SunnyCloud = () => {
    return (
        <div className="icon sun-shower">
            <div className="cloud"></div>
            <div className="sun">
                <div className="rays"></div>
            </div>
        </div>
    );
}

export default SunnyCloud;