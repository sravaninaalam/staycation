import {configureStore} from '@reduxjs/toolkit'
import hotelSlice from './hotelSlice'
import moredetailsSlice from './moredetailsSlice'
import bookingsSlice from './bookingsSlice'


const store=configureStore({
    reducer:{
       
        hotels:hotelSlice,
        moredetails:moredetailsSlice,
        bookings:bookingsSlice
     
    }
})
export default store