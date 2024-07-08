import React, { Component } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

interface SearchBarState {
  searchTerm: string;
}

class SearchBar extends Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = {
      searchTerm: savedSearchTerm,
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    this.props.onSearch(trimmedSearchTerm);
  };

  render() {
    return (
      <div
        style={{
          padding: '10px',
          backgroundColor: '#e4e6bc',
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="Search by name or type..."
        />
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

export default SearchBar;
