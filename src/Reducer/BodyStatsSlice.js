// bodyStatsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const bodyStatsSlice = createSlice({
  name: 'bodyStatsData',
  initialState: {
    Height: '',
    Weight: '',
    Blood_group: '',
    Date_of_measurement: '',
  },
  reducers: {
    setBodyStats: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBodyStats } = bodyStatsSlice.actions;
export const selectBodyStats = (state) => state.bodyStatsData;

export default bodyStatsSlice.reducer;
