import "./BookingForm.css";
import { useState, useEffect } from "react";
import { fetchAPI } from "../BookingAPI";
import ConfirmedBooking from "./ConfirmedBooking";

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

function BookingForm({ mainState, dispatchUpdatingMainState, submitForm, isFormSubmited }) {
  // console.log(isFormSubmited)
  const [formData, setFormData] = useState({
    date: "",
    selectedTime: "",
    guests: "0",
    occasion: "",
  });

  // const [stateOfisFormSubmited, setStateOfisFormSubmited] = useState(false)

  const [isFormValid, setIsFormValid] = useState(false); // Track form validity
  const [isBookedSuccess, setisBookedSuccess] = useState(false);

  // // console.log(mainState);
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
    const availableTimesForTheSelectedDay = fetchAPI(selectedDate);
    // Dispatch with the selected date and available times
    dispatchUpdatingMainState({
      type: "UPDATE_SLOTS_SHOWN_IN_UI",
      payload: {
        selectedDate: selectedDate,
        availableTimesForTheSelectedDay: availableTimesForTheSelectedDay, // Pass available times directly to the reducer
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
    // console.log(typeof(event.target.value));
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
    let tableAvailability = false;
    mainState.tablesForTheWeek.forEach((table) => {
      if (
        (table.date === new Date(formData.date).toLocaleDateString("it-IT")) &&
        (table.hour === formData.selectedTime) &&
        (table.bookingStatus === false)
      ) {
        tableAvailability = true;
      }
    });
    const formSubmitionStatus = submitForm(formData);
    console.log('tableAvailability', tableAvailability);
    if (tableAvailability) {
      // const formSubmitionStatus = submitForm(formData);
      if (formSubmitionStatus) {
        dispatchUpdatingMainState({ type: "BOOK_A_TIME_SLOT", payload: {
          formData: {
            ...formData,
            date: new Date(formData.date)
          },
          tablesInUiForTheSelectedDayWithAvailabilities: mainState.tableInUiForTheSelectedDay
        }});
      }
      setisBookedSuccess(true);
      return;
    };
    setisBookedSuccess(false);
  };



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

  useEffect(() => {
    if ( isFormSubmited ) {
      setIsFormValid(false);
      setFormData({
        date: "",
        selectedTime: "",
        guests: "0",
        occasion: "",
      });
    }
  }, [isFormSubmited]);

  return (
    <div className="bookingform-container">
      <form onSubmit={bookATimeSlot} className="booking-form-style">
        <label htmlFor="res-date">Choose date</label>
        <input
          className="bookingform-input-field"
          type="date"
          value={formData.date}
          onChange={handleDateChange}
          name="res-date"
          id="res-date"
          required
        />

        <label htmlFor="res-time">Choose time</label>
        <select
          className="bookingform-input-field"
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
          className="bookingform-input-field"
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleGuestsChange}
          placeholder="0"
          min="1"
          max="10"
          id="guests"
          required
        />

        <label htmlFor="occasion">Occasion</label>
        <select
        className="bookingform-input-field"
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
      {isFormSubmited && <ConfirmedBooking confimedSuccess={isBookedSuccess} isFormSubmited={isFormSubmited}/>}
    </div>
  );
}

export default BookingForm;
