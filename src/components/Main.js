import React, { useReducer } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Menu from "../pages/Menu";
import OrderOnline from "../pages/OrderOnline";
import Login from "../pages/Login";
import BookingPage from "../pages/BookingPage";
import "./Main.css";

// Reducer function to update available times
const updateTimes = (state, action) => {
  switch (action.type) {
    case "UPDATE_TIMES": {
      console.log('state', state);
      console.log('action', action);
      // For now, returning the same times regardless of the date
      return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    }

    default:
      return state;
  }
};

// Initial state for the availableTimes
const initializeTimes = () => {
  return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
};

function Main() {
const [availableTimes, dispatchTimeSlot] = useReducer(updateTimes, [], initializeTimes);

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservation" element={<BookingPage availableTimes={availableTimes} dispatchTimeSlot={dispatchTimeSlot}/>} />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </main>
  );
}

export default Main;
