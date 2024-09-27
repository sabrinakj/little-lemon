import "./BookingForm.css";
import { useState, useEffect } from "react";
import { fetchAPI, submitAPI } from "../BookingAPI";

function BookingForm({ mainState, dispatchTimeSlot, submitForm }) {
  console.table(mainState);

  const [formData, setFormData] = useState({
    date: "",
    selectedTime: "",
    guests: "",
    occasion: "",
  });

  const handleDateChange = (event) => {
    let selectedDate = new Date().toLocaleDateString("it-IT");

    if (event.target.value) {
      selectedDate = new Date(event.target.value).toLocaleDateString("it-IT");
    }
    setFormData({
      ...formData,
      date: event.target.value,
    });

    dispatchTimeSlot({
      type: "UPDATE_SLOTS_SHOWN_IN_UI",
      payload: selectedDate,
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

  // useEffect per aggiornare gli orari disponibili quando la data cambia
  useEffect(() => {
    if (formData.date) {
      const selectedDate = new Date(formData.date);
      const availableTimes = fetchAPI(selectedDate); // Chiama fetchAPI per ottenere gli orari disponibili

      // Aggiorna lo stato con gli orari disponibili
      dispatchTimeSlot({
        type: "UPDATE_SLOTS_SHOWN_IN_UI",
        payload: {
          date: selectedDate.toLocaleDateString("it-IT"),
          times: availableTimes,
        },
      });
    }
  }, [formData.date, dispatchTimeSlot]);

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
        />
      </form>
    </div>
  );
}

export default BookingForm;
