import BookingForm from "../components/BookingForm";

function BookingPage({availableTimes, dispatchTimeSlot}) {
  return (
    <div>
      <BookingForm availableTimes={availableTimes} dispatchTimeSlot={dispatchTimeSlot} />
    </div>
  );
}

export default BookingPage;
