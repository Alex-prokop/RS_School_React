import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    onSearch(trimmedSearchTerm);
  };

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
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search by name or type..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
