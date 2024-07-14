import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  AstronomicalObjectV2Base,
  AstronomicalObjectV2BaseResponse,
} from '../types';
import './ResultList.css';
import Pagination from './Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

interface ResultsProps {
  searchTerm: string;
}

const ResultList: React.FC<ResultsProps> = ({ searchTerm }) => {
  const [data, setData] = useState<AstronomicalObjectV2Base[]>([]);
  const [filteredData, setFilteredData] = useState<AstronomicalObjectV2Base[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const cacheRef = useRef<Map<string, AstronomicalObjectV2Base[]>>(new Map());
  const cardContainerRef = useRef<HTMLDivElement>(null);

  const fetchData = useCallback(async (term: string) => {
    setIsLoading(true);
    setError(null);
    if (cacheRef.current.has(term)) {
      setData(cacheRef.current.get(term) || []);
      setIsLoading(false);
      return;
    }

    let allData: AstronomicalObjectV2Base[] = [];
    try {
      const query = term ? `name=${encodeURIComponent(term)}` : '';
      const url = `https://stapi.co/api/v2/rest/astronomicalObject/search?${query}&pageNumber=0&pageSize=100`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result: AstronomicalObjectV2BaseResponse = await response.json();

      allData = result.astronomicalObjects;

      const totalElements = result.page.totalElements;
      const totalPages = Math.ceil(totalElements / 100);

      for (let i = 1; i < totalPages; i++) {
        const pageUrl = `https://stapi.co/api/v2/rest/astronomicalObject/search?${query}&pageNumber=${i}&pageSize=100`;
        const pageResponse = await fetch(pageUrl);
        if (!pageResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const pageResult: AstronomicalObjectV2BaseResponse =
          await pageResponse.json();
        allData = allData.concat(pageResult.astronomicalObjects);
      }

      cacheRef.current.set(term, allData);
      setData(allData);
      setTotalPages(Math.ceil(totalElements / 10));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm, fetchData]);

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [data, searchTerm]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = parseInt(queryParams.get('page') || '1', 10);
    setPage(pageParam);
  }, [location.search]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('page', page.toString());
    navigate(`/?${queryParams.toString()}`);
  }, [page, navigate, location.search]);

  const handleSelectItem = useCallback(
    (id: string) => {
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('details', id);
      navigate(`/?${queryParams.toString()}`);
    },
    [navigate, location.search]
  );

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

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
          {filteredData.length === 0 ? (
            <div>No results found</div>
          ) : (
            <div
              ref={cardContainerRef}
              className="card-container"
              onClick={handleClickContainer}
            >
              {filteredData
                .slice((page - 1) * 10, page * 10)
                .map((item: AstronomicalObjectV2Base) => (
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
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ResultList;
