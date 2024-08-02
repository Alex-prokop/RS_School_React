// pages/_app.tsx
import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '../store/index';
import { ThemeProvider } from '../contexts/ThemeProvider';
import '../styles/globals.css';
import '../styles/Details.css';
import '../styles/ResultList.css';

import '../styles/MainPage.css';
import '../styles/Pagination.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
