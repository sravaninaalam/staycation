import { createSlice } from "@reduxjs/toolkit";

const hotelsSlice=createSlice({
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
export const{addHotelData}=hotelsSlice.actions
export default hotelsSlice.reducer