import { useContext } from 'react';
import { ThemeContext, ThemeContextProps } from '../contexts/ThemeProvider';

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    console.error('useTheme must be used within a ThemeProvider');

    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
