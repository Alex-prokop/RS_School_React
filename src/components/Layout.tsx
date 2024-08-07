import React, { useEffect, ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleSearch = (searchTerm: string) => {
    console.log('Search term:', searchTerm);
    // Логика поиска, если требуется
  };

  const throwError = () => {
    throw new Error('This is a test error');
  };

  return (
    <div className="App">
      <Header onSearch={handleSearch} throwError={throwError} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
