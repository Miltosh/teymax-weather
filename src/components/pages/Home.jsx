import { connect } from 'react-redux';
import { weatherActions } from './../../behavior/weather';
import React, { useState, useEffect } from 'react';
import Weather from '../widgets/Weather';
import Forecast from '../widgets/Forecast';

const Home = ({
    loadLocalCityWeather,
    loadSelectedCityWeather,
    currentWeather,
    forecast,
    lastCities,
    error,
}) => {
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        //Request user location and get weather in user city
        navigator.geolocation.getCurrentPosition(
            (response) => {
                let latitude = response.coords.latitude;
                let longitude = response.coords.longitude;
                loadLocalCityWeather(latitude, longitude);
            },
            () => {
                // If user block self geo, show default city value
                loadSelectedCityWeather('Zhytomyr');
            },
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        loadSelectedCityWeather(searchValue);
        setSearchValue('');
    };

    return (
        <>
            <nav>
                <form action="#" onSubmit={handleFormSubmit}>
                    <input
                        type="text"
                        value={searchValue}
                        placeholder="Enter City Name..."
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button>Get Weather!</button>
                </form>

                <div className="lastCities">
                    <ul>
                        {/* Showing the last searched 5 cities */}
                        {lastCities.map((el, i) => {
                            return (
                                <li key={i} onClick={() => loadSelectedCityWeather(el)}>
                                    {el}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>

            {/* Preventing a mistake with the wrong city */}
            {error ? (
                <h2 className="error">No city found</h2>
            ) : (
                <div className="container">
                    {currentWeather ? <Weather weather={currentWeather} /> : null}
                    {forecast ? <Forecast list={forecast} /> : null}
                </div>
            )}
        </>
    );
};

const mapDispatchToProps = { ...weatherActions };

const mapStateToProps = ({ weather }) => ({
    currentWeather: weather.currentWeather,
    forecast: weather.forecast,
    lastCities: weather.lastCities,
    error: weather.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
