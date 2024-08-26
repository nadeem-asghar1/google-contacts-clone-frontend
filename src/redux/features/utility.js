import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchContact: ''
};

export const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    setSearchString: (state, action) => {
      state.searchContact = action.payload
    },
  }
});

export const { setSearchString } = utilitySlice.actions;
export default utilitySlice.reducer;
