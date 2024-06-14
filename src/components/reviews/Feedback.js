import React, { useRef, useState } from 'react'
import { Comment } from './Addreviews'

const Feedback = ({reply,setreply}) => {

  const[ip,setIp]=useState('')
   const[replies,setReplies]=useState([])
  //  const[isSubmit,setIsSubmit]=useState(false)

const isSubmitRef=useRef(false)

   function handleSubmit(e){
    e.preventDefault()
    if(ip){
      const newIp={id:new Date().getTime().toString(),text:ip}
      setReplies([...replies,newIp])
      setIp('')
      // setIsSubmit(true)
      isSubmitRef.current=true
      setreply(false)
    }
}

  return (
    <div>
      {reply && <form className='flex' onSubmit={handleSubmit}>
             <input type='text'  className='border border-black ml-5 mt-1 rounded-md p-1 w-64'  
             value={ip} onChange={(e)=>setIp(e.target.value)} placeholder='Add a reply ...'/>
            <button onClick={()=>setreply(false)} className='mx-3 my-1'>Cancel</button>             
            <button type='submit'>send</button>
          </form>}
             {isSubmitRef.current && <div className='border border-black rounded-lg'>
                      {replies.map(data=><Comment key={data.id} text={data.text}/>)}</div>}
    </div>
  )
}

export default Feedback
