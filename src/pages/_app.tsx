import React from 'react';
import { AppProps } from 'next/app';
import { wrapper } from '../store';
import MyAppComponent from '../components/MyAppComponent';
import '../styles/globals.css';
import '../styles/Details.css';
import '../styles/ResultList.css';
import '../styles/MainPage.css';
import '../styles/Pagination.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <MyAppComponent
      Component={Component}
      pageProps={pageProps}
      router={router}
    />
  );
};

const WrappedApp = wrapper.withRedux(MyApp);

export default WrappedApp;
