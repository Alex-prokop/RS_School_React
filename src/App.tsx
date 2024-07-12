import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import SearchBar from './components/SearchBar';
import ErrorBoundary from './components/ErrorBoundary';
import ResultList from './components/ResultList';
import ThrowErrorButton from './components/ThrowErrorButton';
import useSearchTerm from './hooks/useSearchTerm';
import Details from './components/Details';
import NotFound from './components/NotFound';

const App = () => {
  const [searchTerm, setSearchTerm] = useSearchTerm('searchTerm');
  const [selectedId, setSelectedId] = React.useState<string | null>(null);

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
                  element={<ResultList searchTerm={searchTerm} />}
                />
                <Route path="/details/:id" element={<Details />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              {selectedId && (
                <div
                  className="details-panel"
                  style={{ width: '50%', borderLeft: '1px solid #ccc' }}
                >
                  <button onClick={() => setSelectedId(null)}>Close</button>
                  <Details id={selectedId} />
                </div>
              )}
            </div>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
