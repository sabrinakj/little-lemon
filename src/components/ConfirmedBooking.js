import React, { useEffect, useState } from "react";
import "./ConfirmedBooking.css";

function ConfirmedBooking({ confimedSuccess, isFormSubmited}) {
  const [bookingData, setBookingData] = useState(null);
  const successClass = confimedSuccess ? "class-display" : "class-display-none";
  const failureClass = !confimedSuccess ? "class-display" : "class-display-none";


  useEffect(() => {
    const storedBookingData = localStorage.getItem("bookingData");
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData)); // Parse from JSON string to object
    }
  }, []);

    useEffect(() => {
    // When modal opens, disable scrolling
    if (isFormSubmited) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    // Cleanup: Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [isFormSubmited]);

  if (!isFormSubmited) {
    return null;
  }


  return (
    <div className="confirmed-page">
      <div className="confirmed-container">
        <h1 className={successClass}>Your booking <br/> has been confirmed!</h1>
        <h1 className={failureClass}>Sorry, <br/> your booking request was denied.</h1>

        <p className={successClass}>
          Thank you for choosing Little Lemon. We look forward to seeing you!
        </p>

        {bookingData ? (
          <div>
            <h2 className="confirmed-h2">Booking Details:</h2>
            <p>Date: {bookingData.date}</p>
            <p>Time: {bookingData.selectedTime}</p>
            <p className={successClass}>Guests: {bookingData.guests}</p>
            <p className={successClass}>Occasion: {bookingData.occasion}</p>
            <h3 className={failureClass}>
              <strong>
                The booking slot with the details above is not available.
              </strong>
            </h3>
          </div>
        ) : (
          <p>Loading booking details...</p>
        )}
      </div>

    </div>
  );
};

export default ConfirmedBooking;