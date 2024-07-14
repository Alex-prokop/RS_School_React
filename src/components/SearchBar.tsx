import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    setSearchTerm(savedSearchTerm);
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    const trimmedSearchTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedSearchTerm);
    onSearch(trimmedSearchTerm);
    navigate(`/?searchTerm=${trimmedSearchTerm}&page=1`);
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
