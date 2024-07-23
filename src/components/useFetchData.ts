import { useState, useCallback } from 'react';
import {
  AstronomicalObjectV2Base,
  AstronomicalObjectV2BaseResponse,
} from '../types';

const useFetchData = (searchTerm: string, page: number) => {
  const [data, setData] = useState<AstronomicalObjectV2Base[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const url = `https://stapi.co/api/v2/rest/astronomicalObject/search`;
      const body = new URLSearchParams({
        name: searchTerm,
        pageNumber: (page - 1).toString(),
        pageSize: '10', // Указываем размер страницы как 10
      });

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const result: AstronomicalObjectV2BaseResponse = await response.json();
      setData(result.astronomicalObjects);
      setTotalPages(Math.ceil(result.page.totalElements / 10));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, page]);

  return { data, isLoading, error, totalPages, fetchData };
};

export default useFetchData;
