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
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "17:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "17:30",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "18:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "18:30",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "19:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "19:30",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "20:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "20:30",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "21:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "21:30",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "22:0",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "22:30",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "23:00",
    guests: "0",
    occasion: "birthday",
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "23:30",
    guests: "0",
    occasion: "birthday",
  },
];

const initialMainState = {
  tablesForTheWeek: [...tablesForToday],
  tableInUiForTheSelectedDay: [...tablesForToday],
};

// (initialMainState.tablesForTheWeek, {availableTimesForSelectedDay, SelectedDate})
const updateBookingStatus = (tablesForTheWeek, reservedTablesDetails) => {
  const availableTimesForSelectedDay = fetchAPI(reservedTablesDetails.date);
  console.log(availableTimesForSelectedDay);
  const tablesWithAvailabilities = tablesForTheWeek.map((table) => {
    if (
      table.date === reservedTablesDetails.date.toLocaleDateString("it-IT") &&
      availableTimesForSelectedDay.some((item) => item.includes(table.hour))
    ) {
      return {
        ...table,
        bookingStatus: false,
      };
    } else {
      return table;
    }
  });
  return tablesWithAvailabilities;
};

// Reducer function to update the main state - per far funzionare il secondo test
export const updateMainState = (state, action) => {
  switch (action.type) {
    case "UPDATE_SLOTS_SHOWN_IN_UI": {
      // console.log("state", state);
      // console.log("action", action);
      // console.log(new Date (action.payload.selectedDate));
      // const availableTimesForSelectedDay = fetchAPI(action.payload.selectedDate);
      // console.log(availableTimesForSelectedDay);
      // console.log(action.payload);

      const tablesInUiForTheSelectedDay = state.tablesForTheWeek.filter(
        (el) => el.date === action.payload.selectedDate.toLocaleDateString("it-IT")
      );
      console.log(tablesInUiForTheSelectedDay)
      console.log(action.payload.selectedDate);
      const tablesInUiForTheSelectedDayWithAvailabilities = 
        updateBookingStatus(tablesInUiForTheSelectedDay,  { date: action.payload.selectedDate } );





      return {
        tablesForTheWeek: [...state.tablesForTheWeek],
        tableInUiForTheSelectedDay: tablesInUiForTheSelectedDayWithAvailabilities
      };
    }

    case "BOOK_A_TIME_SLOT":
      // console.log(action.payload);
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
  let initializedTableForTheWeek = [];
  for (let i = 0; i < 7; i++) {
    let hour = 17;
    let minute = 0;
    for (let j = 0; j < 14; j++) {
      let timeString =
        hour.toString().padStart(2, "0") +
        ":" +
        minute.toString().padStart(2, "0");
      initializedTableForTheWeek.push({
        bookingStatus: true,
        date: new Date(
          new Date().getFullYear(),
          new Date().getMonth(),
          new Date().getDate() + i
        ).toLocaleDateString("it-IT"),
        hour: timeString,
        guests: "0",
        occasion: "",
      });
      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour += 1;
      }
    }
  }

  const tablesForTheWeekWithAvailabilities = updateBookingStatus(
    initializedTableForTheWeek,
    { date: new Date() }
  );

  // const availableTimesForCurrentDay = fetchAPI(new Date());
  // const tablesForTheWeekWithAvailabilities = initializedTableForTheWeek.map((slot) => {
  //   if (
  //     (slot.date === (new Date()).toLocaleDateString("it-IT")) &&
  //     (availableTimesForCurrentDay.some(item => item.includes(slot.hour)))
  //   ) {
  //     return {
  //       ...slot,
  //       bookingStatus: false,
  //     };
  //   }
  //   return slot;
  // });

  console.table(tablesForTheWeekWithAvailabilities);
  return {
    tablesForTheWeek: tablesForTheWeekWithAvailabilities,
    tableInUiForTheSelectedDay: tablesForTheWeekWithAvailabilities.filter(
      (el) => el.date === new Date().toLocaleDateString("it-IT")
    ),
  };
};

function Main() {
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

  // // useEffect per caricare gli orari al primo montaggio del componente
  // useEffect(() => {

  //   const today = new Date(); // Data di oggi
  //   const availableTimes = fetchAPI(today); // Chiama remoteFunctionFetchAPI con la data di oggi

  //   // Aggiorna lo stato con gli orari disponibili
  //   dispatchTimeSlot({
  //     type: "UPDATE_SLOTS_SHOWN_IN_UI",
  //     payload: {
  //       date: today.toLocaleDateString("it-IT"), // Data in formato "it-IT"
  //       availableTimesFromApi: availableTimes, // Lista degli orari disponibili
  //     },
  //   });

  // }, []); // L'array vuoto assicura che l'effetto venga eseguito solo al montaggio

  // console.log(mainState);
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
        {/* <Route path="/confirmed-booking" element={<ConfirmedBooking />} /> */}
        <Route
          path="/confermed-booking"
          element={<ConfirmedBooking mainState={mainState} />}
        />
      </Routes>
    </main>
  );
}

export default Main;
