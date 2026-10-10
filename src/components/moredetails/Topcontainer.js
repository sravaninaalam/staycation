import React from "react"
import { useSelector } from "react-redux"
import Livemap from "./Livemap"
import { ImgSlide } from "./Imgcaurosel"
import Services from "./Services"

const Topcontainer = ({ id }) => {
  const hoteldata = useSelector((store) => store.hotels.hoteldata)
  const hotel = hoteldata?.find((item) => String(item.id) === String(id))

  if (!hotel) {
    return (
      <div className="relative mt-10 mx-10 bg-white rounded-md p-4">
        <p>Hotel information is still loading...</p>
      </div>
    )
  }

  return (
    <>
      <div className="relative flex flex-wrap mt-10 mx-10 bg-white rounded-md">
        <div>
          <h2 className="text-3xl p-2 font-bold text-red-600">{hotel.hotelName}</h2>
          <p className="p-2 mx-2">{hotel.address}</p>
          <ImgSlide />
        </div>
        <Livemap address={hotel.address} />
      </div>
      <Services />
    </>
  )
}

export default Topcontainer
