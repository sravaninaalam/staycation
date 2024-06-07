import React from 'react'

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Home_IMG } from '../utils/consts'
const Home = () => {
  return (
   <>
    <div className='relative mx-auto p-3 w-[40rem] h-[17rem] mt-5'>
        <img src={Home_IMG} alt='greetingimage' className='w-[40rem] h-[17rem]'/>
        <div className='absolute w-full top-5 left-0 '>
            <p className='p-3 mx-3 my-4 text-red-500 font-serif italic text-xl'> Holi-Stay always provides you an amazing and
                         plesant stay with 
                         your friends and family at reasonable prices.
                         We provide well-designed space with modern amenities.
                         You can reserve a room faster with our efficient Bonstay app 🤎</p>
        </div>
    </div>    
   </>
  )
}

export default Home
