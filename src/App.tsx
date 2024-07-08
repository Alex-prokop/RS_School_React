import React, { Component } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import ErrorBoundary from './components/ErrorBoundary';
import ResultList from './components/ResultList';
import ThrowErrorButton from './components/ThrowErrorButton';

interface AppState {
  searchTerm: string;
}

class App extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
    };
  }

  handleSearch = (searchTerm: string) => {
    this.setState({ searchTerm });
  };

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    console.log('App render');
    return (
      <ErrorBoundary>
        <div className="App">
          <main>
            <div
              className="search-bar"
              style={{ height: '5%', borderBottom: '1px solid #ccc' }}
            >
              <SearchBar onSearch={this.handleSearch} />
              <ThrowErrorButton throwError={this.throwError} />
            </div>
            <div style={{ height: '95%' }}>
              <ResultList searchTerm={this.state.searchTerm} />
            </div>
          </main>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
