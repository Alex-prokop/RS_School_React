'use client';

import '../styles/globals.css';
import '../styles/Details.css';
import '../styles/ResultList.css';
import '../styles/MainPage.css';
import '../styles/Pagination.css';
import '../styles/Layout.css';
import React, { useEffect } from 'react';
import { ThemeProvider } from '../contexts/ThemeProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Provider } from 'react-redux';
import store from '../store';
import { useTheme } from '../hooks/useTheme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSearch = (searchTerm: string) => {
    console.log('Search term:', searchTerm);
  };

  const throwError = () => {
    throw new Error('This is a test error');
  };

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider>
            <Header onSearch={handleSearch} throwError={throwError} />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
