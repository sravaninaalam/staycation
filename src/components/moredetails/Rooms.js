import React from "react"
import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const Rooms = () => {
  const details = useSelector((store) => store.moredetails.hotel_details)
  if (!details?.rooms) return null

  return (
    <div className="relative bg-white mx-10 p-2">
      <h4 className="p-2 mx-3 text-red-500 italic font-bold relative">Rooms & Prices</h4>
      {details.rooms.map((type, index) => (
        <div key={index} className="flex flex-wrap">
          <div className="mr-10 ml-3 w-1/2 min-w-[280px]">
            <h5>{type.Type}</h5>
            <img src={type.img} alt={type.Type} className="w-96" />
            <RoomTypes types={type.options} />
          </div>
          <RoomPrices prices={type.prices} />
        </div>
      ))}
    </div>
  )
}

export default Rooms

export const RoomTypes = ({ types = [] }) => {
  return (
    <ul>
      {types.map((option, index) => (
        <li key={index}>{option}</li>
      ))}
    </ul>
  )
}

export const RoomPrices = ({ prices = [] }) => {
  const hotels = useSelector((store) => store.hotels.hoteldata)
  const { hotelId } = useParams()
  const hotel = hotels?.find((item) => String(item.id) === String(hotelId))

  return (
    <div className="w-2/3 my-5 py-4">
      {prices.map((room, index) => (
        <div key={index} className="flex">
          <h6>{room.option}</h6>
          <h6 className="ml-10 text-green-500 font-bold font-mono">{room.cost}</h6>
        </div>
      ))}
      {hotel?.hotelName && (
        <Link state={hotel.hotelName} to="/bookroom" className="text-white">
          <button type="button" className="p-2 m-2 rounded-md bg-green-500">
            Book room
          </button>
        </Link>
      )}
    </div>
  )
}
