import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainPage from '../components/MainPage';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter, useSearchParams } from 'next/navigation';
import { useGetAstronomicalObjectsQuery } from '../services/astronomicalObjectsApi';

vi.mock('react-redux', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
  };
});

vi.mock('next/navigation', () => ({
  useSearchParams: vi.fn(() => new URLSearchParams()),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
  })),
}));

vi.mock('../services/astronomicalObjectsApi', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useGetAstronomicalObjectsQuery: vi.fn(),
  };
});

describe('MainPage Component', () => {
  const mockDispatch = useDispatch as vi.Mock;
  const mockUseSelector = useSelector as vi.Mock;
  const mockUseRouter = useRouter as vi.Mock;
  const mockUseSearchParams = useSearchParams as vi.Mock;
  const mockUseGetAstronomicalObjectsQuery =
    useGetAstronomicalObjectsQuery as vi.Mock;

  beforeEach(() => {
    vi.clearAllMocks();
    mockDispatch.mockReturnValue(vi.fn());
    mockUseSelector.mockReturnValue([]);
    mockUseRouter.mockReturnValue({
      push: vi.fn(),
      replace: vi.fn(),
    });
    mockUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  it('renders loading state correctly', () => {
    mockUseGetAstronomicalObjectsQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<MainPage initialData={null} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    mockUseGetAstronomicalObjectsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'Error loading data' },
    });

    render(<MainPage initialData={null} />);

    expect(screen.getByText('Error loading data')).toBeInTheDocument();
  });

  it('renders astronomical objects and handles interactions', () => {
    mockUseGetAstronomicalObjectsQuery.mockReturnValue({
      data: {
        page: { number: 1, totalPages: 1 },
        astronomicalObjects: [
          { uid: '1', name: 'Object 1', astronomicalObjectType: 'Type 1' },
        ],
      },
      isLoading: false,
      error: null,
    });

    render(<MainPage initialData={null} />);

    expect(screen.getByText('Object 1')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Object 1'));
    expect(mockUseRouter().push).toHaveBeenCalled();
  });
});
