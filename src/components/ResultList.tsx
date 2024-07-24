import React, { useCallback, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { AstronomicalObjectV2Base } from '../types';
import { useGetAstronomicalObjectsQuery } from '../services/astronomicalObjectsApi';
import { RootState } from '../store';
import { selectItem, unselectItem } from '../features/astronomicalObjectsSlice';
import './ResultList.css';
import Pagination from './Pagination';
import { useTheme } from '../hooks/useTheme';

interface ResultsProps {
  searchTerm: string;
  page: number;
  setPage: (page: number) => void;
}

const ResultList: React.FC<ResultsProps> = ({ searchTerm, page, setPage }) => {
  const { theme } = useTheme();
  const { data, isLoading, error } = useGetAstronomicalObjectsQuery({
    name: searchTerm,
    page,
  });
  const dispatch = useDispatch();
  const selectedItems = useSelector(
    (state: RootState) => state.astronomicalObjects.selectedItems
  );
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const savedSelectedItems = localStorage.getItem('selectedItems');
    if (savedSelectedItems) {
      const parsedItems: AstronomicalObjectV2Base[] =
        JSON.parse(savedSelectedItems);
      parsedItems.forEach((item) => {
        dispatch(selectItem(item));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleSelect = (item: AstronomicalObjectV2Base) => {
    dispatch(selectItem(item));
  };

  const handleUnselect = (uid: string) => {
    dispatch(unselectItem(uid));
  };

  const handleSelectItem = useCallback(
    (id: string) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('details', id);
      navigate(`/?${queryParams.toString()}`);
    },
    [navigate, location.search]
  );

  const handleClickContainer = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === cardContainerRef.current) {
      const queryParams = new URLSearchParams(location.search);
      queryParams.delete('details');
      navigate(`/?${queryParams.toString()}`);
    }
  };

  return (
    <div className={`result-list ${theme}`} style={{ width: '100%' }}>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && (
        <>
          {data?.astronomicalObjects.length === 0 ? (
            <div>No results found</div>
          ) : (
            <div
              ref={cardContainerRef}
              className="card-container"
              onClick={handleClickContainer}
            >
              {data?.astronomicalObjects.map(
                (item: AstronomicalObjectV2Base) => (
                  <div
                    key={item.uid}
                    className="card"
                    onClick={() => handleSelectItem(item.uid)}
                  >
                    <h3>{item.name}</h3>
                    <p>{item.astronomicalObjectType}</p>
                    <input
                      type="checkbox"
                      checked={selectedItems.some(
                        (selected) => selected.uid === item.uid
                      )}
                      onChange={(e) => {
                        e.stopPropagation();
                        selectedItems.some(
                          (selected) => selected.uid === item.uid
                        )
                          ? handleUnselect(item.uid)
                          : handleSelect(item);
                      }}
                    />
                  </div>
                )
              )}
            </div>
          )}
          <Pagination
            currentPage={page}
            totalPages={data?.page?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default ResultList;
