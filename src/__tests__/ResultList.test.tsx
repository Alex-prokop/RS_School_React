// ResultList.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultList from '../components/ResultList';
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { useGetAstronomicalObjectsQuery } from '../services/astronomicalObjectsApi';
import astronomicalObjectsReducer from '../services/astronomicalObjectsSlice';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../services/astronomicalObjectsApi', () => ({
  useGetAstronomicalObjectsQuery: vi.fn(),
}));

const mockStore = configureStore({
  reducer: {
    astronomicalObjects: astronomicalObjectsReducer,
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={mockStore}>{ui}</Provider>);
};

describe('ResultList Component', () => {
  const routerPushMock = vi.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({ push: routerPushMock });
  });

  it('renders loading state', () => {
    (useGetAstronomicalObjectsQuery as vi.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    renderWithProviders(
      <ResultList
        searchTerm=""
        page={1}
        setTotalPages={() => {}}
        initialData={null}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    (useGetAstronomicalObjectsQuery as vi.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: { message: 'An error occurred' },
    });

    renderWithProviders(
      <ResultList
        searchTerm=""
        page={1}
        setTotalPages={() => {}}
        initialData={null}
      />
    );

    expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
  });

  it('renders no results found state', () => {
    (useGetAstronomicalObjectsQuery as vi.Mock).mockReturnValue({
      data: { astronomicalObjects: [] },
      isLoading: false,
      error: null,
    });

    renderWithProviders(
      <ResultList
        searchTerm=""
        page={1}
        setTotalPages={() => {}}
        initialData={null}
      />
    );

    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('renders results', () => {
    (useGetAstronomicalObjectsQuery as vi.Mock).mockReturnValue({
      data: {
        astronomicalObjects: [
          { uid: '1', name: 'Object 1', astronomicalObjectType: 'Type 1' },
          { uid: '2', name: 'Object 2', astronomicalObjectType: 'Type 2' },
        ],
      },
      isLoading: false,
      error: null,
    });

    renderWithProviders(
      <ResultList
        searchTerm=""
        page={1}
        setTotalPages={() => {}}
        initialData={null}
      />
    );

    expect(screen.getByText('Object 1')).toBeInTheDocument();
    expect(screen.getByText('Object 2')).toBeInTheDocument();
  });

  it('handles item selection and unselection', () => {
    (useGetAstronomicalObjectsQuery as vi.Mock).mockReturnValue({
      data: {
        astronomicalObjects: [
          { uid: '1', name: 'Object 1', astronomicalObjectType: 'Type 1' },
        ],
      },
      isLoading: false,
      error: null,
    });

    renderWithProviders(
      <ResultList
        searchTerm=""
        page={1}
        setTotalPages={() => {}}
        initialData={null}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('handles item selection with URL update', () => {
    (useGetAstronomicalObjectsQuery as vi.Mock).mockReturnValue({
      data: {
        astronomicalObjects: [
          { uid: '1', name: 'Object 1', astronomicalObjectType: 'Type 1' },
        ],
      },
      isLoading: false,
      error: null,
    });

    renderWithProviders(
      <ResultList
        searchTerm=""
        page={1}
        setTotalPages={() => {}}
        initialData={null}
      />
    );

    const card = screen.getByText('Object 1');
    fireEvent.click(card);

    expect(routerPushMock).toHaveBeenCalledWith('/?details=1', undefined, {
      shallow: true,
    });
  });
});
