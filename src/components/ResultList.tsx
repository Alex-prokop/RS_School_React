import React, { useEffect, useCallback, useRef } from 'react';
import { AstronomicalObjectV2Base } from '../types';
import './ResultList.css';
import Pagination from './Pagination';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetchData from './useFetchData';
import usePagination from './usePagination';

interface ResultsProps {
  searchTerm: string;
}

const ResultList: React.FC<ResultsProps> = ({ searchTerm }) => {
  const { page, setPage } = usePagination();
  const { data, isLoading, error, totalPages, fetchData } = useFetchData(
    searchTerm,
    page
  );
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSelectItem = useCallback(
    (id: string) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('details', id);
      navigate(`/?${queryParams.toString()}`);
    },
    [navigate, location.search]
  );

  const handleClose = () => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.delete('details');
    navigate(`/?${queryParams.toString()}`);
  };

  const handleClickContainer = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === cardContainerRef.current) {
      handleClose();
    }
  };

  return (
    <div className="result-list" style={{ width: '100%' }}>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!isLoading && !error && (
        <>
          {data.length === 0 ? (
            <div>No results found</div>
          ) : (
            <div
              ref={cardContainerRef}
              className="card-container"
              onClick={handleClickContainer}
            >
              {data.map((item: AstronomicalObjectV2Base) => (
                <div
                  key={item.uid}
                  className="card"
                  onClick={() => handleSelectItem(item.uid)}
                >
                  <h3>{item.name}</h3>
                  <p>{item.astronomicalObjectType}</p>
                </div>
              ))}
            </div>
          )}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default ResultList;
