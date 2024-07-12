import React, { useState, useEffect } from 'react';
import { AstronomicalObject, ApiResponse } from '../types';
import './ResultList.css';
import Pagination from './Pagination';
import { useLocation, useNavigate } from 'react-router-dom';

interface ResultsProps {
  searchTerm: string;
}

const ResultList: React.FC<ResultsProps> = ({ searchTerm }) => {
  const [data, setData] = useState<AstronomicalObject[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const page = parseInt(queryParams.get('page') || '1', 10);

  useEffect(() => {
    const fetchData = async (term: string) => {
      setIsLoading(true);
      setError(null);
      let allData: AstronomicalObject[] = [];
      try {
        const fetchPage = async (pageNumber: number) => {
          const query = term ? `name=${encodeURIComponent(term)}` : '';
          const url = `https://stapi.co/api/v2/rest/astronomicalObject/search?${query}&pageNumber=${pageNumber}&pageSize=100`;
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result: ApiResponse = await response.json();
          return result;
        };

        let result = await fetchPage(0);
        allData = result.astronomicalObjects;

        const totalElements = result.page.totalElements;
        const totalPages = Math.ceil(totalElements / 100);

        for (let i = 1; i < totalPages; i++) {
          result = await fetchPage(i);
          allData = allData.concat(result.astronomicalObjects);
        }

        setData(allData);
        setTotalPages(totalPages);
        console.log(allData); // Выводим все данные в консоль
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(searchTerm);
  }, [searchTerm]);

  const handleSelectItem = (id: string) => {
    navigate(`/?page=${page}&details=${id}&searchTerm=${searchTerm}`);
  };

  const handlePageChange = (newPage: number) => {
    navigate(`/?page=${newPage}&searchTerm=${searchTerm}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="result-list" style={{ width: '50%' }}>
      {data.length === 0 ? (
        <div>No results found</div>
      ) : (
        <div className="card-container">
          {data
            .slice((page - 1) * 10, page * 10)
            .map((item: AstronomicalObject) => (
              <div
                key={item.uid}
                className="card"
                onClick={() => handleSelectItem(item.uid)}
              >
                <h3>{item.name}</h3>
                <p>{item.astronomicalObjectType}</p>
                {item.location && (
                  <p>
                    Location: {item.location.name} (UID: {item.location.uid})
                  </p>
                )}
              </div>
            ))}
        </div>
      )}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ResultList;
