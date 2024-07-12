import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        disabled={i === currentPage}
      >
        {i}
      </button>,
    );
  }

  return <div>{pages}</div>;
};

export default Pagination;
