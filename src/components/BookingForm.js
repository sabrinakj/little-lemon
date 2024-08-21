import "./BookingForm.css";
import resturantImg from "../assets/icons_assets/restaurant.jpg";
import { useState } from "react";

function BookingForm({ availableTimes, dispatchTimeSlot }) {
  const [date, setDate] = useState("");
  const [selectedTime, SetSelectedTime] = useState("");
  const [guests, SetGuests] = useState("");
  const [occasion, setOccasion] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
    dispatchTimeSlot({ type: "UPDATE_TIMES", payload: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ date, guests, occasion, selectedTime });
  };

  return (
    <div>
      <img className="booking-img" src={resturantImg} alt="resturant" />
      <form onSubmit={handleSubmit} className="booking-form-style">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          name="res-date"
          id="res-date"
          required
        />

        <label htmlFor="res-time">Choose time</label>
        <select
          name="res-time"
          id="res-time"
          value={selectedTime}
          onChange={(e) => SetSelectedTime(e.target.value)}
          required
        >
          {availableTimes.map((availableTime) => (
            <option key={availableTime} value={availableTime}>
              {availableTime}
            </option>
          ))}
        </select>

        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          name="guests"
          value={guests}
          onChange={(e) => SetGuests(e.target.value)}
          placeholder="1"
          min="1"
          max="10"
          id="guests"
          required
        />

        <label htmlFor="occasion">Occasion</label>
        <select
          name="occasion"
          id="occasion"
          value={occasion}
          onChange={(e) => setOccasion(e.target.value)}
          required
        >
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>

        <input type="submit" value="Make Your reservation" />
      </form>
    </div>
  );
}

export default BookingForm;
