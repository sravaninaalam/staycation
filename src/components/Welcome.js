import bgImg from '../../public/bgImg.jpg'
// import { BG_IMG } from '../utils/constants'
import { Link } from 'react-router-dom'
// this will appear on the screen for those who are new to website
function Welcome() {
  return (
    <>   
     <div className="bg-slate-950/90 h-15  p-2 ">
             <h3 className="p-2 mx-3 font-bold text-2xl text-white font-serif italic">🏠StayNest</h3>
         </div> 

          <div className="relative">
             <img src={bgImg} alt="" className="absolute inset-0 h-screen w-screen object-cover" />
              {/* dark overlay */}
         <div className='absolute inset-0 bg-black/40'></div>
         {/* content */}
         <div className='relative z-10 flex min-h-screen items-center'>
           <div className='max-w-2xl px-8 text-white'>
            <h1 className='text-5xl font-bold leading-tight font-serif'>Your next gateway <br/> is just Signup away</h1>
            <p className='mt-5 text-lg text-white/90'>Discover beautiful stays, amazing places and unforgettable experiences</p>
             <button className='rounded-lg mt-7 bg-amber-400 inline-flex items-center gap-3 px-6 py-3.5 font-semibold
              hover:bg-amber-300  text-slate-950 no-underline
              focus:outline-none"'>
              <Link to='/signup' className='no-underline text-white'>{'Get Started ->'}</Link></button>
        
          </div>
         </div>
         </div>
        
    </>
  )
}

export default Welcome
