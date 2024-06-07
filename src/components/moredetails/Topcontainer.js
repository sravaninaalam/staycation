import Imgcaurosel from "./Imgcaurosel"
import Livemap from "./Livemap"
import Services from "./Services"

const Topcontainer = ({id,hoteldata}) => {

  const hotelName=hoteldata.filter((item)=>item.id==id).map(item=>item.hotelName)
  const address=hoteldata.filter((item)=>item.id==id).map(item=>item.address)
  return (
    <>
    <div className=' flex mt-10 mx-10 bg-white rounded-md'>
         <div>
         
               <h2 className=" px-2 mx-2 mt-3  text-red-600 ">{hotelName}</h2>
               <p className='px-2 mx-2'>{address}</p>
               <Imgcaurosel/>
            </div>  
            <Livemap address={address}/>
    </div>
    <Services />
    </>
  )
}

export default Topcontainer
