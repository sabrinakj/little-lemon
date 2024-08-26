import BookingForm from "../components/BookingForm";
import BookingSlot from "../components/BookingSlot";
import "./BookingPage.css";
import resturantImg from "../assets/icons_assets/restaurant.jpg";


function BookingPage({ availableTimes, dispatchTimeSlot }) {
  return (
    <>
      <img className="booking-img" src={resturantImg} alt="resturant" />

      <div className="booking-page-form-container">
        <BookingForm
          availableTimes={availableTimes}
          dispatchTimeSlot={dispatchTimeSlot}
        />
        <BookingSlot availableTimes={availableTimes} />
      </div>
    </>
  );
}

export default BookingPage;
