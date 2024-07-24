import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AstronomicalObjectV2Base } from '../types';

interface AstronomicalObjectsState {
  selectedItems: AstronomicalObjectV2Base[];
  currentItem?: AstronomicalObjectV2Base;
}

const initialState: AstronomicalObjectsState = {
  selectedItems: [],
};

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
});

export const { selectItem, unselectItem, setCurrentItem } =
  astronomicalObjectsSlice.actions;

export default astronomicalObjectsSlice.reducer;
