import React, { useEffect, useState } from "react"
import Comment from "./Comment"
import { useLocation, useParams, Navigate } from "react-router-dom"
import { Hotels_URL } from "../../utils/constants"
import { apiFetch } from "../../utils/api"
import { toast } from "react-toastify"
import Feedback from "../Feedback"
const Addreviews = () => {
  const location = useLocation()
  const { hotelName } = useParams()
  const hotelId = location.state?.id

  const [ip, setIp] = useState("")
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
const [submitting, setSubmitting] = useState(false);

  const[comments,setComments]=useState([])
    const[isinput,setIsInput]=useState()
  useEffect(() => {
    getReviews()
  }, [hotelId,isinput])



  async function getReviews(){

        try{
          const res=await fetch(Hotels_URL+hotelId)
          const data=await res.json()
          setReviews(data?.reviews)
        }
        catch {
              toast.error("Unable to load reviews")
          } finally {
            setLoading(false)
          }
    }

    function handleSubmit(e){
      e.preventDefault()
      let text=ip.trim()
    if(text){
            const newIp={id:new Date().getTime().toString(),text:ip}
            setComments([...comments,newIp])
            setIp('')
            setIsInput(isinput+1)
        }
     if (!text) {
          toast.warning("Please enter a review");
          return;
      }
    }


  if (!hotelId) {
    toast.error("Hotel ID is missing");
    return <Navigate to="/hotels" replace />
  }

  return (

 <div className=' w-2/3  mx-auto my-5 p-2 bg-slate-100 shadow-lg rounded-md relative'>
           <h5 className='italic font-bold text-center text-red-400'>Custom Reviews</h5>

        <form onSubmit={handleSubmit}>
            <input type='text'className='w-1/2 p-2 my-2 ml-5 rounded-md border  border-dark'
            placeholder='add comment ....' value={ip} onChange={(e)=>setIp(e.target.value)}/>
            <button className='px-5 py-2 mx-3 bg-amber-400 hover:bg-amber-300 rounded-md'>Add</button>
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
