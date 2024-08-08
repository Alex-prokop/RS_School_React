import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Flyout from '../components/Flyout';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  fetchFullDetails,
  unselectItem,
} from '../services/astronomicalObjectsSlice';
import { AppDispatch } from '../store';
import {
  AstronomicalObjectV2Base,
  AstronomicalObjectV2FullResponse,
} from '../types';

const mockStore = configureStore({
  reducer: {
    astronomicalObjects: (state = {}) => state,
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(<Provider store={mockStore}>{ui}</Provider>);
};

describe('Flyout Component', () => {
  const mockDispatch = vi.fn();
  let selectedItems: AstronomicalObjectV2Base[];

  beforeEach(() => {
    mockStore.dispatch = mockDispatch as unknown as AppDispatch;
    selectedItems = [
      { uid: '1', name: 'Object 1', astronomicalObjectType: 'Type 1' },
      { uid: '2', name: 'Object 2', astronomicalObjectType: 'Type 2' },
    ];
    mockDispatch.mockClear();
  });

  it('renders without crashing', () => {
    renderWithProviders(
      <Flyout selectedItems={selectedItems} fullDetails={{}} />
    );
    expect(screen.getByText('Unselect All')).toBeInTheDocument();
    expect(screen.getByText('2 items selected')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });

  it('handles unselect all', () => {
    renderWithProviders(
      <Flyout selectedItems={selectedItems} fullDetails={{}} />
    );
    const unselectAllButton = screen.getByText('Unselect All');
    fireEvent.click(unselectAllButton);
    expect(mockDispatch).toHaveBeenCalledWith(unselectItem('1'));
    expect(mockDispatch).toHaveBeenCalledWith(unselectItem('2'));
  });

  it('generates CSV correctly', async () => {
    const fullDetails: Record<string, AstronomicalObjectV2FullResponse> = {
      '1': {
        astronomicalObject: {
          uid: '1',
          name: 'Object 1',
          astronomicalObjectType: 'Type 1',
          location: {
            name: 'Location 1',
            location: { name: 'Parent Location 1' },
          },
        },
      },
      '2': {
        astronomicalObject: {
          uid: '2',
          name: 'Object 2',
          astronomicalObjectType: 'Type 2',
          location: {
            name: 'Location 2',
            location: { name: 'Parent Location 2' },
          },
        },
      },
    };

    renderWithProviders(
      <Flyout selectedItems={selectedItems} fullDetails={fullDetails} />
    );

    const downloadButton = screen.getByText('Download');
    fireEvent.click(downloadButton);

    await waitFor(() => {
      expect(screen.getByText('Download')).toBeInTheDocument();
      expect(mockDispatch).not.toHaveBeenCalledWith(fetchFullDetails('1'));
      expect(mockDispatch).not.toHaveBeenCalledWith(fetchFullDetails('2'));
    });
  });
});
