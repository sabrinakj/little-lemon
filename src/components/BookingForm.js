import "./BookingForm.css";
import { useState, useEffect } from "react";
import { fetchAPI } from "../BookingAPI";

// using the functions definitions below (remoteFunctionFetchAPI) was the reccomended way 
// indicated by the coursera meta fe course capstone project,
// but due to security reasons (net::ERR_BLOCKED_BY_ORB) the react application is not able to 
// load this remote  JavaScript code (see comments in index.html) - and even I proxy the request via the proxy property in package.json
// then I will have an error because the indicated url https://raw.githubusercontent.com/courseraap/capstone/main/api.js
// is providing an http response which has as content type "text/plain" instead of "application/javascript" or "text/javascript"
// and therefore the browser is not executing such external javascript code and as a consequence it could not be available
// via the window object in the react components
// therefore as a workaroud i have copied the JS code from that URL and put it inside the file src/BookingAPI.js
// 
// const remoteFunctionFetchAPI = window.fetchAPI;

function BookingForm({ mainState, dispatchTimeSlot, submitForm }) {
  const [formData, setFormData] = useState({
    date: "",
    selectedTime: "",
    guests: "",
    occasion: "",
  });

  const [isFormValid, setIsFormValid] = useState(false); // Track form validity

  // console.log(mainState);
  
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
  // useEffect(() => {
  //   if (!formData.date) {
  //     const today = new Date();
  //     const availableTimes = fetchAPI(today);
  //     dispatchTimeSlot({
  //       type: "UPDATE_SLOTS_SHOWN_IN_UI",
  //       payload: {
  //         date: today.toLocaleDateString("it-IT"),
  //         times: availableTimes,
  //       },
  //     });
  //   }
  // }, [dispatchTimeSlot, formData.date]); // Run only if no date is selected

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

        <button
          className="booking-form-submit"
          type="submit"
          disabled={!isFormValid} // Disable submit button if form is invalid
          aria-label="On Click Submit the form"
        >
          Make Your reservation
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
