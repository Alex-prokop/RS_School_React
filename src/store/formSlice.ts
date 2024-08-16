import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  terms: boolean;
  picture: File;
  country: string;
}

const formSlice = createSlice({
  name: 'form',
  initialState: [] as FormData[],
  reducers: {
    formSubmit(state, action: PayloadAction<FormData>) {
      state.push(action.payload);
    },
  },
});

export const { formSubmit } = formSlice.actions;
export default formSlice.reducer;
