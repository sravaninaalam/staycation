
import { lazy, Suspense } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import { BG_IMG } from "./utils/consts";
import {createBrowserRouter,Outlet} from 'react-router-dom'
import { Provider } from "react-redux";
import store from "./redux/store";
import Addreviews from "./components/reviews/Addreviews";
import Login from "./components/Login";
import Register from "./components/Register";
import Bookings from "./components/Bookings";
import Bookroom from "./components/Bookroom";
import Reschedule from "./components/Reschedule";
import Signout from "./components/Signout";
import Shimmer from "./components/Shimmer";
const Hotels=lazy(()=>import('./components/Hotels'))
const Mainframe=lazy(()=>import('./components/moredetails/Mainframe'))
function App() {
  return (
    <Provider store={store}>
      <div>
        <Header/>
        <div className="fixed">
           <img src={BG_IMG} alt='background' className="w-screen h-screen object-cover"/>
        </div>
       <Outlet/>
      </div>
      </Provider>
  );
}



export const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<Register/>
  },
  {
    path:'/login',
    element:<Login/>
  },
  {path:'/logout',element:<Signout/>},
  {
    path:'/',
    element:<App/>,
    children:[
      {path:'/home',element:<Home/>},
      {  path:'/hotels', element:<Suspense fallback={<Shimmer/>}><Hotels/></Suspense> },
      {path:'/bookings',element:<Bookings/>},
      {path:'/reschedule',element:<Reschedule/>},
      {path:'/bookroom/:hotelName',element:<Bookroom/>},
      {path:'/reviews/:hotelName/:id',element:<Addreviews/>},
      {
        path:'/moredetails/:hotelId',
        element:<Suspense fallback={<div>Loading</div>}><Mainframe/></Suspense>
      }
    ]
  }
])




