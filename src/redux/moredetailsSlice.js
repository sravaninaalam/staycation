import {createSlice} from '@reduxjs/toolkit'
const moredetailsSlice=createSlice({
    name:'moredetails',
    initialState:{
        hotel_details:null,
      
    },
    reducers:{
        getMoreDetails:(state,action)=>{
            state.hotel_details=action.payload
        }
    }
})
export const {getMoreDetails}=moredetailsSlice.actions
export default moredetailsSlice.reducer