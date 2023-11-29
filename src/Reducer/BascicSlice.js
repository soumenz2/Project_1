
import { createSlice } from '@reduxjs/toolkit';

const basicSlice = createSlice({
  name: 'basicData',
  initialState: {
    name: '',
    mobileNumber:'',
    Email:'',
    Gender:'',
    Address:'',
    Emobilenumber:'',
    dob:'',
    id_proof:'',
    profileImage: null,
  },
  reducers: {
    setBasicData: (state, action) => {
        return { ...state, ...action.payload };
    },
    resetBasicData: (state) => {
      return {
        name: '',
        mobileNumber: '',
        Email: '',
        Gender: '',
        Address: '',
        Emobilenumber: '',
        dob: '',
        profileImage: null,
      };
    },
  },
});

export const { setBasicData, resetBasicData } = basicSlice.actions;
export const selectBasicData = (state) => state.basicData;

export default basicSlice.reducer;
