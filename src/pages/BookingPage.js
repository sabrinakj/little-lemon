import BookingForm from "../components/BookingForm";
import BookingSlot from "../components/BookingSlot";
import "./BookingPage.css";
import resturantImg from "../assets/icons_assets/restaurant.jpg";


function BookingPage({ mainState, dispatchUpdatingMainState, submitForm, isFormSubmited }) {
  // console.log(isFormSubmited);
  return (
    <>
      <img className="booking-img" src={resturantImg} alt="resturant" />

      <div className="booking-page-form-container">
        <div className="booking-page-form">
          <BookingForm
            mainState={mainState}
            dispatchUpdatingMainState={dispatchUpdatingMainState}
            submitForm={submitForm}
            isFormSubmited={isFormSubmited}
          />
        </div>
        <div className="booking-page-timeslot">
          <BookingSlot mainState={mainState} />
        </div>
      </div>
    </>
  );
}

export default BookingPage;
