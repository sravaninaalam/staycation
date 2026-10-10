import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import { BG_IMG } from "../utils/constants"
import { useAuth } from "../context/AuthContext"

const Signout = () => {
  const { logout } = useAuth()

  useEffect(() => {
    logout()
  }, [logout])

  return (
    <>
      <div className="bg-slate-950/90 h-15  p-2 ">
               <h3 className="p-2 mx-3 font-bold text-2xl text-white font-serif italic">🏠StayNest</h3>
           </div> 
  
            <div className="fixed inset-0 -z-10">
               <img src={BG_IMG} alt="" className="h-full w-full object-cover" />
               {/* dark overlay */}
                <div className='absolute inset-0 bg-black/40'></div>
           </div>

      <div className="my-5 p-5 text-center relative text-white">
        <h5 className="italic">Successfully signed out</h5>
        <p className="italic text-2xl">
          <Link to="/login" className="text-white">
            Sign in
          </Link>{" "}
          again?
        </p>
      </div>
    </>
  )
}

export default Signout
