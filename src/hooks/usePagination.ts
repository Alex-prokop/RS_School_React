'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const usePagination = (initialPage = 1) => {
  const [page, setPage] = useState(initialPage);
  const router = useRouter();
  const searchParams = useSearchParams();
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
        router.replace(`/?${queryParams.toString()}`);
      }

      setPage(pageNumber);
      isInitialMount.current = false;
    }
  }, [searchParams, initialPage, router]);

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
  }, [page, router, initialPage]);

  return { page, setPage };
};

export default usePagination;
