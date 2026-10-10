import { useState } from "react"
import { useSelector } from "react-redux"

export const ImgSlide = () => {
  const details = useSelector((store) => store.moredetails.hotel_details)
  const imgdata = details?.imgUrl || []
  const [index, setIndex] = useState(0)

  if (!details || imgdata.length === 0) return null

  const totalImgs = imgdata.length

  function previousImg() {
    setIndex((current) => (current === 0 ? totalImgs - 1 : current - 1))
  }

  function nextImg() {
    setIndex((current) => (current === totalImgs - 1 ? 0 : current + 1))
  }

  return (
    <div className="p-2 flex items-center">
      <button type="button" onClick={previousImg} aria-label="Previous image">
        ⬅️
      </button>
      <img src={imgdata[index]} alt={`Hotel view ${index + 1}`} className="rounded-md w-96" />
      <button type="button" onClick={nextImg} aria-label="Next image">
        ➡️
      </button>
    </div>
  )
}
