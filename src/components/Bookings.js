import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { addBookingDetails, cancelBooking } from "../redux/bookingsSlice"
import { API_OPTIONS_DELETE, Bookings_URL } from "../utils/constants"
import { toast } from "react-toastify"
import { apiFetch } from "../utils/api"

const Bookings = () => {
  const bookingsdata = useSelector((store) => store.bookings.bookingdetails)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    const getHotelBookings = async () => {
      try {
        const json = await apiFetch(Bookings_URL)
        if (!cancelled) dispatch(addBookingDetails(json))
      } catch {
        if (!cancelled) toast.error("Unable to load bookings")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    getHotelBookings()
    return () => {
      cancelled = true
    }
  }, [dispatch])

  const cancelRoom = async (id) => {
    try {
      await apiFetch(Bookings_URL + id, API_OPTIONS_DELETE)
      dispatch(cancelBooking(id))
      toast.success("Cancellation successful")
    } catch (error) {
      toast.error(error.message || "Could not cancel booking")
    }
  }

  if (loading) {
    return (
      <div className="relative w-72 my-5 mx-auto bg-white p-5 rounded-md text-center">
        Loading bookings...
      </div>
    )
  }

  if (!bookingsdata || bookingsdata.length === 0) {
    return (
      <div className="relative w-72 my-5 mx-auto bg-gray-300 p-5 rounded-md text-center">
        <h1 className="text-xl">No bookings yet</h1>
        <Link to="/hotels">Browse hotels</Link>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap mx-5 relative">
      {bookingsdata.map((booking) => (
        <div className="bg-white w-72 m-2 p-2 rounded-md" key={booking.id}>
          <h5 className="p-2 font-bold font-serif italic text-center text-red-500">{booking.hotelName}</h5>
          <h6 className="px-3 py-1">
            <span className="text-lg">Check In: </span>
            {booking.startDate}
          </h6>
          <h6 className="px-3 py-1">
            <span className="text-lg">Check Out: </span>
            {booking.endDate}
          </h6>
          <h6 className="px-3 py-1">
            <span className="text-lg">No. of persons: </span>
            {booking.noOfPersons}
          </h6>
          <h6 className="px-3 py-1">
            <span className="text-lg">No. of rooms: </span>
            {booking.noOfRooms}
          </h6>
          <h6 className="px-3 py-1">
            <span className="text-lg">Type of room: </span>
            {booking.typeOfRoom}
          </h6>
          <Link
            to="/reschedule"
            className="no-underline"
            state={{
              hotelName: booking.hotelName,
              noOfRooms: booking.noOfRooms,
              noOfPersons: booking.noOfPersons,
              typeOfRoom: booking.typeOfRoom,
              id: booking.id,
            }}
          >
            <button className="bg-amber-500 hover:bg-amber-400 font-semibold p-2 mx-3 w-64 rounded-md no-underline text-white">
              Reschedule
            </button>
          </Link>
          <button
            className="border border-slate-300  hover:bg-slate-200 text-slate-700 font-semibold p-2 mx-3 my-2 w-64 rounded-md"
            onClick={() => {
              cancelRoom(booking.id)
            }}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  )
}

export default Bookings




