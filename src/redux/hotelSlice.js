import { createSlice } from "@reduxjs/toolkit";

const hotelSlice=createSlice({
    name:"hotels",
    initialState:{
        hoteldata:null,
    
    },
    reducers:{
        addHotelData:(state,action)=>{
            state.hoteldata=action.payload
          
        },
       
    }
})
export const{addHotelData}=hotelSlice.actions
export default hotelSlice.reducer