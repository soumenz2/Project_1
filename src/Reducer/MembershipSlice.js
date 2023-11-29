import { createSlice } from "@reduxjs/toolkit";

const membershipSlice=createSlice({
    name:'membershipData',
    initialState:{
        Plan: 'Gold',
        startDate: '',
        Discount: ''
    },
    reducers:{
        setMembershipStates:(state,action)=>{
            return { ...state, ...action.payload };
        }
    }
})
export const {setMembershipStates} =membershipSlice.actions;
export const selectmembershipStates=(state)=>state.membershipData;
export default membershipSlice.reducer;
