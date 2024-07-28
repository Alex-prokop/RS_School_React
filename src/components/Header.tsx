// components/Header.tsx
import React from 'react';
import SearchBar from './SearchBar';
import ThrowErrorButton from './ThrowErrorButton';

interface HeaderProps {
  onSearch: (term: string) => void;
  throwError: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, throwError }) => {
  return (
    <div className="header">
      <SearchBar onSearch={onSearch} />
      <ThrowErrorButton throwError={throwError} />
    </div>
  );
};

export default Header;
