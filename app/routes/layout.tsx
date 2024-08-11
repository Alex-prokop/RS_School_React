import '../../src/styles/globals.css';
import '../../src/styles/Details.css';
import '../../src/styles/ResultList.css';
import '../../src/styles/MainPage.css';
import '../../src/styles/Pagination.css';

import React from 'react';
import { ThemeProvider } from '../../src/contexts/ThemeProvider';
import Header from '../../src/components/Header';
import Footer from '../../src/components/Footer';
import { Provider } from 'react-redux';
import store from '../../src/store';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            <div className="App">
              <Header onSearch={handleSearch} throwError={throwError} />
              <main>{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
