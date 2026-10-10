import React, { useState } from 'react'
import { User_Icon } from '../../utils/constants'
import Feedback from '../Feedback'

const Comment = ({text}) => {
        
    const[isReply,setIsReply]=useState(false)
 
    
  return (
    <div className='bg-gray-300 p-2 my-2 mx-5 rounded-xl'>
        <div className='flex mt-1 '>
            <img src={User_Icon} alt="" className='h-8 w-8'/>
            <h6 className='mx-3 '>User_3002</h6>
        </div>
        <div className='flex'>
                <h6 className='mx-5 font-mono'>{text}</h6>
                <button type='submit' onClick={()=>setIsReply(true)} className='font-medium'>Reply</button>
        </div>
       <Feedback reply={isReply} setreply={setIsReply}/>
    </div>
  )
}

export default Comment
