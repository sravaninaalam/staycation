import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useLocation } from 'react-router-dom'
import { Hotel_API_CORS, Hotels_URL } from '../utils/constants'
const Addreview = () => {
  const location=useLocation()
  const{id}=location.state
  return (
    <>
    <ToastContainer theme='colored' position="top-right" limit={1}/>
    <Formik initialValues={{review:[],feedback:[],hotelId:id}}
    validationSchema={Yup.object({
      review:Yup.string().required("required")
    })}
    onSubmit={(values,onSubmitProps)=>{
      fetch("http://localhost:5000/view/2",{
        method:'POST',
        body:JSON.stringify({ reviews:values.review,}),
        headers:{
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(response => response.json())
       .then(data => console.log(data))
       .catch(error => console.error('Error:', error));
//       fetch(Hotel_API_CORS+values.hotelId, {
//          method: 'PATCH',
//          body: JSON.stringify({
//              reviews:values.review,
//          }),      
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },  
//       })
//       .then(response => response.json())
// .then(data => console.log(data))
// .catch(error => console.error('Error:', error));
//       toast.success("Thanks for your review")
//       onSubmitProps.resetForm()
     }
    

    }>

        <div className='w-2/5 shadow-lg bg-violet-300 mx-auto my-5 rounded-md relative'>
            <h5 className='text-center italic text-xl'>Your Review Means a Lot to Us</h5>
            <Form>
  
                 <Field as='textarea' name='review' className='w-96 mx-4 my-3  rounded-md p-2 h-28'></Field>
                <p className='text-red-400'><ErrorMessage name='review'></ErrorMessage></p>
                <button type='submit' className='rounded-md p-2 mx-3 mb-3 float-right bg-pink-500 font-bold text-white' >ADD Review</button>
            </Form>
        </div>
       
      </Formik>
    </>
  )
}

export default Addreview



