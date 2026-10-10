import React, { useEffect, useState } from "react"
import { useLocation, Navigate } from "react-router-dom"
import { Hotels_URL } from "../utils/constants"
import { apiFetch } from "../utils/api"
import { toast } from "react-toastify"

const Viewreview = () => {
  const location = useLocation()
  const id = location.state?.id
  const [reviews, setReviews] = useState([])
  const [ip, setIp] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    let cancelled = false

    async function getReviews() {
      try {
        const data = await apiFetch(Hotels_URL + id)
        const list = Array.isArray(data?.reviews) ? data.reviews : data?.reviews ? [data.reviews] : []
        if (!cancelled) setReviews(list)
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
  }, [id])

  async function submitHandler(e) {
    e.preventDefault()
    const text = ip.trim()
    if (!text) return

    const nextReviews = [...reviews, text]
    try {
      await apiFetch(Hotels_URL + id, {
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

  if (!id) {
    return <Navigate to="/hotels" replace />
  }

  return (
    <div className="w-2/3 mx-auto my-5 p-2 bg-slate-100 shadow-lg rounded-md relative">
      <h5 className="italic font-bold text-center text-red-400">Guest reviews</h5>
      {loading ? (
        <p className="p-3">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="p-3 my-2 font-serif text-xl italic">No reviews yet.</p>
      ) : (
        <ul className="p-3 my-2 font-serif text-xl italic">
          {reviews.map((review, index) => (
            <li key={`${review}-${index}`} className="mt-3">
              {review}❤
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="p-2 m-2 border border-black w-72"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button type="submit" className="p-2 m-2 bg-green-700 rounded-md font-bold text-white">
          Add your review
        </button>
      </form>
    </div>
  )
}

export default Viewreview
