import { Formik, Form, ErrorMessage, Field } from "formik"
import * as Yup from "yup"
import { toast } from "react-toastify"
import { Navigate, useNavigate, useLocation } from "react-router-dom"
import { apiFetch, startOfToday } from "../utils/api"
import { Bookings_URL } from "../utils/constants"

const Bookroom = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const hotelName = location.state

  if (!hotelName) {
    return <Navigate to="/hotels" replace />
  }

  return (
    <Formik
      initialValues={{
        startDate: "",
        endDate: "",
        noOfPersons: "",
        noOfRooms: "",
        typeOfRoom: "",
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
        noOfPersons: Yup.number()
          .required("Required")
          .max(5, "Cannot be greater than 5")
          .min(1, "At least one person is required"),
        noOfRooms: Yup.number()
          .required("Required")
          .max(3, "Cannot be greater than 3")
          .min(1, "At least one room is required")
          .test("is-lesser", "You have selected extra room", function (noOfRooms) {
            const { noOfPersons } = this.parent
            return noOfPersons && noOfRooms && Number(noOfPersons) >= Number(noOfRooms)
          }),
        typeOfRoom: Yup.string().required("Please select a room type"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await apiFetch(Bookings_URL, {
            method: "POST",
            body: JSON.stringify(values),
          })
          toast.success("Room booking was successful")
          navigate("/bookings")
        } catch {
          toast.error("Could not book the room. Please try again.")
        } finally {
          setSubmitting(false)
        }
      }}
    >
      {({ isSubmitting }) => (
        <div className="bg-gray-300 w-2/3 md:w-96 mx-auto mt-5 rounded-md p-4 relative">
          <h5 className="font-serif text-2xl font-semibold text-center">Book a Room</h5>
          <p className="text-center text-red-500 font-medium m-2">{hotelName}</p>
          <Form>
            <label htmlFor="startDate">Check in</label>
            <Field type="date" name="startDate" id="startDate" className="w-56 md:w-72 rounded-md p-1 m-1" />
            <p className="text-red-600">
              <ErrorMessage name="startDate" />
            </p>

            <label htmlFor="endDate">Check out</label>
            <Field type="date" name="endDate" id="endDate" className="w-56 md:w-72 rounded-md p-1 m-1" />
            <p className="text-red-600">
              <ErrorMessage name="endDate" />
            </p>           

            <label htmlFor="noOfPersons">No of persons</label>
            <Field type="number" name="noOfPersons" id="noOfPersons" className="w-56 md:w-72 rounded-md p-1" />
            <p className="text-red-600">
              <ErrorMessage name="noOfPersons" />
            </p>

          
            <label htmlFor="noOfRooms">No of rooms</label>
            <Field type="number" name="noOfRooms" id="noOfRooms" className="w-56 md:w-72 rounded-md p-1" />
            <p className="text-red-600">
              <ErrorMessage name="noOfRooms" />
            </p>

            <label htmlFor="typeOfRoom">Type of room</label>
            <Field name="typeOfRoom" id="typeOfRoom" as="select" className="w-56 md:w-72 rounded-md p-1">
              <option value="">--select room type--</option>
              <option value="AC">AC</option>
              <option value="Non AC">Non AC</option>
            </Field>
            <p className="text-red-600">
              <ErrorMessage name="typeOfRoom" />
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-4 p-1 w-56 md:w-72 bg-amber-500 hover:bg-amber-400 rounded-md disabled:opacity-60"
            >
              {isSubmitting ? "Booking..." : "Book"}
            </button>
          </Form>
        </div>
      )}
    </Formik>
  )
}

export default Bookroom
