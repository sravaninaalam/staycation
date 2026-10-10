import React, { lazy, Suspense } from "react"
import ReactDOM from "react-dom/client"
import Resgister from "./components/Resgister"
import { BG_IMG } from "./utils/constants"
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Header from "./components/Header"
import Signout from "./components/Signout"
import Bookings from "./components/Bookings"
import Hotels from "./components/Hotels"
import Bookroom from "./components/Bookroom"
import Rescheduleroom from "./components/Rescheduleroom"
import { Provider } from "react-redux"
import store from "./redux/store"
import Addreviews from "./components/reviews/Addreviews"
import { ToastContainer } from "react-toastify"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Welcome from "./components/Welcome"

const Mainframe = lazy(() => import("./components/moredetails/Mainframe"))

const App = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="fixed inset-0 -z-10">
        <img src={BG_IMG} alt="" className="h-screen w-screen object-cover" />
      </div>
      <Outlet />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<Welcome/>,
  },
  {
    path: "/signup",
    element: <Resgister />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Signout />,
  },
  {
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { path: "/home", element: <Home /> },
      { path: "/hotels", element: <Hotels /> },
      { path: "/bookings", element: <Bookings /> },
      { path: "/bookroom", element: <Bookroom /> },
      { path: "/reschedule", element: <Rescheduleroom /> },
      { path: "/reviews/:hotelName", element: <Addreviews /> },
      {
        path: "/moredetails/:hotelId",
        element: (
          <Suspense fallback={<div className="relative p-10 text-center text-white">Loading hotel details...</div>}>
            <Mainframe />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="p-10 text-center">
        <h2>Page not found</h2>
        <a href="/home">Go home</a>
      </div>
    ),
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <Provider store={store}>
    <AuthProvider>
      <ToastContainer theme="colored" position="top-right" limit={1} />
      <RouterProvider router={appRouter} />
    </AuthProvider>
  </Provider>
)
