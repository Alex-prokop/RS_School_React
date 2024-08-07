import React from 'react';
import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import { vi } from 'vitest';
import MainPage from '../pages/index';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../components/ResultList', () => ({
  __esModule: true,
  default: ({ searchTerm, page }: { searchTerm: string; page: number }) => (
    <div data-testid="result-list">
      ResultList Component - searchTerm: {searchTerm}, page: {page}
    </div>
  ),
}));

vi.mock('../hooks/usePagination', () => ({
  __esModule: true,
  default: () => ({
    page: 1,
  }),
}));

vi.mock('../components/Flyout', () => ({
  __esModule: true,
  default: () => <div data-testid="flyout">Flyout Component</div>,
}));

vi.mock('../components/Pagination', () => ({
  __esModule: true,
  default: ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }) => (
    <div data-testid="pagination">
      Pagination Component - currentPage: {currentPage}, totalPages:{' '}
      {totalPages}
      <button onClick={() => onPageChange(currentPage + 1)}>Next Page</button>
    </div>
  ),
}));

vi.mock('../components/Details', () => ({
  __esModule: true,
  default: ({ id }: { id: string }) => (
    <div data-testid="details">Details Component - id: {id}</div>
  ),
}));

describe('MainPage', () => {
  it('renders without crashing', () => {
    (useRouter as vi.Mock).mockReturnValue({
      query: {},
      replace: vi.fn(),
    });

    render(<MainPage />);

    expect(screen.getByTestId('result-list')).toBeInTheDocument();
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('shows details panel when detailsId is present', () => {
    (useRouter as vi.Mock).mockReturnValue({
      query: { details: '1' },
      replace: vi.fn(),
    });

    render(<MainPage />);

    expect(screen.getByTestId('result-list')).toBeInTheDocument();
    expect(screen.getByTestId('details')).toBeInTheDocument();
    expect(screen.getByTestId('flyout')).toBeInTheDocument();
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
