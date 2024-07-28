// components/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Details from './Details';
import NotFound from './NotFound';
import MainPage from './MainPage';

interface AppRoutesProps {
  searchTerm: string;
}

const AppRoutes: React.FC<AppRoutesProps> = ({ searchTerm }) => {
  return (
    <Routes>
      <Route path="/" element={<MainPage searchTerm={searchTerm} />} />
      <Route path="/details/:id" element={<Details />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
