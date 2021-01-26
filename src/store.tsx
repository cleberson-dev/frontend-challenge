import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { PlacesState } from './slices/placesSlice';
import { CountriesState } from './slices/countriesSlice';
import { NotificationState } from './slices/notificationSlice';

const store = configureStore({
  reducer: rootReducer
});

export type AppState =  {
  places: PlacesState;
  countries: CountriesState;
  notification: NotificationState;
}

export default store;