import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Hotels_URL, User_Icon } from '../../utils/consts'
import Feedback from './Feedback'


function Addreviews() {
        const[ip,setIp]=useState('')
    const[comments,setComments]=useState([])
    const[reviews,setReviews]=useState([])
    const[isinput,setIsInput]=useState()
   const {id}=useParams()
   useEffect(()=>{
            getReviews()
        },[isinput,id])
    
        async function getReviews(){
          const res=await fetch(Hotels_URL+id)
          const data=await res.json()
          setReviews(data?.reviews)
        }
    function handleSubmit(e){
              e.preventDefault()
                if(ip){
                    const newIp={id:new Date().getTime().toString(),text:ip}
                    setComments([...comments,newIp])
                    setIp('')
                    setIsInput(isinput+1)
                }
            }
           
  return (
    <div className='relative w-2/3  mx-auto my-5 p-2 bg-slate-100 shadow-lg rounded-md '>
       <h5 className='italic font-bold text-center text-red-400'>Custom Reviews</h5>
       <form onSubmit={handleSubmit}>
             <input type='text'className='w-1/2 p-2 my-2 ml-5 rounded-md border  border-dark'
            placeholder='add comment ....' value={ip} onChange={(e)=>setIp(e.target.value)}/>
            <button className='px-3 py-1 mx-3 bg-green-400 rounded-md'>Add</button>
         </form>
         {
            comments.map((cmnt)=> <Comment key={cmnt.id} text={cmnt.text}/> )
          }
           {reviews.length>=1 && <div>
                    {reviews.map((data,index)=><Comment key={index} text={data}/>)}
           </div>}
    </div>
  )
}

export default Addreviews


export const Comment=({text})=>{
  const[isReply,setIsReply]=useState(false)
  return(
    <div className='bg-gray-300 p-2 my-2 mx-5 rounded-xl'>
      <div className='flex mt-1 '>
            <img src={User_Icon} className='h-8 w-8' alt='usericon'/>
            <h6 className='mx-3 '>User_3002</h6>
        </div>
      <div className='flex'>
                <h6 className='mx-5 font-mono'>{text}</h6>
                <button type='submit' onClick={()=>setIsReply(true)}   className='font-medium'>Reply</button>
        </div>
        <Feedback reply={isReply} setreply={setIsReply}/>
    </div>
  )

}