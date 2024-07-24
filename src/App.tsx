// src/App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import useSearchTerm from './hooks/useSearchTerm';
import Header from './components/Header';
import Footer from './components/Footer';

import AppRoutes from './components/AppRoutes';
import { useTheme } from './hooks/useTheme';

const App = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm('searchTerm');
  const { theme } = useTheme();

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const throwError = () => {
    throw new Error('Test error');
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className={`App ${theme}`}>
          <Header onSearch={handleSearch} throwError={throwError} />
          <main>
            <AppRoutes searchTerm={searchTerm} />
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
