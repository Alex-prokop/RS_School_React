import { configureStore } from '@reduxjs/toolkit';
import astronomicalObjectsReducer, {
  selectItem,
  unselectItem,
  setCurrentItem,
  fetchFullDetails,
} from '../services/astronomicalObjectsSlice';
import {
  AstronomicalObjectV2Base,
  AstronomicalObjectV2FullResponse,
} from '../types';
import { RootState } from '../store';
import { describe, it, expect, vi } from 'vitest';

describe('astronomicalObjectsSlice', () => {
  const initialState = {
    selectedItems: [] as AstronomicalObjectV2Base[],
    fullDetails: {} as { [uid: string]: AstronomicalObjectV2FullResponse },
  };

  const mockAstronomicalObject: AstronomicalObjectV2Base = {
    uid: '123',
    name: 'Earth',
    astronomicalObjectType: 'PLANET',
  };

  const mockFullResponse: AstronomicalObjectV2FullResponse = {
    astronomicalObject: {
      uid: '123',
      name: 'Earth',
      astronomicalObjectType: 'PLANET',
      location: { uid: '456', name: 'Solar System' },
      astronomicalObjects: [],
    },
  };

  it('should handle initial state', () => {
    const store = configureStore({
      reducer: {
        astronomicalObjects: astronomicalObjectsReducer,
      },
    });
    expect(store.getState().astronomicalObjects).toEqual(initialState);
  });

  it('should handle selectItem', () => {
    const store = configureStore({
      reducer: {
        astronomicalObjects: astronomicalObjectsReducer,
      },
    });
    store.dispatch(selectItem(mockAstronomicalObject));
    const state = store.getState() as RootState;
    expect(state.astronomicalObjects.selectedItems).toEqual([
      mockAstronomicalObject,
    ]);
  });

  it('should handle unselectItem', () => {
    const store = configureStore({
      reducer: {
        astronomicalObjects: astronomicalObjectsReducer,
      },
      preloadedState: {
        astronomicalObjects: {
          ...initialState,
          selectedItems: [mockAstronomicalObject],
        },
      },
    });
    store.dispatch(unselectItem(mockAstronomicalObject.uid));
    const state = store.getState() as RootState;
    expect(state.astronomicalObjects.selectedItems).toEqual([]);
  });

  it('should handle setCurrentItem', () => {
    const store = configureStore({
      reducer: {
        astronomicalObjects: astronomicalObjectsReducer,
      },
    });
    store.dispatch(setCurrentItem(mockAstronomicalObject));
    const state = store.getState() as RootState;
    expect(state.astronomicalObjects.currentItem).toEqual(
      mockAstronomicalObject
    );
  });

  it('should handle fetchFullDetails', async () => {
    const store = configureStore({
      reducer: {
        astronomicalObjects: astronomicalObjectsReducer,
      },
    });

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockFullResponse),
      })
    ) as unknown as typeof fetch;

    await store.dispatch(fetchFullDetails(mockAstronomicalObject.uid));

    const state = store.getState() as RootState;
    expect(
      state.astronomicalObjects.fullDetails[mockAstronomicalObject.uid]
    ).toEqual(mockFullResponse);
  });
});
