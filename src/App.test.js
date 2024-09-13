import { render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm";
import { initializeMainState, updateMainState } from "./components/Main";

test("Renders the BookingForm heading", () => {
  render(<BookingForm />);
  const headingElement = screen.getByText("Make Your reservation");
  expect(headingElement).toBeInTheDocument();
});


test("initializeMainState returns the correct initial state", () => {
  const initialTimes = initializeMainState();
  expect(initialTimes.tablesForTheWeek).toHaveLength(42); 
  expect(initialTimes.tablesForTheWeek[0]).toEqual({
    bookingStatus: false,
    date: expect.any(String), // Since you format the date using toLocaleDateString, expect it to be a string
    hour: "17:00",
    guests: "0",
    occasion: "",
  });
});


test("updateMainState returns the same state when no valid action is provided", () => {
  const initialState = [
    {
      bookingStatus: false,
      date: new Date(),
      hour: "17:00",
      guests: "0",
      occasion: "birthday",
    },
  ];

  const action = { type: "INVALID_ACTION" };
  const updatedState = updateMainState(initialState, action);
  expect(updatedState).toEqual(initialState);
});


// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
