import React, { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Menu from "../pages/Menu";
import OrderOnline from "../pages/OrderOnline";
import Login from "../pages/Login";
import BookingPage from "../pages/BookingPage";
import "./Main.css";

const dayStandard = [
  {
    bookingStatus: false,
    date: new Date(),
    hour: "17:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date(),
    hour: "18:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date(),
    hour: "19:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date(),
    hour: "20:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date(),
    hour: "21:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: false,
    date: new Date(),
    hour: "22:00",
    guests: "0",
    occasion: "birthday",
  },
];

const mainState = {
  tablesForTheWeek: [...dayStandard],
  tableInUiForTheSelectedDay: [...dayStandard]
}

// Reducer function to update available times
const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES": {
      console.log("state", state);
      console.log("action", action);
      return state.tablesForTheWeek.filter(el => el.date === action.payload);
    }

    default:
      return state;
  }
};

// Initial state for the availableTimes
const initializeMainState = () => {
  let currentInitialBookingState = [];

  for (let i = 0; i < 7; i++) {

    for (let j = 0; j < 6; j++) {

      currentInitialBookingState.push({
        bookingStatus: false,
        date: new Date(
          (new Date()).getFullYear(),
          (new Date()).getMonth(),
          (new Date()).getDate() + i
        ).toLocaleDateString('it-IT'),
        hour: 17 + j + ":00",
        guests: "0",
        occasion: ""
      })
    }
  }

  console.log('currentInitialBookingState', currentInitialBookingState);
  return {
    ...mainState.tableInUiForTheSelectedDay,
    tablesForTheWeek: currentInitialBookingState
  }
  
};

function Main() {
  const [availableTimes, dispatchTimeSlot] = useReducer(
    updateTimes,
    mainState,
    initializeMainState
  );



  console.table(availableTimes);
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
              availableTimes={availableTimes.tablesForTheWeek}
              dispatchTimeSlot={dispatchTimeSlot}
            />
          }
        />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default Main;
