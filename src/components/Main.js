import React, { useReducer, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Menu from "../pages/Menu";
import OrderOnline from "../pages/OrderOnline";
import Login from "../pages/Login";
import BookingPage from "../pages/BookingPage";
import ConfirmedBooking from "./ConfirmedBooking";
import "./Main.css";
import { type } from "@testing-library/user-event/dist/type";
import {fetchAPI} from "../BookingAPI";

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

// Reducer function to update the main state
export const updateMainState = (state, action) => {
  switch (action.type) {
    case "UPDATE_SLOTS_SHOWN_IN_UI":
      return {
        tablesForTheWeek: [...state.tablesForTheWeek],
        tableInUiForTheSelectedDay: action.payload.times
          ? action.payload.times.map(time => ({
              bookingStatus: false,
              date: action.payload.date,
              hour: time,
              guests: "0",
              occasion: "",
            }))
          : [], // Usa un array vuoto se `times` è undefined
      };

    case "BOOK_A_TIME_SLOT":
      console.log(action.payload);
      const updatedBookings = updateBookingStatus(
        state.tablesForTheWeek,
        action.payload
        // new Date(action.payload.date).toLocaleDateString('it-IT'),
        // action.payload.selectedTime
      );
      const updatedBookingsUi = updateBookingStatus(
        state.tableInUiForTheSelectedDay,
        action.payload
        // new Date(action.payload.date).toLocaleDateString('it-IT'),
        // action.payload.selectedTime
      );
      return {
        tableInUiForTheSelectedDay: updatedBookingsUi,
        tablesForTheWeek: updatedBookings,
      };

    // return initialMainState;
    default:
      return state;
  }
};

// Initial state for the mainState
export const initializeMainState = () => {
  let initializedMainState = [];

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 6; j++) {
      initializedMainState.push({
        bookingStatus: false,
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + i
        ).toLocaleDateString("it-IT"),
        hour: 17 + j + ":00",
        guests: "0",
        occasion: "",
      });
    }
  }

  console.log("initializedMainState", initializedMainState);
  console.log("initialMainState", initialMainState);
  console.log("initialMainState.tablesForTheWeek", initialMainState.tablesForTheWeek);

  return {
    tableInUiForTheSelectedDay: tablesForToday,
    tablesForTheWeek: initializedMainState,
  };
};

console.log(fetchAPI);

function Main() {
  const [mainState, dispatchTimeSlot] = useReducer(
    updateMainState,
    initialMainState,
    initializeMainState
  );

// useEffect per caricare gli orari al primo montaggio del componente
useEffect(() => {
  const today = new Date(); // Data di oggi
  const availableTimes = fetchAPI(today); // Chiama fetchAPI con la data di oggi

 // Aggiorna lo stato con gli orari disponibili
 dispatchTimeSlot({
  type: "UPDATE_SLOTS_SHOWN_IN_UI",
  payload: {
    date: today.toLocaleDateString("it-IT"), // Data in formato "it-IT"
    times: availableTimes,                   // Lista degli orari disponibili
  }
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
            />
          }
        />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/confermed-booking"
          element={<ConfirmedBooking mainState={mainState} />}
        />
      </Routes>
    </main>
  );
}

export default Main;
