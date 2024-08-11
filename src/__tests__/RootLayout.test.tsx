import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RootLayout from '../app/layout';
import { vi } from 'vitest';

vi.mock('../components/Header', () => ({
  __esModule: true,
  default: ({
    onSearch,
    throwError,
  }: {
    onSearch: (term: string) => void;
    throwError: () => void;
  }) => (
    <div>
      <button onClick={() => onSearch('Test Search Term')}>Search</button>
      <button onClick={throwError}>Throw Error</button>
    </div>
  ),
}));

vi.mock('../components/Footer', () => ({
  __esModule: true,
  default: () => <div>Footer</div>,
}));

vi.mock('../contexts/ThemeProvider', () => ({
  __esModule: true,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('RootLayout Component', () => {
  it('renders children correctly', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('calls handleSearch when search button is clicked', () => {
    const consoleLogSpy = vi.spyOn(console, 'log');

    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    fireEvent.click(screen.getByText('Search'));

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Search term:',
      'Test Search Term'
    );
  });

  it('renders Header and Footer components correctly', () => {
    render(
      <RootLayout>
        <div>Test Child</div>
      </RootLayout>
    );

    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
  });
});
