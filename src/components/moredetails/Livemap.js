import React from "react"

const Livemap = ({ address }) => {
  if (!address) return null

  return (
    <div className="relative mx-10 p-2 my-3 bg-white">
      <h4 className="p-2 mx-3 text-red-500 italic font-bold relative">Location</h4>
      <iframe
        title="Hotel location"
        width="600"
        height="300"
        src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
      />
    </div>
  )
}

export default Livemap
