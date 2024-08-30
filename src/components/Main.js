import React, { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Menu from "../pages/Menu";
import OrderOnline from "../pages/OrderOnline";
import Login from "../pages/Login";
import BookingPage from "../pages/BookingPage";
import "./Main.css";

const tablesForToday = [
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

const initialMainState = {
  tablesForTheWeek: [...tablesForToday],
  tableInUiForTheSelectedDay: [...tablesForToday]
}

// Reducer function to update available times
const updateMainState = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES": {
      console.log("state", state);
      console.log("action", action);
      return {
        tablesForTheWeek: [...state.tablesForTheWeek],
        tableInUiForTheSelectedDay: state.tablesForTheWeek.filter(el => el.date === action.payload)
      }
      
      
    }

    default:
      return state;
  }
};

// Initial state for the mainState
const initializeMainState = () => {
  let initializedMainState = [];

  for (let i = 0; i < 7; i++) {

    for (let j = 0; j < 6; j++) {

      initializedMainState.push({
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

  console.log('initializedMainState', initializedMainState);
  return {
    tableInUiForTheSelectedDay: tablesForToday,
    tablesForTheWeek: initializedMainState
  }
  
};

function Main() {
  const [mainState, dispatchTimeSlot] = useReducer(
    updateMainState,
    initialMainState,
    initializeMainState
  );



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
      </Routes>
    </main>
  );
}

export default Main;
