import {configureStore} from '@reduxjs/toolkit'
import bookingsSlice from './bookingsSlice'
import hotelsSlice from './hotelsSlice'
import moredetalisslice from './moredetalisSlice'
const store=configureStore({
    reducer:{
        bookings:bookingsSlice,
        hotels:hotelsSlice,
        moredetails:moredetalisslice
    }
})
export default store