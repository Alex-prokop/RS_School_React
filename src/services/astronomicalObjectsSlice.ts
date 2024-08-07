import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AstronomicalObjectV2Base,
  AstronomicalObjectV2FullResponse,
} from '../types';

interface AstronomicalObjectsState {
  selectedItems: AstronomicalObjectV2Base[];
  currentItem?: AstronomicalObjectV2Base;
  fullDetails: { [uid: string]: AstronomicalObjectV2FullResponse };
}

const initialState: AstronomicalObjectsState = {
  selectedItems: [],
  fullDetails: {},
};

// Async thunk for fetching full details
export const fetchFullDetails = createAsyncThunk<
  { uid: string; data: AstronomicalObjectV2FullResponse },
  string
>('astronomicalObjects/fetchFullDetails', async (uid: string) => {
  const response = await fetch(
    `https://stapi.co/api/v2/rest/astronomicalObject?uid=${uid}`
  );
  const data: AstronomicalObjectV2FullResponse = await response.json();
  return { uid, data };
});

const astronomicalObjectsSlice = createSlice({
  name: 'astronomicalObjects',
  initialState,
  reducers: {
    selectItem(state, action: PayloadAction<AstronomicalObjectV2Base>) {
      state.selectedItems.push(action.payload);
    },
    unselectItem(state, action: PayloadAction<string>) {
      state.selectedItems = state.selectedItems.filter(
        (item) => item.uid !== action.payload
      );
    },
    setCurrentItem(state, action: PayloadAction<AstronomicalObjectV2Base>) {
      state.currentItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFullDetails.fulfilled, (state, action) => {
      const { uid, data } = action.payload;
      state.fullDetails[uid] = data;
    });
  },
});

export const { selectItem, unselectItem, setCurrentItem } =
  astronomicalObjectsSlice.actions;

export default astronomicalObjectsSlice.reducer;
