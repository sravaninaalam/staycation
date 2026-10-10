import { Formik, Form, ErrorMessage, Field } from "formik"
import * as Yup from "yup"
import { BG_IMG, SignUp_IMG, Users_URL } from "../utils/constants"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { apiFetch } from "../utils/api"
import { useAuth } from "../context/AuthContext"

const Resgister = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/

  if (user) {
    return <Navigate to="/home" replace />
  }

  return (
    <>
      <div className="relative z-20 bg-slate-950/90 h-15 p-2 ">
             <h3 className="p-2 mx-3 font-bold text-2xl text-white font-serif italic">🏠StayNest</h3>
         </div> 

       
           <div className="fixed inset-0 -z-10">
               <img src={BG_IMG} alt="" className="h-full w-full object-cover" />
               {/* dark overlay */}
                <div className='absolute inset-0 bg-black/40'></div>
           </div>
         
        <div className='relative z-10 mx-auto grid w-[700px] grid-cols-[300px_400px] overflow-hidden
         rounded-2xl shadow-2xl mt-7'>
           <div className="relative">
              <img src={SignUp_IMG} alt='Beautiful stay' className="h-full object-cover"/>
              {/* dark overlay */}
                <div className='absolute inset-0 bg-black/50'></div>
                {/* content */}
                <div className="absolute bottom-20 left-7 z-10 text-white font-serif">
                  <h2 className="text-3xl font-bold leading-tight">Good stays<br/>create great memories</h2>
                  <p className="mt-3 text-sm text-white/90">Join StayNest and start your journey today</p>
                </div>
           </div>
            <Formik
              initialValues={{ name: "", address: "", phoneno: "", email: "", password: "" }}
              validationSchema={Yup.object({
                name: Yup.string().required("Name is required"),
                phoneno: Yup.string().matches(phoneRegex, "Invalid phone number").required("Phone number is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string()
                  .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$/,
                    "Must contain uppercase, lowercase, number and special character (8-16 chars)"
                  )
                  .required("Password is required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  const users = await apiFetch(Users_URL)
                  const alreadyExists = users.some(
                    (user) =>
                      user.email?.toLowerCase() === values.email.toLowerCase() ||
                      user.name?.toLowerCase() === values.name.toLowerCase()
                  )
                  if (alreadyExists) {
                    toast.error("An account with this name or email already exists")
                    return
                  }

                  await apiFetch(Users_URL, {
                    method: "POST",
                    body: JSON.stringify(values),
                  })
                  toast.success("Successfully registered")
                  navigate("/login")
                } catch {
                  toast.error("Registration failed. Please try again.")
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {({ isSubmitting }) => (
                <div className="w-80 p-2 bg-white">
                      <h2 className="font-serif text-xl font-bold text-center m-2">Create your account</h2>
                  <Form>
                    <label htmlFor="name">Full name</label>
                    <Field type="text" name="name" id="name" className="w-56 md:w-72 border border-black rounded-md p-1" />
                    <p className="text-red-500 mx-6">
                      <ErrorMessage name="name" />
                    </p>

                    <label htmlFor="address">Address</label>
                    <Field type="text" name="address" id="address" className="w-56 md:w-72 border border-black rounded-md p-1" />

                    <label htmlFor="phoneno">Phone number</label>
                    <Field type="tel" name="phoneno" id="phoneno" className="w-56 md:w-72 border border-black rounded-md p-1" />
                    <p className="text-red-500 mx-6">
                      <ErrorMessage name="phoneno" />
                    </p>

                    <label htmlFor="email">Email</label>
                    <Field type="email" name="email" id="email" className="w-56 md:w-72 border border-black rounded-md p-1" />
                    <p className="text-red-500 mx-6">
                      <ErrorMessage name="email" />
                    </p>

                    <label htmlFor="password">Password</label>
                    <Field type="password" name="password" id="password" className="w-56 md:w-72 border border-black rounded-md p-1" />
                    <p className="text-red-500 mx-6">
                      <ErrorMessage name="password" />
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="m-2 p-2 w-56 md:w-72 font-semibold bg-amber-500 hover:bg-amber-400 rounded-md disabled:opacity-60"
                    >
                      {isSubmitting ? "Registering..." : "Register"}
                    </button>
                  </Form>
                    <p className="ml-5 my-2">
                                       Already have an account ? 
                                       <Link className=" text-lg font-medium text-amber-600" to='/login'>
                                       Sign in</Link>
                                     </p>
                                 
                </div>
              )}
            </Formik>
          </div>
        
      
    </>
  )
}

export default Resgister
