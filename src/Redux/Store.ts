import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice/AuthSlice'
import CitiesReducer from './CitySlice/CitySlice'
import MonumentsReducer from './MonumentsSlice/MonumentsSlice'

const store = configureStore({
  reducer: {
    authReducer,CitiesReducer,MonumentsReducer

  },
});

export default store;