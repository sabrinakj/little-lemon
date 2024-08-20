import "./BookingForm.css";
import resturantImg from "../assets/icons_assets/restaurant.jpg";
import { useState } from "react";

function BookingForm(props) {
  // Define a state variable for each field in the form
  const [date, setdate] = useState("");
  const [selectedTime, SetSelectedTime] = useState("");
  const [guests, SetGuests] = useState("");
  const [occasion, setOccasion] = useState("");

  // create a stateful array in the component named availableTimes and use this state variable to populate the time select field options
  const [availableTimes] = useState([
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ]);

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
          onChange={(e) => setdate(e.target.value)}
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
