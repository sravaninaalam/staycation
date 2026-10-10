import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { addHotelData } from "../redux/hotelsSlice"
import { Hotels_URL } from "../utils/constants"
import { apiFetch } from "../utils/api"

export const useHoteldata = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const dispatch = useDispatch()

  useEffect(() => {
    let cancelled = false

    async function getHotelData() {
      try {
        const json = await apiFetch(Hotels_URL)
        if (cancelled) return
        setData(json)
        dispatch(addHotelData(json))
      } catch (err) {
        if (!cancelled) setError(err.message || "Unable to load hotels")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    getHotelData()
    return () => {
      cancelled = true
    }
  }, [dispatch])

  return { data, loading, error }
}
