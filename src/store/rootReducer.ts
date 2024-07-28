import { combineReducers } from '@reduxjs/toolkit';
import astronomicalObjectsReducer from '../features/astronomicalObjectsSlice';
import { astronomicalObjectsApi } from '../services/astronomicalObjectsApi';

const rootReducer = combineReducers({
  astronomicalObjects: astronomicalObjectsReducer,
  [astronomicalObjectsApi.reducerPath]: astronomicalObjectsApi.reducer,
});

export default rootReducer;
