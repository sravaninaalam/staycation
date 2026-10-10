

const Pagination = ({totalLength,currentpage,setCurrentpage,postsPerPage}) => {
    let nums=[]
    for(let i=1;i<=Math.ceil(totalLength/postsPerPage);i++){
        nums.push(i)
    }
  return (
    <div className='flex w-72 mx-auto justify-center relative'>
       {nums.map((n,index)=><div key={index}>
          <button onClick={()=>setCurrentpage(n)} className={`${n===currentpage ?"bg-green-700":"bg-gray-400"} ${"justify-center px-4 py-2 m-3 rounded-md font-semibold"}`}>{n}</button>
       </div>)}
    </div>
  )
}

export default Pagination
