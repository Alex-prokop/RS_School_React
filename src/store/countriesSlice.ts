import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialCountries } from '../components/countriesData';

interface CountryState {
  countries: string[];
}

const initialState: CountryState = {
  countries: initialCountries,
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    setCountries(state, action: PayloadAction<string[]>) {
      state.countries = action.payload;
    },
    addCountry(state, action: PayloadAction<string>) {
      state.countries.push(action.payload);
    },
    addCountries(state, action: PayloadAction<string[]>) {
      state.countries = [...state.countries, ...action.payload];
    },
  },
});

export const { setCountries, addCountry, addCountries } =
  countriesSlice.actions;
export default countriesSlice.reducer;
