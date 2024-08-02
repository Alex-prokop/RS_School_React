import { combineReducers } from '@reduxjs/toolkit';
import astronomicalObjectsReducer from '../services/astronomicalObjectsSlice';
import { astronomicalObjectsApi } from '../services/astronomicalObjectsApi';

const rootReducer = combineReducers({
  astronomicalObjects: astronomicalObjectsReducer,
  [astronomicalObjectsApi.reducerPath]: astronomicalObjectsApi.reducer,
});

export default rootReducer;
