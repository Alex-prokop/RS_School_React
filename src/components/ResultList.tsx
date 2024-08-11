import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { AstronomicalObjectV2Base } from '../types';
import { useGetAstronomicalObjectsQuery } from '../services/astronomicalObjectsApi';
import { RootState } from '../store';
import { selectItem, unselectItem } from '../services/astronomicalObjectsSlice';
import { useTheme } from '../hooks/useTheme';
import { AstronomicalObjectV2BaseResponse } from '../types';

interface ResultsProps {
  searchTerm: string;
  page: number;
  setTotalPages: (totalPages: number) => void;
  initialData: AstronomicalObjectV2BaseResponse;
}

const ResultList: React.FC<ResultsProps> = ({
  searchTerm,
  page,
  setTotalPages,
  initialData,
}) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const selectedItems = useSelector(
    (state: RootState) => state.astronomicalObjects.selectedItems
  );
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    data = initialData,
    isLoading,
    error,
  } = useGetAstronomicalObjectsQuery(
    {
      name: searchTerm,
      page,
      pageSize: 10,
    },
    {
      skip: !!initialData,
    }
  );

  useEffect(() => {
    if (data?.page?.totalPages) {
      setTotalPages(data.page.totalPages);
    }
  }, [data, setTotalPages]);

  const handleSelect = (item: AstronomicalObjectV2Base) => {
    dispatch(selectItem(item));
  };

  const handleUnselect = (uid: string) => {
    dispatch(unselectItem(uid));
  };

  const handleSelectItem = useCallback(
    (id: string) => {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.set('details', id);
      router.push(`/?${queryParams.toString()}`, undefined, { shallow: true });
      console.log('Selected item ID:', id);
    },
    [router]
  );

  const handleClickContainer = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === cardContainerRef.current) {
      const queryParams = new URLSearchParams(window.location.search);
      queryParams.delete('details');
      router.push(`/?${queryParams.toString()}`, undefined, { shallow: true });
    }
  };

  return (
    <div className={`result-list ${theme}`} style={{ width: '100%' }}>
      {isLoading && <div>Loading...</div>}
      {error && (
        <div>
          Error:{' '}
          {'data' in error
            ? (error.data as { message?: string }).message ||
              'An error occurred'
            : (error as Error).message}
        </div>
      )}
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
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                )
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResultList;
