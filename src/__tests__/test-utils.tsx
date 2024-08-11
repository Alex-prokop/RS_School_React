import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { render as rtlRender } from '@testing-library/react';
import rootReducer from '../store/rootReducer';
import { setupListeners } from '@reduxjs/toolkit/query';
import { astronomicalObjectsApi } from '../services/astronomicalObjectsApi';

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(astronomicalObjectsApi.middleware),
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  setupListeners(store.dispatch);
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render };
