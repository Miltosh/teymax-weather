import React from 'react';
import { connect } from 'react-redux';
import { weatherActions } from './../../behavior/weather';
import moment from 'moment';

function Forecast({ list, weather }) {
    const { main, sunrise, sunset, wind } = weather;
    const { humidity, pressure } = main;
    const { speed } = wind;

    const forecastHtml = [];
    const forecastByDate = {};
    let minDate = Infinity;

    list.forEach((item) => {
        const date = new Date(item.dt_txt).getDate();
        if (forecastByDate[date]) {
            forecastByDate[date].push(item);
        } else {
            forecastByDate[date] = [item];
        }
    });

    for (const prop in forecastByDate) {
        let maxClouds = 0;
        let tempMin = Infinity;
        let tempMax = -Infinity;
        let icon;

        const dateForecast = forecastByDate[prop];
        const date = new Date(dateForecast[0].dt_txt).toLocaleDateString();

        minDate = minDate > +prop ? prop : minDate;

        dateForecast.forEach((item) => {
            if (item.clouds.all > maxClouds) {
                maxClouds = item.clouds.all;
                icon = item.weather[0].icon;
            }

            tempMin = item.main.temp_min < tempMin ? item.main.temp_min : tempMin;
            tempMax = item.main.temp_max > tempMax ? item.main.temp_max : tempMax;
        });

        forecastHtml.push(
            <div key={date} className="forecast-data__container" data-date={prop}>
                <div className="forecast-data">
                    <div className="card">
                        <div>{moment(date, 'DD-MM-YYYY').format('dddd')}</div>
                        <div>
                            <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" />
                        </div>
                        <div>min: {tempMin}°</div>
                        <div>max: {tempMax}°</div>
                    </div>
                </div>
            </div>,
        );
    }

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString('uk-ua');
    const sunsetTime = new Date(sunset * 1000).toLocaleTimeString('uk-ua');

    return (
        <div className="forecast">
            <div className="forecast-content">
                <div className="extra-current-data">
                    <div>
                        <i className="fas fa-wind wind" aria-hidden="true"></i> Wind speed
                        <span>{speed} m/s</span>
                    </div>
                    <div>
                        <i className="fas fa-tint humidity" aria-hidden="true"></i> Humidity
                        <span>{humidity}%</span>
                    </div>
                    <div>
                        <i className="fas fa-compress-arrows-alt press" aria-hidden="true"></i> Pressure
                        <span>{pressure}</span>
                    </div>
                    <div>
                        <i className="fas fa-sun sun-i" aria-hidden="true"></i> Sunrise
                        <span>{sunriseTime}</span>
                    </div>
                    <div>
                        <i className="fas fa-moon sunset" aria-hidden="true"></i> Sunset
                        <span>{sunsetTime}</span>
                    </div>
                </div>
                <div className="forecast-data">
                    <div className="forecast">{forecastHtml}</div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = ({ weather }) => {
    return { weather: weather.currentWeather };
};

const mapDispatchToProps = { ...weatherActions };

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
