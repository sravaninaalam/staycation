import React from 'react'

const Pagination = ({totalLength,currentpage,setCurrentpage,postsPerPage}) => {
    let nums=[]
    for(let i=1;i<=Math.ceil(totalLength/postsPerPage);i++){
        nums.push(i)
    }
  return (
    <div className='flex w-72 mx-auto justify-center relative'>
       {nums.map((n,index)=><div key={index}>
          <button onClick={()=>setCurrentpage(n)} className={`${n===currentpage ?"btn btn-success":"btn btn-secondary"} ${"justify-center my-2 mx-3"}`}>{n}</button>
       </div>)}
    </div>
  )
}

export default Pagination
