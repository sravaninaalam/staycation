import { useEffect, useMemo, useState } from "react"
import { Link, useParams, useSearchParams } from "react-router-dom"
import Shimmer from "./Shimmer"
import Pagination from "./Pagination"
import { useHoteldata } from "../customhooks/useHoteldata"

function filtered(list, query) {
  const normalized = query.toLowerCase().replace(/\s+/g, "")
  return list.filter((item) => {
    const city = item.city?.toLowerCase().replace(/\s+/g, "") || ""
    const name = item.hotelName?.toLowerCase().replace(/\s+/g, "") || ""
    return city.includes(normalized) || name.includes(normalized)
  })
}

const Hotels = () => {

  const { data: clone, loading, error } = useHoteldata()
  const [searchParams] = useSearchParams();

  const cityParam = searchParams.get("city") || "";
  const [searchdata, setSearchData] = useState(cityParam);
  const [query, setQuery] = useState(cityParam);
  const [currentpage, setCurrentPage] = useState(1);
  const postsPerPage = 6

  useEffect(() => {
  const timer = setTimeout(() => {
    setQuery(searchdata.trim());
    setCurrentPage(1);
  }, 500);

  return () => clearTimeout(timer);
}, [searchdata]);

useEffect(() => {
  setSearchData(cityParam);
  setQuery(cityParam.trim());
  setCurrentPage(1);
}, [cityParam]);
  const hoteldata = useMemo(() => {
    if (!query) return clone
    return filtered(clone, query)
  }, [clone, query])

  
  // const submitHandler = (e) => {
  //   e.preventDefault()
  //   setQuery(searchdata.trim())
  //   setCurrentPage(1)
  // }

  const lastIndex = currentpage * postsPerPage
  const firstIndex = lastIndex - postsPerPage
  const hotelsPerPage = hoteldata.slice(firstIndex, lastIndex)
  const totalPages = Math.ceil(hoteldata.length / postsPerPage) || 1

  if (loading) return <Shimmer />

  if (error) {
    return (
      <div className="relative w-2/3 mx-auto my-10 p-6 bg-white rounded-md text-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }


  return (
    <div className="relative">
      <form  className="my-3 mx-auto p-2 rounded-md w-[75%] ">
        <input type='text' placeholder="Search hotels by name or city (Hyderabad, Goa, Bangalore, Tirupati)" 
         value={searchdata}
        onChange={(e) => setSearchData(e.target.value)}
        className="w-full px-1 py-2 rounded-md"/>
       
      </form>
      <div>
        <hr />
        {hotelsPerPage.length === 0 ? (
          <div className="w-3/4 mx-auto my-6 p-6 bg-white rounded-md text-center">
            <p>No hotels found. Try another city or hotel name.</p>
          </div>
        ) : (
          hotelsPerPage.map((hotel) => (
            <div key={hotel.id} className="w-3/4 mx-auto flex flex-wrap my-2 p-2 shadow-lg bg-white">
              <img src={hotel.imageUrl} alt={hotel.hotelName} className="w-52 object-cover" />
              <div className="flex-1">
                <h5 className="text-center italic font-bold  text-xl">{hotel.hotelName}</h5>
                <p className="px-10 font-medium">
                  <span className="font-medium">City: </span>
                  {hotel.city}
                </p>
                <p className="px-10">
                  <span className="font-medium">Amenities:</span> {hotel.amenities}
                </p>
                <p className="px-10">
                  <span className="font-medium">Address: </span>
                  {hotel.address}
                </p>
                <p className="px-10">
                  <span className="font-medium">Phone No: </span>
                  {hotel.phoneNo}
                </p>
              </div>
              <div className="flex flex-col gap-3 ">
                <Link to="/bookroom" state={hotel.hotelName}>
                  <button className='rounded-lg font-semibold text-slate-950 px-4 py-2  bg-amber-500 hover:bg-amber-400 '>Book Room</button>
                </Link>
                <Link to={"/moredetails/" + hotel.id}>
                  <button className='font-medium border border-slate-300  hover:bg-slate-50 text-slate-700 rounded-lg px-4 py-2 '>More details</button>
                </Link>
                <Link to={"/reviews/" + encodeURIComponent(hotel.hotelName)} state={{ id: hotel.id }}>
                  <button className='font-medium border border-slate-300  hover:bg-slate-50 text-slate-700 rounded-lg px-4 py-2 '>View Review</button>
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          totalLength={hoteldata.length}
          currentpage={currentpage}
          setCurrentpage={setCurrentPage}
          postsPerPage={postsPerPage}
        />
      )}
    </div>
  )
}

export default Hotels
