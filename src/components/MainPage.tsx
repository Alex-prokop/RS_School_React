import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import ResultList from './ResultList';
import usePagination from '../hooks/usePagination';
import Flyout from './Flyout';
import Pagination from './Pagination';
import Details from './Details';
import {
  AstronomicalObjectV2BaseResponse,
  AstronomicalObjectV2Base,
} from '../types';

interface MainPageProps {
  initialData: AstronomicalObjectV2BaseResponse;
  selectedItems: AstronomicalObjectV2Base[];
}

const MainPage: React.FC<MainPageProps> = ({ initialData, selectedItems }) => {
  const router = useRouter();
  const { query } = router;
  const detailsId = query.details as string;

  const { page, setPage } = usePagination(initialData?.page?.number + 1 || 1);
  const [totalPages, setTotalPages] = useState(
    initialData?.page?.totalPages || 1
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      console.log('Server-side rendering');
    } else {
      console.log('Client-side rendering');
    }
  }, []);

  return (
    <div className="main-page">
      <div className="content-container">
        <div className={`left-section ${detailsId ? 'details-visible' : ''}`}>
          <ResultList
            searchTerm={(query.searchTerm as string) || ''}
            page={page}
            setTotalPages={setTotalPages}
            initialData={initialData}
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
      <Flyout selectedItems={selectedItems} />
    </div>
  );
};

export default MainPage;
