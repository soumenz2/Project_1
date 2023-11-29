import { configureStore } from '@reduxjs/toolkit';
import basicReducer from '../Reducer/BascicSlice';
import bodystatsReducer from '../Reducer/BodyStatsSlice'
import membershipReducer from '../Reducer/MembershipSlice'

const store = configureStore({
  reducer: {
    basicdata: basicReducer,
    bodyStatsData:bodystatsReducer,
    membershipdata:membershipReducer
    
    // Add other reducers here if needed
  },
});

export default store;
