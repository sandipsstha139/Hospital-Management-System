import AppointmentForm from '../components/AppointmentForm' 
import Hero from '../components/Hero'

const Appointment = () => {
  return (
    <>
    <Hero title={"Schedule your appointment | HealthCare Medical Institute"} imageUrl="/signin.png" />
    <AppointmentForm />
    </>
  )
}
export default Appointment