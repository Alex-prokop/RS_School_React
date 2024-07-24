import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const usePagination = () => {
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  // Обработка изменения страницы на основе URL-параметров
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = parseInt(queryParams.get('page') || '1', 10);
    if (pageParam !== page) {
      setPage(pageParam);
    }
    // Отключаем проверку зависимостей, так как это безопасно в данном случае
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Обновление URL при изменении страницы
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get('page') || '1', 10);

    // Изменяем URL только если страница действительно изменилась
    if (currentPage !== page) {
      queryParams.set('page', page.toString());
      navigate(`/?${queryParams.toString()}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return { page, setPage };
};

export default usePagination;
