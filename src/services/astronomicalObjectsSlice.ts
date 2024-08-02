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
export const fetchFullDetails = createAsyncThunk(
  'astronomicalObjects/fetchFullDetails',
  async (uid: string) => {
    const response = await fetch(
      `https://stapi.co/api/v2/rest/astronomicalObject?uid=${uid}`
    );
    const data = await response.json();
    console.log(`Fetched details for uid: ${uid}`, data);
    return { uid, data } as {
      uid: string;
      data: AstronomicalObjectV2FullResponse;
    };
  }
);

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
      console.log(`Storing details for uid: ${uid}`, data);
      state.fullDetails[uid] = data;
      console.log('Updated fullDetails:', JSON.stringify(state.fullDetails));
    });
  },
});

export const { selectItem, unselectItem, setCurrentItem } =
  astronomicalObjectsSlice.actions;

export default astronomicalObjectsSlice.reducer;
