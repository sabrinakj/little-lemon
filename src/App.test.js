import { render, screen } from "@testing-library/react";
import BookingForm from "./components/BookingForm";
import { initializeMainState, updateMainState } from "./components/Main";
import { fetchAPI } from "./BookingAPI";

// test("Renders the BookingForm heading", () => {
//   render(<BookingForm />);
//   const headingElement = screen.getByText("Make Your reservation");
//   expect(headingElement).toBeInTheDocument();
// });
// test("initializeMainState returns the correct initial state", () => {
//   const initialTimes = initializeMainState();
//   expect(initialTimes.tablesForTheWeek).toHaveLength(42); 
//   expect(initialTimes.tablesForTheWeek[0]).toEqual({
//     bookingStatus: false,
//     date: expect.any(String), // Since you format the date using toLocaleDateString, expect it to be a string
//     hour: "17:00",
//     guests: "0",
//     occasion: "",
//   });
// });
// test("updateMainState returns the same state when no valid action is provided", () => {
//   const initialState = [
//     {
//       bookingStatus: false,
//       date: new Date(),
//       hour: "17:00",
//       guests: "0",
//       occasion: "birthday",
//     },
//   ];
//   const action = { type: "INVALID_ACTION" };
//   const updatedState = updateMainState(initialState, action);
//   expect(updatedState).toEqual(initialState);
// });




// Mock the fetchAPI function
jest.mock('./BookingAPI', () => ({
  fetchAPI: jest.fn(),
}));

test('initializeMainState calls fetchAPI and returns available times', () => {
  // Arrange: Mock fetchAPI to return a non-empty array
  const mockTimes = ['17:00', '18:00', '19:00'];
  fetchAPI.mockReturnValue(mockTimes);

  // Act: Call initializeMainState
  const initialTimes = initializeMainState();

  // Assert: Ensure fetchAPI was called and initialTimes contains the expected data
  expect(fetchAPI).toHaveBeenCalled(); // Ensure fetchAPI is called
  expect(initialTimes.tablesForTheWeek).toHaveLength(42); // Check total length (expected number of bookings)
  expect(initialTimes.tablesForTheWeek[0].hour).toEqual('17:00'); // Check the first available time
});



// // Mock the fetchAPI function
// jest.mock('./BookingAPI', () => ({
//   fetchAPI: jest.fn(),
// }));

// test('updateMainState updates available times for a selected date', () => {
//   // Arrange: Mock fetchAPI to return a non-empty array of times
//   const mockTimes = ['17:00', '18:00', '19:00'];
//   fetchAPI.mockReturnValue(mockTimes);

//   const selectedDate = new Date('2023-09-10');
//   const initialState = { tablesForTheWeek: [] };

//   const action = {
//     type: 'UPDATE_SLOTS_SHOWN_IN_UI',
//     payload: {
//       date: selectedDate.toLocaleDateString('it-IT'),
//       times: mockTimes,
//     },
//   };

//   // Act: Call updateMainState
//   const updatedState = updateMainState(initialState, action);

//   // Assert: Ensure fetchAPI was called and the state is updated correctly
//   expect(updatedState.tableInUiForTheSelectedDay).toHaveLength(mockTimes.length);
//   expect(updatedState.tableInUiForTheSelectedDay[0].hour).toEqual('17:00');
//   expect(fetchAPI).toHaveBeenCalledWith(selectedDate);
// });
