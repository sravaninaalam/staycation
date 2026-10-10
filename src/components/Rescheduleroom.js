import { Formik, Form, ErrorMessage, Field } from "formik"
import * as Yup from "yup"
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import { apiFetch, startOfToday } from "../utils/api"
import { Bookings_URL } from "../utils/constants"

const Rescheduleroom = () => {
  const location = useLocation()
  const navigate = useNavigate()

  if (!location.state?.id) {
    return <Navigate to="/bookings" replace />
  }

  const { hotelName, noOfRooms, noOfPersons, typeOfRoom, id } = location.state

  return (
    <Formik
      initialValues={{
        startDate: "",
        endDate: "",
        noOfPersons,
        noOfRooms,
        typeOfRoom,
        hotelName,
      }}
      validationSchema={Yup.object({
        startDate: Yup.date()
          .min(startOfToday(), "Check-in should be today or later")
          .required("Required"),
        endDate: Yup.date()
          .required("Required")
          .test("is-greater", "Check-out must be after check-in", function (endDate) {
            const { startDate } = this.parent
            return startDate && endDate && new Date(endDate) > new Date(startDate)
          }),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await apiFetch(Bookings_URL + id, {
            method: "PUT",
            body: JSON.stringify(values),
          })
          toast.success("Reschedule successful")
          navigate("/bookings")
        } catch {
          toast.error("Could not reschedule. Please try again.")
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="bg-gray-300 w-2/3 md:w-96 mx-auto mt-5 rounded-md p-4 relative">
          <h5 className="font-serif text-2xl font-semibold text-center">Reschedule</h5>
          <p className="text-center text-red-500 font-medium">{hotelName}</p>
          <Form>
            <label htmlFor="startDate">Check in</label>
            <Field type="date" name="startDate" id="startDate" className="w-56 md:w-72 rounded-md p-1" />
            <p className="text-red-600">
              <ErrorMessage name="startDate" />
            </p>

            <label htmlFor="endDate">Check out</label>
            <Field type="date" name="endDate" id="endDate" className="w-56 md:w-72 rounded-md p-1 m-1" />
            <p className="text-red-600">
              <ErrorMessage name="endDate" />
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 p-1 w-56 md:w-72 bg-amber-500 hover:bg-amber-400 rounded-md disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Reschedule"}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default Rescheduleroom
