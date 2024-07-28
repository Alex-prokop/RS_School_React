import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../components/Pagination';
import '@testing-library/jest-dom';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
  useLocation: () => ({
    search: '',
  }),
}));

describe('Pagination', () => {
  test('updates URL query parameter when page changes', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={(page) => mockNavigate(`/?page=${page}`)}
      />
    );

    fireEvent.click(screen.getByText('2'));
    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
  });
});
