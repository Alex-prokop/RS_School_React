import { useState, useEffect } from 'react';

const useSearchTerm = (key: string, initialValue: string = '') => {
  const [searchTerm, setSearchTerm] = useState(() => {
    return localStorage.getItem(key) || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, searchTerm);
  }, [key, searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

export default useSearchTerm;
