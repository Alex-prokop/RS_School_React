import React from 'react';
import { render, screen } from '@testing-library/react';
import MyApp from '../pages/_app'; // Убедитесь, что путь правильный
import { AppProps } from 'next/app';
import { vi } from 'vitest';

// Mock компоненты, которые используются внутри MyApp
vi.mock('../store/index', () => ({
  __esModule: true,
  default: { getState: vi.fn(), subscribe: vi.fn(), dispatch: vi.fn() },
}));

vi.mock('../components/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('../contexts/ThemeProvider', () => ({
  __esModule: true,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('../components/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock next/router
vi.mock('next/router', () => ({
  useRouter: () => ({
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
  }),
}));

describe('MyApp', () => {
  it('renders without crashing', () => {
    const Component = () => <div>Test Component</div>;
    const pageProps = {};

    render(<MyApp Component={Component} pageProps={pageProps as AppProps} />);

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
