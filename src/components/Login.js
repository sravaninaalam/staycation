

import { BG_IMG, SignUp_IMG, Users_URL } from "../utils/constants"
import * as Yup from "yup"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { toast } from "react-toastify"
import { apiFetch } from "../utils/api"
import { useAuth } from "../context/AuthContext"


function Login() {
    const navigate = useNavigate()
  const location = useLocation()
  const { login, user } = useAuth()
  
  const redirectTo = location.state?.from || "/home";
if (user) {
  return <Navigate to={redirectTo} replace />;
}

  return (
    <>
   
<div className="relative min-h-screen overflow-hidden">
  {/* Background */}
  <div className="fixed inset-0 z-0">
    <img
      src={BG_IMG}
      alt=""
      className=" h-full w-full object-cover"
    />
    <div className="absolute inset-0 bg-black/40" />
  </div>

  {/* Header */}
  <header className="relative z-10 bg-slate-950/90 p-2">
    <h3 className="mx-3 p-2 font-serif text-2xl font-bold italic text-white">
      🏠StayNest
    </h3>
  </header>

  {/* Login card */}
  <div className="relative z-10 mx-auto mt-10 grid w-[min(700px,95%)] grid-cols-1 overflow-hidden rounded-2xl shadow-2xl md:grid-cols-[300px_minmax(0,400px)]">

    {/* Side image */}
    <div className="relative hidden min-h-[450px] overflow-hidden md:block">
      <img
        src={SignUp_IMG}
        alt="Beautiful stay"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="absolute top-24 left-7 z-10 text-white">
        <h2 className="font-serif text-3xl font-bold leading-tight">
          Welcome back!
        </h2>
        <p className="mt-3 font-semibold">
          Your next stay is just a few clicks away.
          Sign in to continue your journey with StayNest.
        </p>
      </div>
    </div>

    {/* Keep your existing Formik component here */}
     <Formik
              initialValues={{ name: "", password: "" }}
              validationSchema={Yup.object({
                name: Yup.string().required("Username is required"),
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
                  const matched = users.find(
                    (user) =>
                      user.name?.toLowerCase() === values.name.toLowerCase() &&
                      user.password === values.password
                  )
                  if (matched) {
                        login(matched);
                        toast.success("Login successful!");
                        navigate(redirectTo, { replace: true });
                      } 
                  else {
                    toast.error("Enter valid credentials")
                  }
                } catch {
                  toast.error("Unable to login right now. Please try again.")
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {({ isSubmitting }) => (
                <div className="w-80 p-2 bg-white">
                  <h2 className="font-serif text-xl font-bold text-center m-2">Login to your account</h2>
                  <Form>
                    <label htmlFor="name">Username:</label>
                    <Field
                      id="name"
                      type="text"
                      name="name"
                      className="w-56 md:w-72 border border-black rounded-md p-1 m-3"
                    />
                    <div className="text-red-500">
                      <ErrorMessage name="name" />
                    </div>

                    <label htmlFor="password">Password:</label>
                    <Field
                      id="password"
                      type="password"
                      name="password"
                      className="w-56 md:w-72 border border-black rounded-md p-1 m-2"
                    />
                    <div className="text-red-500">
                      <ErrorMessage name="password" />
                    </div>

                 
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mx-2 mt-6 p-1 w-56 md:w-72 bg-amber-500 hover:bg-amber-400 font-semibold rounded-md disabled:opacity-60"
                    >
                      {isSubmitting ? "Logging in..." : "Login"}
                    </button>
                  </Form>
                 
                    <p className="ml-5 mt-5">
                     Dont have an account ? 
                      <Link className=" text-lg font-medium text-amber-600" to='/signup'>
                      Sign in</Link>
                    </p>
                
                
                </div>
              )}
            </Formik>
  </div>
</div>
    </>
  )
}

export default Login
