import React from 'react'
import { useSelector } from 'react-redux'


const Livemap = ({address}) => {
 
  const hotels=useSelector(store=>store.hotels.hoteldata)
  
  if(!hotels) return

  return (
    <>
    <div className=' mx-10 p-2 my-3 bg-white'>
        <h4 className='p-2 ml-5 text-red-500 italic font-bold relative'>Location</h4>
     <iframe width="600" height="400" title='adress'
      src={`https://maps.google.com/maps?q=${address}&t=&z=13&ie=UTF8&iwloc=&output=embed`}></iframe>
    </div>
    </>
  )
}

export default Livemap
