import React, { useEffect} from 'react'
import Topcontainer from './Topcontainer'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addHotelData } from '../../redux/hotelSlice'
import { getMoreDetails } from '../../redux/moredetailsSlice'
import {  getLocalHotelData } from '../../utils/helper'
import Rooms from './Rooms'
import Nearby from './Nearby'


const Mainframe = () => {
    const {hotelId}=useParams()
    const dispatch=useDispatch()
    const hotels_data=getLocalHotelData()
    if(hotels_data){dispatch(addHotelData(hotels_data))}
  
    useEffect(()=>{
      getData()  
    },[])

 async function getData(){
    const res=await fetch('https://hoteldata-b0ew.onrender.com/Details/'+hotelId)
    const json=await res.json()
    dispatch(getMoreDetails(json))
    sessionStorage.setItem("moredetails",JSON.stringify(json))
}

  return (
    <div className='relative'>
      <Topcontainer  id={hotelId} hoteldata={hotels_data}/>
      <Rooms/>
      <Nearby/>
    </div>
  )
}

export default Mainframe
