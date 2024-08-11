import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { astronomicalObjectsApi } from '../services/astronomicalObjectsApi';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(astronomicalObjectsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
