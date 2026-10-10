import { createSlice } from "@reduxjs/toolkit"
const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    bookingdetails: [],
  },
  reducers: {
    addBookingDetails: (state, action) => {
      state.bookingdetails = action.payload
    },
    cancelBooking: (state, action) => {
      state.bookingdetails = state.bookingdetails.filter((item) => item.id !== action.payload)
    },
  },
})
export const { addBookingDetails, cancelBooking } = bookingSlice.actions
export default bookingSlice.reducer
