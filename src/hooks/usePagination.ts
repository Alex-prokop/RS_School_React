import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from '@remix-run/react';

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const pageParam = parseInt(
        searchParams.get('page') || initialPage.toString(),
        10
      );
      const pageNumber = isNaN(pageParam) ? initialPage : pageParam;

      if (!searchParams.get('page')) {
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set('page', pageNumber.toString());
        navigate(`/?${queryParams.toString()}`, { replace: true });
      }

      setPage(pageNumber);
      isInitialMount.current = false;
    }
  }, [searchParams, initialPage, navigate]);

  useEffect(() => {
    if (!isInitialMount.current) {
      const queryParams = new URLSearchParams(window.location.search);
      const currentPage = parseInt(
        queryParams.get('page') || initialPage.toString(),
        10
      );
      const pageNumber = isNaN(currentPage) ? initialPage : currentPage;
      if (pageNumber !== page) {
        queryParams.set('page', page.toString());
        navigate(`/?${queryParams.toString()}`);
      }
    }
  }, [page, navigate, initialPage]);

  return { page, setPage };
};

export default usePagination;
