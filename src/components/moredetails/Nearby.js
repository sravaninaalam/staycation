import {useSelector} from 'react-redux'
function Nearby() {
    const data=useSelector(store=>store.moredetails.hotel_details)
    if(!data)return
  return (
    <div className='bg-white  mx-10 my-3 shadow-md relative'>
    <h4 className='p-2 mx-3  text-red-500 italic font-bold relative'>Nearby places</h4>
    <div className='flex flex-wrap p-2 mx-3'>
    {data?.Nearby.map((category, index) => {
        const categoryName = Object.keys(category)[0];
        const places = category[categoryName];

        return (
            <div key={index} >
                  <h6 className='font-semibold p-2 mx-2 text-lg'>{categoryName}</h6>
                <div>
                    {Object.entries(places).map(([place, distance], subIndex) => (
                        <li key={subIndex} className='p-1 mx-2'>
                           <span className='font-sans italic'>{place}</span>: <span className='font-semibold'>{distance}</span>
                        </li>
                    ))}
                </div>
            </div>
        );
    })}
    </div>
    </div>
  )
}

export default Nearby
