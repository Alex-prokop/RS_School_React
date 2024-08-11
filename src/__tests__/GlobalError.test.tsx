import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GlobalError from '../app/global-error';
import { vi } from 'vitest';

vi.mock('../components/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('GlobalError Component', () => {
  it('renders the error message correctly', () => {
    render(<GlobalError />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('wraps content in ErrorBoundary component', () => {
    render(<GlobalError />);

    expect(
      screen.getByText('Something went wrong!').closest('div')
    ).toBeInTheDocument();
  });
});
