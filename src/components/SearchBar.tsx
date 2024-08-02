// components/SearchBar.tsx
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Button from './Button';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

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
    router.push(`/?searchTerm=${trimmedSearchTerm}&page=1`);
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search by name or type..."
      />
      <Button onClick={handleSearch} className={styles.searchButton}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
