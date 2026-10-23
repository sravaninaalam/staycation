import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
const Home = () => {
 const [city,setCity]=useState('')
  const[checkin,setCheckin]=useState('')
 const[checkout,setCheckout]=useState('')
  const[guests,setGuests]=useState(1)
  const navigate=useNavigate()

  function handleSearch(e) {
    e.preventDefault();

    if (checkin && checkout && checkout <= checkin) {
      alert("Check-out must be after check-in.");
      return;
    }

    const params = new URLSearchParams();

    if (city.trim()) params.set("city", city.trim());
    if (checkin) params.set("checkin", checkin);
    if (checkout) params.set("checkout", checkout);

    params.set("guests", String(guests));

    navigate(`/hotels?${params.toString()}`);
  }

  const today = new Date().toLocaleDateString("en-CA");

  return (

    <div className="mt-5 mx-5 p-2 text-white">
           <h1 className="font-serif text-4xl font-bold
             leading-tight sm:text-6xl lg:text-7xl">
             Find your perfect
             <span className="block text-amber-400">
               stay.
             </span>
           </h1>
            
              <p className="mt-5 max-w-lg text-base leading-7
             text-slate-100 sm:text-lg">
             Hotels you will love, places you will remember.
             Discover stays that make every journey special.
           </p>
          <Link
            to="/hotels"
            className="mt-7 inline-flex items-center gap-3
              rounded-lg bg-amber-400 px-6 py-3.5
              font-semibold text-slate-950 no-underline
               hover:bg-amber-300
              focus:outline-none"
          >
            Explore Hotels
            <span aria-hidden="true">→</span>
          </Link>
        
           <form
          onSubmit={handleSearch}
          className="mt-12 grid grid-cols-1 gap-3
            rounded-2xl bg-white p-4 shadow-2xl
            sm:grid-cols-2 sm:p-5
            lg:grid-cols-5 lg:items-end lg:gap-4"
        >
          <div>
            <label
              htmlFor="city"
              className="text-xs font-bold tracking-wide
                text-slate-600"
            >
              DESTINATION
            </label>

            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City or landmark"
              className="mt-2 w-full rounded-lg border
                border-slate-200 bg-slate-50 px-3 py-3
                text-sm text-slate-900 outline-none
                placeholder:text-slate-400
                focus:border-amber-500 focus:ring-2
                focus:ring-amber-100"
            />
          </div>

          <div>
            <label
              htmlFor="checkin"
              className="text-xs font-bold tracking-wide
                text-slate-600"
            >
              CHECK-IN
            </label>

            <input
              id="checkin"
              type="date"
              min={today}
              value={checkin}
              onChange={(e) => {
                setCheckin(e.target.value);

                if (
                  checkout &&
                  e.target.value &&
                  checkout <= e.target.value
                ) {
                  setCheckout("");
                }
              }}
              className="mt-2 w-full rounded-lg border
                border-slate-200 bg-slate-50 px-3 py-3
                text-sm text-slate-800 outline-none
                focus:border-amber-500"
            />
          </div>

          <div>
            <label
              htmlFor="checkout"
              className="text-xs font-bold tracking-wide
                text-slate-600"
            >
              CHECK-OUT
            </label>

            <input
              id="checkout"
              type="date"
              min={checkin || today}
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="mt-2 w-full rounded-lg border
                border-slate-200 bg-slate-50 px-3 py-3
                text-sm text-slate-800 outline-none
                focus:border-amber-500"
            />
          </div>

          <div>
            <label
              htmlFor="guests"
              className="text-xs font-bold tracking-wide
                text-slate-600"
            >
              GUESTS
            </label>

            <select
              id="guests"
              value={guests}
              onChange={(e) =>
                setGuests(Number(e.target.value))
              }
              className="mt-2 w-full rounded-lg border
                border-slate-200 bg-slate-50 px-3 py-3
                text-sm text-slate-800 outline-none
                focus:border-amber-500"
            >
              {[1, 2, 3, 4].map((count) => (
                <option key={count} value={count}>
                  {count} {count === 1 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-amber-400
              px-4 py-3.5 font-bold text-slate-950
              transition hover:bg-amber-300
              focus:outline-none focus:ring-2
              focus:ring-amber-500 focus:ring-offset-2"
          >
            Search Hotels →
          </button>
        </form>
         <p className="mt-4 text-sm text-white/80">
           ✦ Discover your next memorable stay
         </p>
    </div>
  )
}

export default Home



// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Home = () => {
//   const [city, setCity] = useState("");
//   const [checkin, setCheckin] = useState("");
//   const [checkout, setCheckout] = useState("");
//   const [guests, setGuests] = useState(1);

//   const navigate = useNavigate();


//   return (
//     <section
//       className="relative isolate min-h-[calc(100vh-80px)]
//       overflow-hidden rounded-2xl bg-slate-900
//       bg-cover bg-center bg-no-repeat
//       mx-3 mt-4 sm:mx-5"
//       style={{
//         backgroundImage:
//           "linear-gradient(90deg, rgba(5,15,30,0.82), rgba(5,15,30,0.12)), url('/hotel-hero.png')",
//       }}
//     >
//       <div className="mx-auto flex min-h-[calc(100vh-100px)]
//         max-w-7xl flex-col justify-center px-5 py-12
//         sm:px-8 lg:px-12">

//         {/* Hero content */}
//         <div className="max-w-2xl text-white">
//           <p className="mb-4 text-sm font-semibold uppercase
//             tracking-[0.25em] text-amber-300">
//             YOUR NEXT GETAWAY STARTS HERE
//           </p>

//           <h1 className="font-serif text-4xl font-bold
//             leading-tight sm:text-6xl lg:text-7xl">
//             Find your perfect
//             <span className="block text-amber-400">
//               stay.
//             </span>
//           </h1>

//           <p className="mt-5 max-w-lg text-base leading-7
//             text-slate-100 sm:text-lg">
//             Hotels you will love, places you will remember.
//             Discover stays that make every journey special.
//           </p>

//           <Link
//             to="/hotels"
//             className="mt-7 inline-flex items-center gap-3
//               rounded-lg bg-amber-400 px-6 py-3.5
//               font-semibold text-slate-950 no-underline
//               transition hover:bg-amber-300
//               focus:outline-none focus:ring-2
//               focus:ring-amber-200"
//           >
//             Explore Hotels
//             <span aria-hidden="true">→</span>
//           </Link>
//         </div>

//         {/* Hotel search form */}
     

//         <p className="mt-4 text-sm text-white/80">
//           ✦ Discover your next memorable stay
//         </p>
//       </div>
//     </section>
//   );
// };