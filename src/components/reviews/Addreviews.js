import React, { useEffect, useState } from "react"
import Comment from "./Comment"
import { useLocation, useParams, Navigate } from "react-router-dom"
import { Hotels_URL } from "../../utils/constants"
import { apiFetch } from "../../utils/api"
import { toast } from "react-toastify"

const Addreviews = () => {
  const location = useLocation()
  const { hotelName } = useParams()
  const hotelId = location.state?.id

  const [ip, setIp] = useState("")
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!hotelId) return
    let cancelled = false

    async function getReviews() {
      try {
        const data = await apiFetch(Hotels_URL + hotelId)
        if (!cancelled) setReviews(Array.isArray(data?.reviews) ? data.reviews : data?.reviews ? [data.reviews] : [])
      } catch {
        if (!cancelled) toast.error("Unable to load reviews")
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    getReviews()
    return () => {
      cancelled = true
    }
  }, [hotelId])

  async function handleSubmit(e) {
    e.preventDefault()
    const text = ip.trim()
    if (!text) return

    const nextReviews = [...reviews, text]
    try {
      await apiFetch(Hotels_URL + hotelId, {
        method: "PATCH",
        body: JSON.stringify({ reviews: nextReviews }),
      })
      setReviews(nextReviews)
      setIp("")
      toast.success("Review added")
    } catch {
      toast.error("Could not save your review")
    }
  }

  if (!hotelId) {
    return <Navigate to="/hotels" replace />
  }

  return (
    <div className="w-2/3 mx-auto my-5 p-2 bg-slate-100 shadow-lg rounded-md relative">
      <h5 className="italic font-bold text-center text-red-400">Guest reviews {hotelName ? `for ${hotelName}` : ""}</h5>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="w-1/2 p-2 my-2 ml-5 rounded-md border border-dark"
          placeholder="Add a comment..."
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button type="submit" className="px-3 py-1 mx-3 bg-green-400 rounded-md">
          Add
        </button>
      </form>

      {loading ? (
        <p className="p-3">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="p-3">No reviews yet. Be the first to share your stay.</p>
      ) : (
        reviews.map((data, index) => <Comment key={`${data}-${index}`} text={data} />)
      )}
    </div>
  )
}

export default Addreviews
