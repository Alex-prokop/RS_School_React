import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/404';
import { vi } from 'vitest';

vi.mock('../styles/NotFound.module.css', () => ({
  __esModule: true,
  default: {
    notFound: 'notFound',
  },
}));

describe('NotFound', () => {
  it('renders 404 message', () => {
    render(<NotFound />);
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('The page you are looking for does not exist.')
    ).toBeInTheDocument();
  });

  it('applies correct styles', () => {
    const { container } = render(<NotFound />);
    expect(container.firstChild).toHaveClass('notFound');
  });
});
