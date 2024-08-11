import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('SearchBar Component', () => {
  it('renders the SearchBar with input and button', () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Search by name or type...');
    const button = screen.getByText('Search');
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('loads the search term from localStorage', () => {
    localStorage.setItem('searchTerm', 'test term');
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Search by name or type...');
    expect(input).toHaveValue('test term');
  });

  it('updates the search term state on input change', () => {
    render(<SearchBar onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Search by name or type...');
    fireEvent.change(input, { target: { value: 'new term' } });
    expect(input).toHaveValue('new term');
  });

  it('calls onSearch and updates localStorage and router on search button click', () => {
    const onSearchMock = vi.fn();
    const routerPushMock = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({ push: routerPushMock });

    render(<SearchBar onSearch={onSearchMock} />);
    const input = screen.getByPlaceholderText('Search by name or type...');
    const button = screen.getByText('Search');

    fireEvent.change(input, { target: { value: 'search term' } });
    fireEvent.click(button);

    expect(onSearchMock).toHaveBeenCalledWith('search term');
    expect(localStorage.getItem('searchTerm')).toBe('search term');
    expect(routerPushMock).toHaveBeenCalledWith(
      '/?searchTerm=search term&page=1'
    );
  });
});
