import React, { useEffect, useState } from "react"
import Topcontainer from "./Topcontainer"
import Rooms from "./Rooms"
import Nearby from "./Nearby"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getMoreDetails } from "../../redux/moredetalisSlice"
import { addHotelData } from "../../redux/hotelsSlice"
import { Details, Hotels_URL } from "../../utils/constants"
import { apiFetch } from "../../utils/api"

const Mainframe = () => {
  const { hotelId } = useParams()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const hoteldata = useSelector((store) => store.hotels.hoteldata)

  useEffect(() => {
    let cancelled = false

    async function getData() {
      setLoading(true)
      setError("")
      try {
        const json = await apiFetch(Details + hotelId)
        if (cancelled) return
        setData(json)
        dispatch(getMoreDetails(json))

        if (!hoteldata?.length) {
          const hotels = await apiFetch(Hotels_URL)
          if (!cancelled) dispatch(addHotelData(hotels))
        }
      } catch {
        if (!cancelled) setError("Unable to load hotel details")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    getData()
    return () => {
      cancelled = true
    }
  }, [hotelId, dispatch])

  if (loading) {
    return <div className="relative p-10 text-center bg-white mx-10 mt-10 rounded-md">Loading hotel details...</div>
  }

  if (error || !data) {
    return <div className="relative p-10 text-center bg-white mx-10 mt-10 rounded-md text-red-500">{error || "Hotel not found"}</div>
  }

  return (
    <div>
      <Topcontainer data={data} id={hotelId} />
      <Rooms />
      <Nearby />
    </div>
  )
}

export default Mainframe
