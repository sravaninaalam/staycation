import React from 'react'
import {useSelector} from 'react-redux'
import {Link, useLocation, useParams} from 'react-router-dom'
const Rooms = () => {
    const details=useSelector(store=>store.moredetails.hotel_details)
    // console.log(details.rooms)
   if(!details) return
  return (
    <>
         
    <div className='relative bg-white mx-10 p-2 '>
    <h4 className='p-2 mx-3 text-red-500 italic font-bold relative'>Rooms & Prices</h4>
       {details?.rooms.map((type,index)=><div key={index} className='flex '>
        <div className='mr-10 ml-3 w-1/2'>
                <h5>{type.Type}</h5>
                <img src={type.img} className='w-96' alt='hotel-rooms'/>
            <RoomTypes  types={type.options}/>
       </div>
       <RoomPrices prices={type.prices}/>
       </div>)}
    </div>
    </>
  )
}

export default Rooms


export const RoomTypes = ({types}) => {
  
  return (
    <div>
        {types.map((option,index)=><li key={index}>{option}</li>)}
    </div>
  )
}

export const RoomPrices = ({prices}) => {
  const hotels=useSelector(store=>store.hotels.hoteldata)
  const {hotelId}=useParams()
if(!hotels) return
  return (
    <div className=' w-2/3 my-5 py-4'>
        {prices.map((room,index)=><div key={index} className='flex'>
  
          <h6 className=''>{room.option}</h6>
         <h6 className='ml-10 text-green-500 font-bold font-mono'>{room.cost}</h6>

        </div>)}
      <Link state={hotels[hotelId-1]?.hotelName} to='/bookroom' className='text-white'><button className='p-2 m-2 rounded-md bg-green-500'>Bookroom</button></Link>
    </div>
  )
}

