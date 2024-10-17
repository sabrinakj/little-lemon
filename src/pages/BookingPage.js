import BookingForm from "../components/BookingForm";
import BookingSlot from "../components/BookingSlot";
import "./BookingPage.css";
import resturantImg from "../assets/icons_assets/restaurant.jpg";


function BookingPage({ mainState, dispatchUpdatingMainState, submitForm }) {
  // console.log(mainState);
  return (
    <>
      <img className="booking-img" src={resturantImg} alt="resturant" />

      <div className="booking-page-form-container">
        <BookingForm
          mainState={mainState}
          dispatchUpdatingMainState={dispatchUpdatingMainState}
          submitForm={submitForm}
        />
        <BookingSlot mainState={mainState} />
      </div>
    </>
  );
}

export default BookingPage;
