import { combineReducers } from 'redux';
import placesReducer from './slices/placesSlice';
import countriesReducer from './slices/countriesSlice';
import notificationSlice from './slices/notificationSlice';

export default combineReducers({
  places: placesReducer,
  countries: countriesReducer,
  notification: notificationSlice,
});