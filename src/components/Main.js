import React, { useReducer, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Menu from "../pages/Menu";
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
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "17:30",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "18:00",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "18:30",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "19:00",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "19:30",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "20:00",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "20:30",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "21:00",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "21:30",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "22:0",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "22:30",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "23:00",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
  {
    bookingStatus: true,
    date: new Date().toLocaleDateString("it-IT"),
    hour: "23:30",
    guests: "0",
    occasion: "birthday",
    refreshedStatus: false
  },
];

const initialMainState = {
  tablesForTheWeek: [...tablesForToday],
  tableInUiForTheSelectedDay: [...tablesForToday],
};

let lastBookingDataFromLocalStorage = localStorage.getItem('bookingData');
let previousMainStateFromLocalStorage = localStorage.getItem('mainState');

const updateBookingStatus = (tablesForTheWeek, reservedTablesDetails) => {
  const availableTimesForSelectedDay = fetchAPI(reservedTablesDetails.date);
  const tablesWithAvailabilities = tablesForTheWeek.map((table) => {

    if (
      table.date === reservedTablesDetails.date.toLocaleDateString("it-IT") &&
      availableTimesForSelectedDay.some((item) => item.includes(table.hour)) &&
      (reservedTablesDetails.guests === undefined ||reservedTablesDetails.guests === null)
    ) {
      return {
        ...table,
        bookingStatus: false,
        refreshedStatus: true
      };
    }

    else if (
      table.date === reservedTablesDetails.date.toLocaleDateString("it-IT") &&
      availableTimesForSelectedDay.some((item) => item.includes(table.hour)) &&
      table.hour === reservedTablesDetails.selectedTime &&
      reservedTablesDetails.guests !== "0"
    ) {
      const updatedTable = {
        ...table,
        bookingStatus: true,
        guests: reservedTablesDetails.guests,
        occasion: reservedTablesDetails.occasion,
        refreshedStatus: true
      };
      return updatedTable;
    }

    else {
      return table;
    }
  });
  return tablesWithAvailabilities;
};

// Reducer function to update the main state - per far funzionare il secondo test
export const reducerForUpdatingMainState = (state, action) => {
  switch (action.type) {
    case "UPDATE_SLOTS_SHOWN_IN_UI": {
      let formatedPayloadDate = action.payload.selectedDate.toLocaleDateString("it-IT");
      lastBookingDataFromLocalStorage = localStorage.getItem('bookingData');
      const tablesInUiForTheSelectedDay = state.tablesForTheWeek.filter(
        (el) => el.date === formatedPayloadDate
      );
      const otherTablesNotForTheSelectedDay = state.tablesForTheWeek.filter(
        (el) => el.date !== formatedPayloadDate
      );

      if(
        (tablesInUiForTheSelectedDay[0].refreshedStatus === false) ||
        (lastBookingDataFromLocalStorage === null)
      ) {
        const tablesInUiForTheSelectedDayWithAvailabilities = updateBookingStatus(
          tablesInUiForTheSelectedDay,
          { date: action.payload.selectedDate }
        );
        const updatedTablesForTheWeek = [
          ...otherTablesNotForTheSelectedDay, ...tablesInUiForTheSelectedDayWithAvailabilities
        ];
        return {
          tablesForTheWeek: updatedTablesForTheWeek,
          tableInUiForTheSelectedDay: tablesInUiForTheSelectedDayWithAvailabilities
        };
      }

      else {
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
          occasion: action.payload.formData.occasion,
          refreshedStatus: true
        }
      );
      const updatedTablesInUiForTheSelectedDay = updateBookingStatus(
        state.tableInUiForTheSelectedDay,
        {
          date: action.payload.formData.date,
          selectedTime: action.payload.formData.selectedTime,
          guests: action.payload.formData.guests,
          occasion: action.payload.formData.occasion,
          refreshedStatus: true
         }
      );

      const updatedMainState = {
        tableInUiForTheSelectedDay: updatedTablesInUiForTheSelectedDay,
        tablesForTheWeek: updatedTablesForTheWeek,
      };
      // console.log('updatedMainState', updatedMainState);
      localStorage.setItem("mainState", JSON.stringify(updatedMainState));
      return updatedMainState;
    }
    default:
      return state;
  }
};

// Initial state for the mainState
export const initializeMainState = () => {
  let tablesForTheWeekWithAvailabilities;
  previousMainStateFromLocalStorage = JSON.parse(localStorage.getItem('mainState'));
  if(previousMainStateFromLocalStorage) {
    // console.log('previousMainStateFromLocalStorage.tablesForTheWeek', previousMainStateFromLocalStorage.tablesForTheWeek)
    tablesForTheWeekWithAvailabilities = previousMainStateFromLocalStorage.tablesForTheWeek
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
          refreshedStatus: false
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
    // console.log('tablesForTheWeekWithAvailabilities', tablesForTheWeekWithAvailabilities)
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
      // console.log(mainState)
      // localStorage.setItem("mainState", JSON.stringify(mainState));
      localStorage.setItem("bookingData", JSON.stringify(lastBookingData));
      // lastBookingDataFromLocalStorage = lastBookingData;
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
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      { isReservationConfirmed &&
        <div onClick={handleCloseConfirmedModal} className="inactive-background"></div>
      }
    </main>
  );
}

export default Main;
