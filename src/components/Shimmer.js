import React from 'react'

const Shimmer = () => {
  return (
    <div className='relative'>
      {Array(7).fill("").map((key,index)=><div className='w-2/3 h-48 bg-gray-300 mx-auto p-2 mt-5 rounded-md'>
        loading
      </div>)}
    </div>
  )
}

export default Shimmer
