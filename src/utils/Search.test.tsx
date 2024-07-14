import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

describe('SearchBar', () => {
  const mockOnSearch = jest.fn();

  test('clicking the Search button saves the entered value to the local storage', () => {
    render(
      <MemoryRouter>
        <SearchBar onSearch={mockOnSearch} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(
      'Search by name or type...'
    ) as HTMLInputElement; // Исправьте текст плейсхолдера
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(screen.getByText('Search'));
    expect(localStorage.getItem('searchTerm')).toBe('Test');
  });

  test('component retrieves the value from the local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'SavedTerm');
    render(
      <MemoryRouter>
        <SearchBar onSearch={mockOnSearch} />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(
      'Search by name or type...'
    ) as HTMLInputElement; // Исправьте текст плейсхолдера
    expect(input.value).toBe('SavedTerm');
  });
});
