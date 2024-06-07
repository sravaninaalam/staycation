import React from 'react'
import { BG_IMG } from '../utils/consts'

const Signout = () => {
  return (
    <>
   
        <div className='bg-blue-700 h-11 '>
            <h3 className='p-2 font-bold text-xl text-white font-serif'>Holi-Stay</h3>
       </div>
       <div className='fixed'>
    <img src={BG_IMG} alt='background' className='h-screen w-screen object-cover'/>
</div>
    <div className='my-5 p-5  text-center relative text-white'>
          <h5 className='italic'>Suucessfully Signed Out</h5>
          <p className='italic text-2xl'><a href='/login'>SignIn</a> again?</p>
    </div>
    </>
  )
}

export default Signout
