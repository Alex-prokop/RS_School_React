// Details.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Details from '../components/Details';
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { useRouter } from 'next/router';
import { useGetAstronomicalObjectByIdQuery } from '../services/astronomicalObjectsApi';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('../services/astronomicalObjectsApi', () => ({
  useGetAstronomicalObjectByIdQuery: vi.fn(),
}));

describe('Details Component', () => {
  const mockRouterPush = vi.fn();
  const mockId = '1';

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('renders loading state', () => {
    useGetAstronomicalObjectByIdQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<Details id={mockId} />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', () => {
    useGetAstronomicalObjectByIdQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: { status: 404 },
    });

    render(<Details id={mockId} />);

    expect(screen.getByText('Error: 404')).toBeInTheDocument();
  });

  it('renders no details available state', () => {
    useGetAstronomicalObjectByIdQuery.mockReturnValue({
      data: { astronomicalObject: null },
      isLoading: false,
      error: null,
    });

    render(<Details id={mockId} />);

    expect(screen.getByText('No details available')).toBeInTheDocument();
  });

  it('renders astronomical object details', () => {
    useGetAstronomicalObjectByIdQuery.mockReturnValue({
      data: {
        astronomicalObject: {
          name: 'Object 1',
          astronomicalObjectType: 'Type 1',
          location: {
            name: 'Location 1',
            location: {
              name: 'Parent Location 1',
            },
          },
          astronomicalObjects: [
            { uid: '2', name: 'Object 2', astronomicalObjectType: 'Type 2' },
          ],
        },
      },
      isLoading: false,
      error: null,
    });

    render(<Details id={mockId} />);

    expect(screen.getByText('Object 1')).toBeInTheDocument();
    expect(screen.getByText('Type: Type 1')).toBeInTheDocument();
    expect(screen.getByText('Location')).toBeInTheDocument();
    expect(screen.getByText('Name: Location 1')).toBeInTheDocument();
    expect(
      screen.getByText('Parent Location: Parent Location 1')
    ).toBeInTheDocument();
    expect(screen.getByText('Contained Objects:')).toBeInTheDocument();
    expect(screen.getByText('Object 2 (Type 2)')).toBeInTheDocument();
  });

  it('handles close button click', () => {
    useGetAstronomicalObjectByIdQuery.mockReturnValue({
      data: {
        astronomicalObject: {
          name: 'Object 1',
          astronomicalObjectType: 'Type 1',
        },
      },
      isLoading: false,
      error: null,
    });

    render(<Details id={mockId} />);

    const closeButton = screen.getByText('✕');
    fireEvent.click(closeButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/?', undefined, {
      shallow: true,
    });
  });
});
