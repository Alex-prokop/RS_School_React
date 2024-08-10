'use client';

import React from 'react';
import SearchBar from './SearchBar';
import ThrowErrorButton from './ThrowErrorButton';
import ThemeSwitcher from './ThemeSwitcher';
import styles from '../styles/Header.module.css';

interface HeaderProps {
  onSearch: (term: string) => void;
  throwError: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, throwError }) => {
  return (
    <header className={styles.header}>
      <ThrowErrorButton throwError={throwError} />
      <SearchBar onSearch={onSearch} />
      <ThemeSwitcher />
    </header>
  );
};

export default Header;
