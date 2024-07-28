import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePagination = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = parseInt(queryParams.get('page') || '1', 10);
    if (pageParam !== page) {
      setPage(pageParam);
    }
  }, [location.search]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (parseInt(queryParams.get('page') || '1', 10) !== page) {
      queryParams.set('page', page.toString());
      navigate(`/?${queryParams.toString()}`, { replace: true });
    }
  }, [page, navigate]);

  return { page, setPage };
};

export default usePagination;
