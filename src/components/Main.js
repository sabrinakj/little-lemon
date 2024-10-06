import React, { useReducer, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Menu from "../pages/Menu";
import OrderOnline from "../pages/OrderOnline";
import Login from "../pages/Login";
import BookingPage from "../pages/BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";
import "./Main.css";
import { fetchAPI, submitAPI } from "../BookingAPI";

// using the two functions definitions below (remoteFunctionFetchAPI and remoteFuctionSubmitAPI) was the reccomended way 
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
// const remoteFuctionSubmitAPI = window.submitAPI;

const tablesForToday = [
  {
    bookingStatus: false,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "17:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "18:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "19:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "20:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "21:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "22:00",
    guests: "0",
    occasion: "birthday",
  },
];

const initialMainState = {
  tablesForTheWeek: [...tablesForToday],
  tableInUiForTheSelectedDay: [...tablesForToday] || [],
};

const updateBookingStatus = (tablesForTheWeek, actionPayload) => {
  const actionPayloadDate = new Date(actionPayload.date).toLocaleDateString(
    "it-IT"
  );

  return tablesForTheWeek.map((booking) => {
    if (
      booking.date === actionPayloadDate &&
      booking.hour === actionPayload.selectedTime
    ) {
      return {
        ...booking,
        bookingStatus: true,
        guests: actionPayload.guests,
        occasion: actionPayload.occasion,
      };
    }
    return booking;
  });
};

// Reducer function to update the main state - per far funzionare il secondo test
export const updateMainState = (state, action) => {

  switch (action.type) {
    case "UPDATE_SLOTS_SHOWN_IN_UI":
      const availableTimes = fetchAPI(new Date(action.payload.date)); // Call remoteFunctionFetchAPI
      return {
        tablesForTheWeek: [...state.tablesForTheWeek],
        tableInUiForTheSelectedDay: availableTimes.map((time) => ({
          bookingStatus: false,
          date: action.payload.date,
          hour: time,
          guests: "0",
          occasion: "",
        })),
      };

    case "BOOK_A_TIME_SLOT":
      console.log(action.payload);
      const updatedBookings = updateBookingStatus(
        state.tablesForTheWeek,
        action.payload
      );
      const updatedBookingsUi = updateBookingStatus(
        state.tableInUiForTheSelectedDay,
        action.payload
      );
      return {
        tableInUiForTheSelectedDay: updatedBookingsUi,
        tablesForTheWeek: updatedBookings,
      };
    default:
      return state;
  }
  
};


// Initial state for the mainState
export const initializeMainState = () => {

  const today = new Date(); // Get today's date
  const availableTimes = fetchAPI(today); // Fetch available times for today
  console.log(availableTimes);
  let initializedMainState = [];

  console.log("initializedMainState", initializedMainState);
  console.log("initialMainState", initialMainState);
  console.log("initialMainState.tablesForTheWeek", initialMainState.tablesForTheWeek);

  return {
    tableInUiForTheSelectedDay: availableTimes || [], // Use available times from remoteFunctionFetchAPI
    tablesForTheWeek: initializedMainState,
  };
  
};

function Main() {
  console.log(window)
  const navigate = useNavigate();

  const [mainState, dispatchTimeSlot] = useReducer(
    updateMainState,
    initialMainState,
    initializeMainState
  );

  const submitForm = (formData) => {
  
    // Save booking data in Local Storage
    localStorage.setItem("bookingData", JSON.stringify(formData));
    const isSubmitted = submitAPI(formData);
    if (isSubmitted) {
      navigate("/confirmed-booking");
    } else {
      alert("There was an error submitting your booking. Please try again.");
    }
    
  };

  // useEffect per caricare gli orari al primo montaggio del componente
  useEffect(() => {
  
    const today = new Date(); // Data di oggi
    const availableTimes = fetchAPI(today); // Chiama remoteFunctionFetchAPI con la data di oggi

    // Aggiorna lo stato con gli orari disponibili
    dispatchTimeSlot({
      type: "UPDATE_SLOTS_SHOWN_IN_UI",
      payload: {
        date: today.toLocaleDateString("it-IT"), // Data in formato "it-IT"
        times: availableTimes, // Lista degli orari disponibili
      },
    });
    
  }, []); // L'array vuoto assicura che l'effetto venga eseguito solo al montaggio

  console.table(mainState);
  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route
          path="/reservation"
          element={
            <BookingPage
              mainState={mainState}
              dispatchTimeSlot={dispatchTimeSlot}
              submitForm={submitForm}
            />
          }
        />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
        <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
}

export default Main;
