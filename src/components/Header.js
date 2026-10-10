
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="bg-slate-950/90 backdrop-blur-md sticky p-2 top-0 z-20 flex justify-between items-center">
      <h1 className="p-2 font-semibold text-2xl text-white font-serif italic tracking-wide">🏠StayNest</h1>
      <nav>
        <ul className="flex items-center gap-2">
          <li className="px-4 font-medium">
            <Link to="/home" className="no-underline text-white">
              Home
            </Link>
          </li>
          <li className="px-4 font-medium">
            <Link to="/hotels" className="no-underline text-white ">
              Hotels
            </Link>
          </li>
          <li className="px-4 font-medium">
            <Link to="/bookings" className="no-underline text-white ">
              Bookings
            </Link>
          </li>
          {user?.name && (
            <li className="px-4 text-white text-sm hidden sm:block">Hi, {user.name}</li>
          )}
          <li className="px-4 font-medium">
            <Link to="/logout" className="no-underline text-white ">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header


