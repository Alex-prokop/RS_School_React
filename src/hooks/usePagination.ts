import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  const router = useRouter();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const pageParam = parseInt(
        (router.query.page as string) || initialPage.toString(),
        10
      );
      const pageNumber = isNaN(pageParam) ? initialPage : pageParam;
      setPage(pageNumber);
      isInitialMount.current = false;
    }
  }, [router.query, initialPage]);

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
        router.push(`/?${queryParams.toString()}`);
      }
    }
  }, [page, router, initialPage]); // Добавьте initialPage в зависимости

  return { page, setPage };
};

export default usePagination;
