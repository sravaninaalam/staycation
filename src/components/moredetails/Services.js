import { getLocalDetailsData } from "../../utils/helper"

function Services() {
 const data=getLocalDetailsData()
  return (
    <div className='bg-white  mx-10 my-3 shadow-md relative'>
    <h4 className='p-2 mx-3  text-red-500 italic font-bold relative'>Services & Facilities</h4>
     <div className=' flex flex-wrap'>
      {data?.facilities.map((item,index)=><Facilities key={index} items={item}/>)}
     </div>

    </div>
  )
}

export default Services



export const Facilities = ({items}) => {
    return (
      <div className=' relative mx-5 p-2 '>
        
        {Object.entries(items).map(([key, value]) => (
                <div key={key} >
                  <h6 className='font-semibold p-1 text-lg'>{key}</h6> 
                {value.map((item)=><p className='m-1 '>✔️{item}</p>)}
                </div>
          ))}
      </div>
    )
  }