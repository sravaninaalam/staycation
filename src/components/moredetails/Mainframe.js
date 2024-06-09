import React, { useEffect, useState } from 'react'
import Topcontainer from './Topcontainer'
import { useParams } from 'react-router-dom'
import Shimmer from '../Shimmer'
import { useDispatch } from 'react-redux'
import { addHotelData } from '../../redux/hotelSlice'
import { getMoreDetails } from '../../redux/moredetailsSlice'
import {  getData, getLocalHotelData } from '../../utils/helper'
import Rooms from './Rooms'
import Nearby from './Nearby'



const Mainframe = () => {
    const {hotelId}=useParams()
    const[data,setData]=useState([])

    const dispatch=useDispatch()
    const local=getLocalHotelData()
    useEffect(()=>{
      getData()
       dispatch(addHotelData(local))
    },[])

 async function getData(){
    const res=await fetch('https://hoteldata-b0ew.onrender.com/Details/'+hotelId)
    const json=await res.json()
    setData(json)
    dispatch(getMoreDetails(json))
    sessionStorage.setItem("moredetails",JSON.stringify(json))
}
 if(data==null)return <Shimmer/>
  return (
    <div className='relative'>
      <Topcontainer  id={hotelId} hoteldata={local}/>
      <Rooms/>
      <Nearby/>
    </div>
  )
}

export default Mainframe
