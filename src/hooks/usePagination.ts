// src/hooks/usePagination.ts
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

const usePagination = () => {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      const pageParam = parseInt((router.query.page as string) || '1', 10);
      setPage(pageParam);
      isInitialMount.current = false;
    }
  }, [router.query]);

  useEffect(() => {
    if (!isInitialMount.current) {
      const queryParams = new URLSearchParams(window.location.search);
      const currentPage = parseInt(queryParams.get('page') || '1', 10);
      if (currentPage !== page) {
        queryParams.set('page', page.toString());
        router.push(`/?${queryParams.toString()}`);
      }
    }
  }, [page, router]);

  return { page, setPage };
};

export default usePagination;
