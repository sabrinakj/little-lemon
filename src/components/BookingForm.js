import "./BookingForm.css";
import { useState } from "react";

function BookingForm({ mainState, dispatchTimeSlot }) {
  console.table(mainState);
  // const [date, setDate] = useState("");
  // const [selectedTime, SetSelectedTime] = useState("");
  // const [guests, SetGuests] = useState("");
  // const [occasion, setOccasion] = useState("");
  const [formData, setFormData] = useState({
    date: '',
    selectedTime: '',
    guests: '',
    occasion: ''
  });


  const genericTimeSlots = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

  const handleDateChange = (event) => {
    let selectedDate = new Date().toLocaleDateString('it-IT');
    
    if (event.target.value) {
      selectedDate = new Date(event.target.value).toLocaleDateString('it-IT');
    } 
    // setDate(e.target.value);
    setFormData({
      ...formData,
      date: event.target.value
    });

    dispatchTimeSlot({ type: "UPDATE_SLOTS_SHOWN_IN_UI", payload: selectedDate });
  };

  const handleTimeChange = (event) => {
    setFormData({
      ...formData,
      selectedTime: event.target.value
    });
  };

  const handleGuestsChange = (event) => {
    setFormData({
      ...formData,
      guests: event.target.value
    });
  };

  const handleOccasionChange = (event) => {
    setFormData({
      ...formData,
      occasion: event.target.value
    });
  };


  const bookATimeSlot = (event) => {
    event.preventDefault();
    dispatchTimeSlot({ type: "BOOK_A_TIME_SLOT", payload: formData });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log({ date, guests, occasion, selectedTime });
  // };

  return (
    <div>
      <form onSubmit={bookATimeSlot} className="booking-form-style">
        <label htmlFor="res-date">Choose date</label>
        <input
          type="date"
          value={formData.date}
          onChange={handleDateChange}
          name="res-date"
          id="res-date"
          required
        />

        <label htmlFor="res-time">Choose time</label>
        <select
          name="res-time"
          id="res-time"
          value={formData.selectedTime}
          onChange={handleTimeChange}
          required
        >
          {genericTimeSlots.map((tableHour) => (
            <option key={tableHour} value={tableHour}>
              {tableHour}
            </option>
          ))}
        </select>

        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleGuestsChange}
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
          value={formData.occasion}
          onChange={handleOccasionChange}
          required
        >
          <option value="">Select an Option</option>
          <option>Birthday</option>
          <option>Anniversary</option>
        </select>

        <input className="booking-form-submit" type="submit" value="Make Your reservation" />
      </form>
    </div>
  );
}

export default BookingForm;
