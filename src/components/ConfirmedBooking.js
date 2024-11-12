import React, { useEffect, useState } from "react";
import "./ConfirmedBooking.css";

function ConfirmedBooking() {
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    const storedBookingData = localStorage.getItem("bookingData");
    if (storedBookingData) {
      setBookingData(JSON.parse(storedBookingData)); // Parse from JSON string to object
    }
  }, []);

  return (
    <div className="confirmed-page">
      <div className="confirmed-container">
        <h1 className="confirmed-title">Your booking has been confirmed!</h1>
        <p className="confirmed-p">
          Thank you for choosing Little Lemon. We look forward to seeing you!
        </p>

        {bookingData ? (
          <div>
            <h2 className="confirmed-h2">Booking Details:</h2>
            <p>Date: {bookingData.date}</p>
            <p>Time: {bookingData.selectedTime}</p>
            <p>Guests: {bookingData.guests}</p>
            <p>Occasion: {bookingData.occasion}</p>
          </div>
        ) : (
          <p>Loading booking details...</p>
        )}
      </div>

    </div>
  );
};

export default ConfirmedBooking;