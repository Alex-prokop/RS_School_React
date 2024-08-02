// pages/index.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ResultList from '../components/ResultList';
import Details from './details/[id]';
import usePagination from '../hooks/usePagination';
import Flyout from '../components/Flyout';
import Pagination from '../components/Pagination';

const MainPage: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const detailsId = query.details as string;
  const { page, setPage } = usePagination();
  const [totalPages, setTotalPages] = useState(1);

  const handleClickLeftSection = () => {
    router.push('/');
  };

  return (
    <div className="main-page">
      <div className="content-container">
        <div
          className={`left-section ${detailsId ? 'details-visible' : ''}`}
          onClick={handleClickLeftSection}>
          <ResultList
            searchTerm={(query.searchTerm as string) || ''}
            page={page}
            setPage={setPage}
            setTotalPages={setTotalPages}
          />
        </div>
        {detailsId && (
          <div className="details-panel">
            <Details id={detailsId} />
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
