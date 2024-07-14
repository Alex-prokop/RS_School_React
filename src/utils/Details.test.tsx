import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import Details from '../components/Details';
import '@testing-library/jest-dom';
import { AstronomicalObjectV2FullResponse } from '../types';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useLocation: jest.fn().mockReturnValue({
    search: '?details=1',
  }),
  useNavigate: () => mockNavigate,
}));

const mockFetch = (
  data: AstronomicalObjectV2FullResponse
): Promise<Response> => {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(data),
  } as Response);
};

describe('Details', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      mockFetch({
        astronomicalObject: {
          uid: '1',
          name: 'Mock Object 1',
          astronomicalObjectType: 'PLANET',
          location: { name: 'Mock Location', uid: 'loc1' },
          astronomicalObjects: [],
        },
      })
    ) as jest.Mock;
  });

  test('displays loading indicator while fetching data', async () => {
    await act(async () => {
      render(<Details />);
    });
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays detailed card data correctly', async () => {
    await act(async () => {
      render(<Details />);
    });
    await waitFor(() => {
      expect(screen.getByText('Mock Object 1')).toBeInTheDocument();
      expect(screen.getByText('Type: PLANET')).toBeInTheDocument();
      expect(
        screen.getByText('Location: Mock Location (UID: loc1)')
      ).toBeInTheDocument();
    });
  });

  test('clicking close button hides the component', async () => {
    await act(async () => {
      render(<Details />);
    });
    await waitFor(() => {
      expect(screen.getByText('Mock Object 1')).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText('Close'));
    expect(mockNavigate).toHaveBeenCalledWith('/?');
  });
});
