import React from 'react';
import { connect } from 'react-redux';
import { weatherActions } from './../../behavior/weather';
import moment from 'moment';
import Sunny from '../UI/WeatherIcons/Sunny';
import SunnyCloud from '../UI/WeatherIcons/SunnyCloud';
import Cloudy from '../UI/WeatherIcons/Cloudy';
import Snowy from '../UI/WeatherIcons/Snowy';

function Weather({ weather }) {
    const { main, name } = weather;
    const { temp } = main;

    let weatherIcon;
    if (temp <= 20 && temp >= 5) {
        weatherIcon = <SunnyCloud />;
    } else if (temp <= 5 && temp >= 0) {
        weatherIcon = <Cloudy />;
    } else if (temp > 20) {
        weatherIcon = <Sunny />;
    } else if (temp < 0) {
        weatherIcon = <Snowy />;
    }

    return (
        <div className="weather">
            <div className="current-data__above">
                <h2>{moment(new Date().toString()).format('dddd')}</h2>
                <h3>{moment(new Date().toString()).format('DD MMMM')}</h3>
                <p>{name}</p>
            </div>
            <div className="current-data__below">
                {weatherIcon}
                <h1>{Math.round(temp)}°C</h1>
            </div>
        </div>
    );
}

const mapStateToProps = ({ weather }) => {
    return { weather: weather.currentWeather };
};

const mapDispatchToProps = { ...weatherActions };

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
