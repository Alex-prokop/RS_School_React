import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import ErrorBoundary from './components/ErrorBoundary';
import ThrowErrorButton from './components/ThrowErrorButton';
import useSearchTerm from './hooks/useSearchTerm';
import Details from './components/Details';
import NotFound from './components/NotFound';
import MainPage from './components/MainPage';

const App = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm('searchTerm');

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const throwError = () => {
    throw new Error('Test error');
  };

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <main>
            <div
              className="search-bar"
              style={{ height: '5%', borderBottom: '1px solid #ccc' }}
            >
              <SearchBar onSearch={handleSearch} />
              <ThrowErrorButton throwError={throwError} />
            </div>
            <div style={{ height: '95%', display: 'flex' }}>
              <Routes>
                <Route
                  path="/"
                  element={<MainPage searchTerm={searchTerm} />}
                />
                <Route path="/details/:id" element={<Details />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
1;
