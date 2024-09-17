import React from "react";
import "./ConfirmedBooking.css";

const ConfirmedBooking = (mainState) => {
  return (
    <div className="confirmed-page">
      <div className="confirmed-container">
        <h1 className="confirmed-title">Your booking has been confirmed!</h1>
        <p className="confirmed-p">
          Thank you for choosing Little Lemon. We look forward to seeing you!
        </p>
      </div>
    </div>
  );
};

export default ConfirmedBooking;
