import React from 'react';
import { useTheme } from '../hooks/useTheme';
import Button from './Button';
import styles from '../styles/ThemeSwitcher.module.css';

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={className}>
      <Button className={styles.themeSwitcher} onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'dark' : 'light'} theme
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
