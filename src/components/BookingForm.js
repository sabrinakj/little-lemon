import "./BookingForm.css";
import { useState, useEffect } from "react";
import { fetchAPI, submitAPI } from "../BookingAPI";

function BookingForm({ mainState, dispatchTimeSlot, submitForm }) {
  const [formData, setFormData] = useState({
    date: "",
    selectedTime: "",
    guests: "",
    occasion: "",
  });

  const [isFormValid, setIsFormValid] = useState(false); // Track form validity

  const handleDateChange = (event) => {
    let selectedDate = new Date();
    if (event.target.value) {
      selectedDate = new Date(event.target.value);
    }
    setFormData({
      ...formData,
      date: event.target.value,
    });
    // Fetch available times using the raw Date object
    const availableTimes = fetchAPI(selectedDate);
    // Dispatch with the selected date and available times
    dispatchTimeSlot({
      type: "UPDATE_SLOTS_SHOWN_IN_UI",
      payload: {
        date: selectedDate.toLocaleDateString("it-IT"),
        times: availableTimes, // Pass available times directly to the reducer
      },
    });
  };

  const handleTimeChange = (event) => {
    setFormData({
      ...formData,
      selectedTime: event.target.value,
    });
  };

  const handleGuestsChange = (event) => {
    setFormData({
      ...formData,
      guests: event.target.value,
    });
  };

  const handleOccasionChange = (event) => {
    setFormData({
      ...formData,
      occasion: event.target.value,
    });
  };

  const bookATimeSlot = (event) => {
    event.preventDefault();
    // Chiama la funzione submitForm passando i dati del form
    submitForm(formData);
    dispatchTimeSlot({ type: "BOOK_A_TIME_SLOT", payload: formData });
  };

// useEffect for any initial API calls
useEffect(() => {
  if (!formData.date) {
    const today = new Date();
    const availableTimes = fetchAPI(today);
    dispatchTimeSlot({
      type: "UPDATE_SLOTS_SHOWN_IN_UI",
      payload: {
        date: today.toLocaleDateString("it-IT"),
        times: availableTimes,
      },
    });
  }
}, [dispatchTimeSlot, formData.date]); // Run only if no date is selected

  // Check form validity on every formData change
  useEffect(() => {
    if (
      formData.date &&
      formData.selectedTime &&
      formData.guests > 0 &&
      formData.occasion
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

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
          {/* Usa gli orari disponibili dallo stato */}
          {mainState.tableInUiForTheSelectedDay &&
          mainState.tableInUiForTheSelectedDay.length > 0 ? (
            mainState.tableInUiForTheSelectedDay.map((tableHour) => (
              <option key={tableHour.hour} value={tableHour.hour}>
                {tableHour.hour}
              </option>
            ))
          ) : (
            <option value="">No available times</option>
          )}
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

        <input
          className="booking-form-submit"
          type="submit"
          value="Make Your reservation"
          disabled={!isFormValid} // Disable submit button if form is invalid
          aria-label="On Click Submit the form"
        />
      </form>
    </div>
  );
}

export default BookingForm;
