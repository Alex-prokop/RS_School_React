// src/components/MainPage.tsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ResultList from './ResultList';
import Details from './Details';
import usePagination from '../components/usePagination';
import Flyout from '../components/Flyout';
import Pagination from './Pagination';
import './MainPage.css';

interface MainPageProps {
  searchTerm: string;
}

const MainPage: React.FC<MainPageProps> = ({ searchTerm }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const detailsId = queryParams.get('details');
  const { page, setPage } = usePagination();
  const [totalPages, setTotalPages] = useState(1);

  const handleClickLeftSection = () => {
    queryParams.delete('details');
    window.history.replaceState(null, '', `/?${queryParams.toString()}`);
  };

  return (
    <div className="main-page">
      <div className="content-container">
        <div
          className={`left-section ${detailsId ? 'details-visible' : ''}`}
          onClick={handleClickLeftSection}
        >
          <ResultList
            searchTerm={searchTerm}
            page={page}
            setPage={setPage}
            setTotalPages={setTotalPages}
          />
        </div>
        {detailsId && (
          <div className="details-panel">
            <Details />
          </div>
        )}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
      <Flyout />
    </div>
  );
};

export default MainPage;
