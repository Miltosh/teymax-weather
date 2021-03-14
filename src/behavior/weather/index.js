import reducer from './reducers';

export { default as weatherTypes } from './types';
export { default as weatherActions } from './actions';

export default {
    weather: reducer,
};
