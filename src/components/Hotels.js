import React, { useEffect, useState } from 'react'
import Shimmer from './Shimmer'
import Pagination from './Pagination'
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { addHotelData } from '../redux/hotelSlice'
const Hotels = () => {
  const[searchdata,setSearchData]=useState('')
  const[hoteldata,setHotelData]=useState([])
  const[clone,setClone]=useState([])
  const[currentpage,setCurrentPage]=useState(1)
  const postsPerPage=6
  const dispatch=useDispatch()
  useEffect(()=>{
      getHotelsFromApi()
      
  },[])
  async function getHotelsFromApi(){
      const data=await fetch("https://hoteldata-b0ew.onrender.com/hotels")
      const json=await data.json()
      setHotelData(json)
      setClone(json)
      sessionStorage.setItem("myHotelData",JSON.stringify(json))
      dispatch(addHotelData(json))
  }
  const submitHandler=(e)=>{
   e.preventDefault()
   if(!searchdata){
     setHotelData(clone)
   }
   else{
     const res=clone.filter(item=>item.city.toLowerCase().replace(" ","").includes(searchdata))
     setHotelData(res)
     
     
   }
   setSearchData('')
 }
 


  const lastIndex=currentpage*postsPerPage
  const firstIndex=lastIndex-postsPerPage
  const hotelsPerPage=hoteldata.slice(firstIndex,lastIndex)
 
  return (
   <>
   {hoteldata===null?<Shimmer/>:
   <>
      <div className='relative'>
         <form onSubmit={submitHandler}  className='my-3 mx-auto border rounded-md border-black w-2/3'>
                  <input type="text" placeholder='search hotels by location...! (Hyderabad,Goa,Bangalore,tirupati)' 
                  className='form-control ' 
                  value={searchdata} onChange={e=>setSearchData(e.target.value)}/>
          </form>
          {hotelsPerPage.map((i)=>
             <div key={i.id} className='w-3/4 mx-auto  flex my-2 p-2 shadow-lg bg-white'>
                 <img src={i.imageUrl} className='w-52 ' alt='hotel-images'/>
                 <div>
                    <h5 className='text-center italic text-red-400 text-xl'>{i.hotelName}</h5>
                    <p className='px-10 font-medium'><span className='font-medium'>City: </span>{i.city}</p>
                    <p className='px-10'><span className='font-medium'>Amenities:</span>{i.amenities}</p>
                    <p className='px-10'><span className='font-medium'>Address: </span>{i.address}</p>
                    <p className='px-10'><span className='font-medium'>Phone No: </span>{i.phoneNo}</p>
                  </div>
                  <div className='card-body d-flex flex-column'>
                <Link to={'/bookroom/'+i.hotelName}><button className='bg-teal-400 font-semibold text-white p-2 m-2 float-right'>Book Room</button></Link>
                  <Link to={'/moredetails/'+i.id} ><button className='bg-green-500 font-semibold text-white float-right p-2 m-2'>More details</button></Link>
                 <Link to={`/reviews/${i.hotelName}/${i.id}`} ><button className='bg-red-400 font-semibold text-white  float-right p-2 m-2'>View Review</button></Link>
                  </div>
             </div>
          )}
       </div>
       <Pagination totalLength={hoteldata.length} currentpage={currentpage}  setCurrentpage={setCurrentPage}
      postsPerPage={postsPerPage}/>
      </>
      }
   </>
  )
}

export default Hotels
