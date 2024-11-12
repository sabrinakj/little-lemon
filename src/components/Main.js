import React, { useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Menu from "../pages/Menu";
import OrderOnline from "../pages/OrderOnline";
import Login from "../pages/Login";
import BookingPage from "../pages/BookingPage";
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

let lastBookingDataFromLocalStorage = localStorage.getItem('bookingData');
let previousMainStateFromLocalStorage = localStorage.getItem('mainState');

// (initialMainState.tablesForTheWeek, {availableTimesForSelectedDay, SelectedDate})
const updateBookingStatus = (tablesForTheWeek, reservedTablesDetails) => {
  const availableTimesForSelectedDay = fetchAPI(reservedTablesDetails.date);
  // console.log(availableTimesForSelectedDay);
  const tablesWithAvailabilities = tablesForTheWeek.map((table) => {
    // console.log(table.date);
    // console.log('table.hour', table.hour);
    // console.log('reservedTablesDetails', reservedTablesDetails)
    // // console.log('reservedTablesDetails.selectedTime', reservedTablesDetails.selectedTime)
    // // console.log("else if", table.date === reservedTablesDetails.date.toLocaleDateString("it-IT") );
    // // console.log("else if", availableTimesForSelectedDay.some((item) => item.includes(table.hour)));
    // // console.log("else if", table.hour === reservedTablesDetails.selectedTime);
    // // console.log("else if", reservedTablesDetails.guests !== "0");
    // console.log(
    //   table.date === reservedTablesDetails.date.toLocaleDateString("it-IT") &&
    //   availableTimesForSelectedDay.some((item) => item.includes(table.hour)) &&
    //   table.hour === reservedTablesDetails.selectedTime &&
    //   reservedTablesDetails.guests !== "0"
    // );

    if (
      table.date === reservedTablesDetails.date.toLocaleDateString("it-IT") &&
      availableTimesForSelectedDay.some((item) => item.includes(table.hour)) &&
      (reservedTablesDetails.guests === undefined ||reservedTablesDetails.guests === null)
    ) {
      // console.log("if of update ui slots");
      return {
        ...table,
        bookingStatus: false,
      };
    }
    else if (
      table.date === reservedTablesDetails.date.toLocaleDateString("it-IT") &&
      availableTimesForSelectedDay.some((item) => item.includes(table.hour)) &&
      table.hour === reservedTablesDetails.selectedTime &&
      reservedTablesDetails.guests !== "0"
    ) {
      // console.log("else if of make a reservation");
      const updatedTable = {
        ...table,
        bookingStatus: true,
        guests: reservedTablesDetails.guests,
        occasion: reservedTablesDetails.occasion,
      };
      // console.log(updatedTable);
      return updatedTable;
    }
    else {
      // console.log("else")
      return table;
    }
  });
  return tablesWithAvailabilities;
};

// Reducer function to update the main state - per far funzionare il secondo test
export const reducerForUpdatingMainState = (state, action) => {
  switch (action.type) {
    case "UPDATE_SLOTS_SHOWN_IN_UI": {
      console.log(action.payload.selectedDate.toLocaleDateString("it-IT"))
      let formatedPayloadDate = action.payload.selectedDate.toLocaleDateString("it-IT");
      console.log(lastBookingDataFromLocalStorage)
      console.log(lastBookingDataFromLocalStorage?.date)
      console.log(lastBookingDataFromLocalStorage?.guests)
      console.log(formatedPayloadDate)
      // run this if block when:
      // 1. no data in local storage
      // 2. the local storage bookingData.date is different then the formatedPayloadDate
      if(
        (lastBookingDataFromLocalStorage?.date !== formatedPayloadDate) ||
        (lastBookingDataFromLocalStorage === null)
      ) {
        console.log(lastBookingDataFromLocalStorage)
        const tablesInUiForTheSelectedDay = state.tablesForTheWeek.filter(
          (el) => el.date === formatedPayloadDate
        );
        const tablesInUiForTheSelectedDayWithAvailabilities = updateBookingStatus(
          tablesInUiForTheSelectedDay,
          { date: action.payload.selectedDate }
        );
        return {
          tablesForTheWeek: [...state.tablesForTheWeek],
          tableInUiForTheSelectedDay: tablesInUiForTheSelectedDayWithAvailabilities
        };
      }

      else {
        const tablesInUiForTheSelectedDay = state.tablesForTheWeek.filter(
          (el) => el.date === formatedPayloadDate
        );
        return {
          tablesForTheWeek: [...state.tablesForTheWeek],
          tableInUiForTheSelectedDay: tablesInUiForTheSelectedDay
        };
      }
    }

    case "BOOK_A_TIME_SLOT": {

      const updatedTablesForTheWeek = updateBookingStatus(
        state.tablesForTheWeek,
        {
          date: action.payload.formData.date,
          selectedTime: action.payload.formData.selectedTime,
          guests: action.payload.formData.guests,
          occasion: action.payload.formData.occasion
         }
      );
      const updatedTablesInUiForTheSelectedDay = updateBookingStatus(
        state.tableInUiForTheSelectedDay,
        {
          date: action.payload.formData.date,
          selectedTime: action.payload.formData.selectedTime,
          guests: action.payload.formData.guests,
          occasion: action.payload.formData.occasion
         }
      );
      return {
        tableInUiForTheSelectedDay: updatedTablesInUiForTheSelectedDay,
        tablesForTheWeek: updatedTablesForTheWeek,
      };
    }
    default:
      return state;
  }
};

// Initial state for the mainState
export const initializeMainState = () => {
  let tablesForTheWeekWithAvailabilities;
  previousMainStateFromLocalStorage = localStorage.getItem('mainState');
  console.log(previousMainStateFromLocalStorage)

  if(previousMainStateFromLocalStorage) {
    tablesForTheWeekWithAvailabilities = previousMainStateFromLocalStorage
  }
  else {
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
    tablesForTheWeekWithAvailabilities = updateBookingStatus(
      initializedTableForTheWeek,
      { date: new Date() }
    );
  }

  return {
    tablesForTheWeek: tablesForTheWeekWithAvailabilities,
    tableInUiForTheSelectedDay: tablesForTheWeekWithAvailabilities.filter(
      (el) => el.date === new Date().toLocaleDateString("it-IT")
    ),
  };
};

function Main() {
  const [isReservationConfirmed, setIsReservationConfirmed] = useState(false);

  const [mainState, dispatchUpdatingMainState] = useReducer(
    reducerForUpdatingMainState,
    initialMainState,
    initializeMainState
  );

  const submitForm = (formData) => {
    const isSubmitted = submitAPI(formData);
    if (isSubmitted) {
      const lastBookingData = {
        ...formData,
        date: new Date(formData.date).toLocaleDateString("it-IT")
      };
      localStorage.setItem("mainState", JSON.stringify(mainState));
      localStorage.setItem("bookingData", JSON.stringify(lastBookingData));
      lastBookingDataFromLocalStorage = lastBookingData;
      setIsReservationConfirmed(isSubmitted);
      return true
    } else {
      alert("There was an error submitting your booking. Please try again.");
    }
    return isSubmitted;
  };

  const handleCloseConfirmedModal = () => {
    setIsReservationConfirmed(!isReservationConfirmed);
  };

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
              dispatchUpdatingMainState={dispatchUpdatingMainState}
              submitForm={submitForm}
              isReservationConfirmed={isReservationConfirmed}
            />
          }
        />
        <Route path="/orderonline" element={<OrderOnline />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      { isReservationConfirmed &&
        <div onClick={handleCloseConfirmedModal} className="inactive-background"></div>
      }
    </main>
  );
}

export default Main;
