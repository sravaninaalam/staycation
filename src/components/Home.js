import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
const Home = () => {
 const [city,setCity]=useState('')
  const[checkin,setCheckin]=useState('')
 const[checkout,setCheckout]=useState('')
  const[guests,setGuests]=useState(1)
  const navigate=useNavigate()

function handleSearch(e) {
  e.preventDefault();

  const params = new URLSearchParams();
  if (city.trim()) {
    params.set("city", city.trim());
  }
  if (checkin) {
    params.set("checkin", checkin);
  }
  if (checkout) {
    params.set("checkout", checkout);
  }
  params.set("guests", String(guests));

  navigate(`/hotels?${params.toString()}`)
}

  return (

    <div className="mt-5 mx-5 p-2 text-white">
           <h1 className='text-5xl font-bold leading-tight font-serif'>Find your perfect stay</h1>
              <p className='mt-4 text-lg  text-white/90'>Hotels you will love places you will remember</p>
          <button className='mt-8 rounded-lg bg-amber-500 px-6 py-3 font-semibold  hover:bg-amber-400'>
            <Link to='/hotels' className='no-underline text-slate-950'>{'Explore Hotels ->'}</Link>
          </button>
        
         <form onSubmit={handleSearch} className="w-[92%] bg-white mt-[10%] shadow-2xl rounded-2xl grid grid-cols-5">
              <div className="p-4">
               <p className="text-sm font-semibold text-slate-500">WHERE ARE YOU GOING</p>
               <input type="text"
               value={city} onChange={(e)=>setCity(e.target.value)} placeholder="City, landmark .." 
              className="mt-1 text-black placeholder:text-gray-400 outline-none"/>
            </div>
            <div className="border-t p-4 ">
                <p className="text-sm font-semibold text-slate-500">CHECK-IN</p>
                <input type='date' className="mt-1 w-full text-black" value={checkin} onChange={(e)=>setCheckin(e.target.value)}/>
            </div>
            <div className="border-t p-4 ">
                <p className="text-sm font-semibold text-slate-500">CHECK-OUT</p>
                <input type='date'value={checkout} onChange={(e)=>setCheckout(e.target.value)} className="
                mt-1 w-full text-black outline-none"/>
            </div>
            <div className="border-t p-4 ">
              <p className="text-xs font-semibold  text-black">GUESTS</p>
              <select className="mt-1 w-full  text-slate-600"
              value={guests} onChange={(e)=>setGuests(e.target.value)}>
                 <option value={1}>1 Guests</option>
                 <option value={2}>2 Guests</option>
                 <option value={3}>3 Guests</option>
                 <option value={4}>4 Guests</option>
              </select>
            </div>

            <button type="submit" className="p-3 my-10 mx-2 bg-amber-500 rounded-lg"
            
            >Search Hotels</button>
        </form>
    </div>
  )
}

export default Home
