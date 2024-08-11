import { combineReducers } from '@reduxjs/toolkit';
import { astronomicalObjectsApi } from '../services/astronomicalObjectsApi';
import astronomicalObjectsReducer from '../services/astronomicalObjectsSlice';

const rootReducer = combineReducers({
  [astronomicalObjectsApi.reducerPath]: astronomicalObjectsApi.reducer,
  astronomicalObjects: astronomicalObjectsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
