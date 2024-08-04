import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ResultList from '../components/ResultList';
import usePagination from '../hooks/usePagination';
import Flyout from '../components/Flyout';
import Pagination from '../components/Pagination';
import Details from '../components/Details';

const MainPage: React.FC = () => {
  const router = useRouter();
  const { query } = router;
  const detailsId = query.details as string;
  const { page, setPage } = usePagination();
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query.page) {
      router.replace({ query: { ...query, page: '1' } }, undefined, {
        shallow: true,
      });
    }
  }, [query, router]);

  return (
    <div className="main-page">
      <div className="content-container">
        <div className={`left-section ${detailsId ? 'details-visible' : ''}`}>
          <ResultList
            searchTerm={(query.searchTerm as string) || ''}
            page={page}
            setPage={setPage}
            setTotalPages={setTotalPages}
          />
        </div>
        {detailsId && (
          <div key={detailsId} className="details-panel">
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
