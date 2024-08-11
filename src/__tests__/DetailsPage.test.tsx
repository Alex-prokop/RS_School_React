import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailsPage from '../app/[details]/page';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useGetAstronomicalObjectByIdQuery } from '../services/astronomicalObjectsApi';

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
  })),
}));

vi.mock('../services/astronomicalObjectsApi', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetAstronomicalObjectByIdQuery: vi.fn(),
  };
});

describe('DetailsPage Component', () => {
  const mockDispatch = useDispatch as vi.Mock;
  const mockUseSelector = useSelector as vi.Mock;
  const mockUseRouter = useRouter as vi.Mock;
  const mockUseGetAstronomicalObjectByIdQuery =
    useGetAstronomicalObjectByIdQuery as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockReturnValue(vi.fn());
    mockUseSelector.mockReturnValue({});
    mockUseRouter.mockReturnValue({
      push: vi.fn(),
      replace: vi.fn(),
    });
  });

  it('renders loading state correctly', () => {
    mockUseGetAstronomicalObjectByIdQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<DetailsPage params={{ details: '123' }} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockUseGetAstronomicalObjectByIdQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Error loading data' },
    });

    render(<DetailsPage params={{ details: '123' }} />);

    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });
});
