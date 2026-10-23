
import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Header = () => {
  const { user } = useAuth()

  return (
    <header className="bg-slate-950/90 backdrop-blur-md sticky p-2 top-0 z-20 flex justify-between items-center">
      <h1 className="p-2 font-semibold text-2xl text-white font-serif italic tracking-wide">🏠StayNest</h1>
      <nav>
        <ul className="flex items-center gap-2">
          <li className="px-4 font-medium">
            <NavLink to="/home"   className={({ isActive }) =>
                                    isActive
                                      ? "text-amber-400 border-b-2 border-amber-400"
                                      : "text-white hover:text-amber-300"}>
              Home
            </NavLink>
          </li>
          <li className="px-4 font-medium">
            <NavLink to="/hotels"   className={({ isActive }) =>
                                        isActive
                                          ? "text-amber-400 border-b-2 border-amber-400"
                                          : "text-white hover:text-amber-300"}>
              Hotels
            </NavLink>
          </li>
          <li className="px-4 font-medium">
            <NavLink to="/bookings"   className={({ isActive }) =>
                                          isActive
                                            ? "text-amber-400 border-b-2 border-amber-400"
                                            : "text-white hover:text-amber-300" }>
              Bookings
            </NavLink>
          </li>
          {user?.name && (
            <li className="px-4 text-white text-sm hidden sm:block">Hi, {user.name}</li>
          )}
          <li className="px-4 font-medium">
            <NavLink to="/logout"   className={({ isActive }) =>
                                                isActive
                                                  ? "text-amber-400 border-b-2 border-amber-400"
                                                  : "text-white hover:text-amber-300"}>
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header


