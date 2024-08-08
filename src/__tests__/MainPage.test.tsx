import React from 'react';
import { render, screen } from './test-utils';
import { vi } from 'vitest';
import MainPage from '../components/MainPage';
import { AstronomicalObjectV2BaseResponse } from '../types';

vi.mock('next/router', () => ({
  useRouter: () => ({
    query: {},
    replace: vi.fn(),
  }),
}));

const mockInitialData: AstronomicalObjectV2BaseResponse = {
  page: {
    number: 1,
    totalPages: 10,
  },
  astronomicalObjects: [],
};

describe('MainPage component', () => {
  it('renders without crashing', () => {
    render(<MainPage initialData={mockInitialData} />);

    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('displays pagination component', () => {
    render(<MainPage initialData={mockInitialData} />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders ResultList component', () => {
    render(<MainPage initialData={mockInitialData} />);

    expect(screen.getByText(/results/i)).toBeInTheDocument();
  });
});
