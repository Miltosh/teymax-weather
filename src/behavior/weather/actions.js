import types from './types';

const apiKey = '024ebc14324a2c20cca5995fb66ad8bf';
const baseUrl = 'https://api.openweathermap.org/data/2.5';

const setError = (payload) => {
    return {
        type: types.setError,
        payload,
    };
};

const setCityForecast = (payload) => {
    return {
        type: types.setForecast,
        payload,
    };
};

const setCityWeather = (data) => {
    return {
        type: types.setWeather,
        payload: data,
    };
};

const setLastCities = (data) => {
    return {
        type: types.setLastCities,
        payload: data,
    };
};

const loadSelectedCityWeather = (cityName) => {
    return (dispatch, getState, api) => {
        Promise.all([
            api.fetch(`${baseUrl}/weather?units=metric&q=${cityName}&appid=${apiKey}`),
            api.fetch(`${baseUrl}/forecast?units=metric&q=${cityName}&appid=${apiKey}`),
        ])
            .then(
                ([
                    {
                        name,
                        main,
                        wind,
                        sys: { sunrise, sunset },
                        weather: [{ description, icon }],
                    },
                    { list },
                ]) => {
                    dispatch(
                        setCityWeather({
                            name,
                            main,
                            wind,
                            sunrise,
                            sunset,
                            description,
                            icon,
                        }),
                    );
                    dispatch(setCityForecast(list));
                    dispatch(setError(false));
                    dispatch(setLastCities(name));
                },
            )
            .catch((error) => {
                dispatch(setError(true));
                console.log(error);
            });
    };
};

const loadLocalCityWeather = (lat, lon) => {
    return (dispatch, getState, api) => {
        Promise.all([
            api.fetch(`${baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`),
            api.fetch(`${baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`),
        ])
            .then(
                ([
                    {
                        name,
                        main,
                        wind,
                        sys: { sunrise, sunset },
                        weather: [{ description, icon }],
                    },
                    { list },
                ]) => {
                    dispatch(
                        setCityWeather({
                            name,
                            main,
                            sunrise,
                            wind,
                            sunset,
                            description,
                            icon,
                        }),
                    );
                    dispatch(setCityForecast(list));
                },
            )
            .catch((error) => console.log(error));
    };
};

export default {
    loadSelectedCityWeather,
    loadLocalCityWeather,
};
