import React from 'react';
import { render, screen } from '@testing-library/react';
import MyApp from '../pages/_app';
import { AppProps } from 'next/app';
import { vi } from 'vitest';

vi.mock('../store/index', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    wrapper: {
      ...actual.wrapper,
      withRedux:
        (Component: React.ComponentType<AppProps>) => (props: AppProps) => (
          <Component {...props} />
        ),
    },
  };
});

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
    const pageProps = {} as AppProps;

    render(<MyApp Component={Component} pageProps={pageProps} />);

    expect(screen.getByText('Test Component')).toBeInTheDocument();
  });
});
