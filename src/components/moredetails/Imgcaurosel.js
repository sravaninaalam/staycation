import React, { useState } from 'react'
import { getLocalDetailsData } from '../../utils/helper'
import Shimmer from '../Shimmer'
import { useSelector } from 'react-redux'


function Imgcaurosel() {
  const data=useSelector(store=>store.moredetails.hotel_details)
  // const[imgdata,setImgdata]=useState(details?.imgUrl)
//  const data=getLocalDetailsData()

      const imgdata=data?.imgUrl
      const[index,setIndex]=useState(0)

      if(!imgdata) return 'Loading..'
      const total_imgs=imgdata.length
  function previousImg(){
    setIndex(index-1)
    if(index==0){
        setIndex(total_imgs-1)
    }
 
}
function nextImg(){
    setIndex(index+1)
    if(index==(total_imgs-1)){
        setIndex(total_imgs-index)
      }
}

  return (
    <div  className=' p-2  flex'>
    <button onClick={previousImg}>⬅️</button>
  <img src={imgdata[index]} className='rounded-md w-full' alt='hotel-inside-photos'/>
  <button onClick={nextImg}>➡️</button>
</div>
  )
}

export default Imgcaurosel
