'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import ResultList from './ResultList';
import usePagination from '../hooks/usePagination';
import Flyout from './Flyout';
import Pagination from './Pagination';
import Details from './Details';
import { RootState } from '../store';
import { useGetAstronomicalObjectsQuery } from '../services/astronomicalObjectsApi';
import { AstronomicalObjectV2BaseResponse } from '../types';

interface MainPageProps {
  initialData: AstronomicalObjectV2BaseResponse;
}

const MainPage: React.FC<MainPageProps> = ({ initialData }) => {
  console.log('Rendering MainPage with initialData:', initialData);

  const searchParams = useSearchParams();
  const detailsId = searchParams.get('details');
  console.log('Current detailsId:', detailsId);

  const { page, setPage } = usePagination(initialData?.page?.number + 1 || 1);
  const [totalPages, setTotalPages] = useState(
    initialData?.page?.totalPages || 1
  );
  console.log('Current page:', page, 'Total pages:', totalPages);

  const searchTerm = searchParams.get('searchTerm') || '';
  console.log('Current searchTerm:', searchTerm);

  const { data, error, isLoading } = useGetAstronomicalObjectsQuery({
    name: searchTerm,
    page,
    pageSize: 10,
  });
  console.log('Fetched data:', data);
  console.log('Fetch error:', error);

  const fullDetails = useSelector(
    (state: RootState) => state.astronomicalObjects.fullDetails
  );
  const selectedItems = useSelector(
    (state: RootState) => state.astronomicalObjects.selectedItems
  );
  console.log('Selected items:', selectedItems);
  console.log('Full details:', fullDetails);

  useEffect(() => {
    if (data) {
      console.log('Updating total pages to:', data.page.totalPages);
      setTotalPages(data.page.totalPages);
    }
  }, [data]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="main-page" role="main">
      <div className="content-container">
        <div className={`left-section ${detailsId ? 'details-visible' : ''}`}>
          {data ? (
            <ResultList
              searchTerm={searchTerm}
              page={page}
              setTotalPages={setTotalPages}
              initialData={data || initialData}
            />
          ) : (
            <p>Loading results...</p>
          )}
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
