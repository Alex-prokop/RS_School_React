import React from 'react';
import { Provider } from 'react-redux';
import store from '../../src/store/index';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import { ThemeProvider } from '../../src/contexts/ThemeProvider';

export default function Root() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <div className="App">
              <Header />
              <main>
                <Outlet />
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </Provider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
