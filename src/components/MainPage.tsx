import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ResultList from './ResultList';
import usePagination from '../hooks/usePagination';
import Flyout from './Flyout';
import Pagination from './Pagination';
import Details from './Details';
import { RootState } from '../store';
import { AstronomicalObjectV2BaseResponse } from '../types';

interface MainPageProps {
  initialData: AstronomicalObjectV2BaseResponse;
}

const MainPage: React.FC<MainPageProps> = ({ initialData }) => {
  const router = useRouter();
  const { query } = router;
  const detailsId = query.details as string;

  const { page, setPage } = usePagination(initialData?.page?.number + 1 || 1);
  const [totalPages, setTotalPages] = useState(
    initialData?.page?.totalPages || 1
  );

  const fullDetails = useSelector(
    (state: RootState) => state.astronomicalObjects.fullDetails
  );
  const selectedItems = useSelector(
    (state: RootState) => state.astronomicalObjects.selectedItems
  );

  return (
    <div className="main-page" role="main">
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
      <Flyout selectedItems={selectedItems} fullDetails={fullDetails} />
    </div>
  );
};

export default MainPage;
