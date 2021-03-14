import types from './types';

const initialState = {
    currentWeather: undefined,
    forecast: undefined,
    error: false,
    lastCities: ['Lviv', 'Dnipro', 'Kyiv', 'Kryvyi Rih'],
};

const reducer = (state = initialState, action) => {
    let newArr = [];
    switch (action.type) {
        case types.setWeather:
            console.log(action.payload);
            return { ...state, currentWeather: action.payload };
        case types.setForecast:
            return { ...state, forecast: action.payload };
        case types.setLastCities:
            newArr = [...state.lastCities];
            //Push to array max 5 elems, and check if they are already there To avoid repetition
            if (state.lastCities.length < 5 && !state.lastCities.includes(action.payload)) {
                newArr.unshift(action.payload);
            }
            if (state.lastCities.length >= 5 && !state.lastCities.includes(action.payload)) {
                newArr.unshift(action.payload);
                newArr.pop();
            }
            return { ...state, lastCities: newArr };
        case types.setError:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default reducer;
