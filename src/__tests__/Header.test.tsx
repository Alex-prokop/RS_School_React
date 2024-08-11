import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import Header from '../components/Header';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    pathname: '',
    query: {},
    asPath: '',
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    beforePopState: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  }),
}));

describe('Header Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders ThrowErrorButton', () => {
    render(<Header onSearch={vi.fn()} throwError={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: /throw error/i })
    ).toBeInTheDocument();
  });

  it('renders SearchBar', () => {
    render(<Header onSearch={vi.fn()} throwError={vi.fn()} />);
    expect(
      screen.getByPlaceholderText(/search by name or type.../i)
    ).toBeInTheDocument();
  });

  it('renders ThemeSwitcher', () => {
    render(<Header onSearch={vi.fn()} throwError={vi.fn()} />);
    expect(
      screen.getByRole('button', { name: /switch to dark theme/i })
    ).toBeInTheDocument();
  });

  it('calls onSearch when search term is entered', () => {
    const mockOnSearch = vi.fn();
    render(<Header onSearch={mockOnSearch} throwError={vi.fn()} />);
    const searchInput = screen.getByPlaceholderText(
      /search by name or type.../i
    );
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.click(screen.getByText(/search/i));
    expect(mockOnSearch).toHaveBeenCalledWith('test');
  });

  it('calls throwError when ThrowErrorButton is clicked', () => {
    const mockThrowError = vi.fn();
    render(<Header onSearch={vi.fn()} throwError={mockThrowError} />);
    const throwErrorButton = screen.getByRole('button', {
      name: /throw error/i,
    });
    fireEvent.click(throwErrorButton);
    expect(mockThrowError).toHaveBeenCalled();
  });
});
