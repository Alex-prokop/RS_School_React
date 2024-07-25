import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePagination = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const isInitialMount = useRef(true);

  // Обработка изменения страницы на основе URL-параметров
  useEffect(() => {
    if (isInitialMount.current) {
      const queryParams = new URLSearchParams(location.search);
      const pageParam = parseInt(queryParams.get('page') || '1', 10);
      setPage(pageParam);
      isInitialMount.current = false;
    }
  }, [location.search]);

  // Обновление URL при изменении страницы
  useEffect(() => {
    if (!isInitialMount.current) {
      const queryParams = new URLSearchParams(location.search);
      const currentPage = parseInt(queryParams.get('page') || '1', 10);
      if (currentPage !== page) {
        queryParams.set('page', page.toString());
        navigate(`/?${queryParams.toString()}`, { replace: true });
      }
    }
  }, [page, location.search, navigate]);

  return { page, setPage };
};

export default usePagination;
