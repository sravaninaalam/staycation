import { createSlice } from "@reduxjs/toolkit";
const bookingSlice=createSlice({
    name:'bookings',
    initialState:{
        bookingdetails:[]
    },
    reducers:{
        addBookingDetails:(state,action)=>{
            // console.log("action",action.payload)
            state.bookingdetails=action.payload
            // console.log(state.bookingdetails,"in slice")
        },
        cancelBooking:(state,action)=>{
            console.log(action.payload,"paylod is")
            state.bookingdetails= state.bookingdetails.filter(item=>item.id!==action.payload)
         console.log(state.bookingdetails)
        }
    }
})
export const {addBookingDetails,cancelBooking}=bookingSlice.actions
export default bookingSlice.reducer