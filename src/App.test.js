import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from "./components/BookingForm";
import { initializeMainState, reducerForUpdatingMainState } from "./components/Main";
import { fetchAPI, submitAPI } from "./BookingAPI";
import { MemoryRouter } from 'react-router-dom';
import ConfirmedBooking from "./components/ConfirmedBooking";
import '@testing-library/jest-dom';

// First unit test
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
// test("reducerForUpdatingMainState returns the same state when no valid action is provided", () => {
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
//   const updatedState = reducerForUpdatingMainState(initialState, action);
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




// Mock the fetchAPI function
jest.mock('./BookingAPI', () => ({
  fetchAPI: jest.fn(),
}));

test('reducerForUpdatingMainState updates available times for a selected date', () => {
  // Arrange: Mock fetchAPI to return a non-empty array of times
  const mockTimes = ['17:00', '18:00', '19:00'];
  fetchAPI.mockReturnValue(mockTimes);

  // Define the selected date and create an action
  const selectedDate = new Date('2023-09-10'); // Define the selected date
  const initialState = { tablesForTheWeek: [], tableInUiForTheSelectedDay: [] };

  const action = {
    type: 'UPDATE_SLOTS_SHOWN_IN_UI',
    payload: {
      date: selectedDate.toISOString(), // Ensure the date is in the correct format
      times: mockTimes,
    },
  };

  // Act: Call reducerForUpdatingMainState
  const updatedState = reducerForUpdatingMainState(initialState, action);

  // Assert: Ensure fetchAPI was called with the correct date
  expect(fetchAPI).toHaveBeenCalledWith(selectedDate); // Ensure fetchAPI is called with the correct date

  // Assert: Ensure the state was updated correctly
  expect(updatedState.tableInUiForTheSelectedDay).toHaveLength(mockTimes.length);
  expect(updatedState.tableInUiForTheSelectedDay[0].hour).toEqual('17:00'); // Check if the first time matches
});




// Unit Tests for Writing to Local Storage
jest.spyOn(Storage.prototype, 'setItem'); // Spy on localStorage.setItem

test('writes form data to localStorage when the form is submitted', () => {
  // Mock submitForm to track the localStorage setItem call
  const mockSubmitForm = jest.fn((formData) => {
    localStorage.setItem('bookingData', JSON.stringify(formData));
  });

  render(
    <MemoryRouter>
      <BookingForm
        mainState={{
          tableInUiForTheSelectedDay: [{ hour: '17:00' }, { hour: '18:00' }], // Simulate available times
        }}
        dispatchUpdatingMainState={jest.fn()}
        submitForm={mockSubmitForm} // Pass the mocked submitForm
      />
    </MemoryRouter>
  );

  // Act: Fill out the form
  const dateInput = screen.getByLabelText('Choose date');
  fireEvent.change(dateInput, { target: { value: '2023-09-10' } });

  const timeInput = screen.getByLabelText('Choose time');
  fireEvent.change(timeInput, { target: { value: '17:00' } }); // Ensure selectedTime is set

  const guestsInput = screen.getByLabelText('Number of guests');
  fireEvent.change(guestsInput, { target: { value: '3' } });

  const occasionInput = screen.getByLabelText('Occasion');
  fireEvent.change(occasionInput, { target: { value: 'Birthday' } });

  // Submit the form
  const submitButton = screen.getByRole('button', { name: /On Click Submit the form/i });
  fireEvent.click(submitButton);

  // Assert: Check that submitForm was called and localStorage.setItem was called with the correct data
  expect(mockSubmitForm).toHaveBeenCalledWith({
    date: '2023-09-10',
    selectedTime: '17:00', // Ensure the selectedTime is correctly passed
    guests: '3',
    occasion: 'Birthday',
  });

  expect(localStorage.setItem).toHaveBeenCalledWith(
    'bookingData',
    JSON.stringify({
      date: '2023-09-10',
      selectedTime: '17:00',
      guests: '3',
      occasion: 'Birthday',
    })
  );
});




// Unit Tests for Reading from Local Storage
jest.spyOn(Storage.prototype, 'getItem'); // Spy on localStorage.getItem

test('reads form data from localStorage and displays it on the confirmation page', () => {
  // Mock localStorage.getItem to return a specific value
  localStorage.getItem.mockReturnValue(
    JSON.stringify({
      date: '2023-09-10',
      selectedTime: '17:00',
      guests: '3',
      occasion: 'Birthday',
    })
  );

  // Render the ConfirmedBooking component
  render(<ConfirmedBooking />);

  // Assert: Check that the booking details are displayed correctly
  expect(screen.getByText('Date: 2023-09-10')).toBeInTheDocument();
  expect(screen.getByText('Time: 17:00')).toBeInTheDocument();
  expect(screen.getByText('Guests: 3')).toBeInTheDocument();
  expect(screen.getByText('Occasion: Birthday')).toBeInTheDocument();
});




// Unit Tests for HTML5 Validation Attributes
test('should have correct HTML5 validation attributes on the form fields', () => {
  render(
    <MemoryRouter>
      <BookingForm
        mainState={{ tableInUiForTheSelectedDay: [] }}
        dispatchUpdatingMainState={jest.fn()}
        submitForm={jest.fn()}
      />
    </MemoryRouter>
  );

  // Test the 'date' input
  const dateInput = screen.getByLabelText('Choose date');
  expect(dateInput).toHaveAttribute('type', 'date');
  expect(dateInput).toBeRequired(); // Check 'required' attribute

  // Test the 'time' select
  const timeSelect = screen.getByLabelText('Choose time');
  expect(timeSelect).toBeRequired(); // Check 'required' attribute

  // Test the 'guests' input
  const guestsInput = screen.getByLabelText('Number of guests');
  expect(guestsInput).toHaveAttribute('type', 'number');
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
  expect(guestsInput).toBeRequired(); // Check 'required' attribute

  // Test the 'occasion' select
  const occasionSelect = screen.getByLabelText('Occasion');
  expect(occasionSelect).toBeRequired(); // Check 'required' attribute
});




// Unit Tests for JavaScript Validation
test('should disable the submit button when the form is invalid', () => {
  render(
    <MemoryRouter>
      <BookingForm
        mainState={{ tableInUiForTheSelectedDay: [{ hour: '17:00' }, { hour: '18:00' }] }}
        dispatchUpdatingMainState={jest.fn()}
        submitForm={jest.fn()}
      />
    </MemoryRouter>
  );

  // Check that the submit button is initially disabled
  const submitButton = screen.getByRole('button', { name: /On Click Submit the form/i });
  expect(submitButton).toBeDisabled();

  // Fill in the form partially (missing some inputs)
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2023-09-10' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '3' } });
  
  // Button should still be disabled
  expect(submitButton).toBeDisabled();
});

test('should enable the submit button when the form is valid', () => {
  render(
    <MemoryRouter>
      <BookingForm
        mainState={{ tableInUiForTheSelectedDay: [{ hour: '17:00' }, { hour: '18:00' }] }}
        dispatchUpdatingMainState={jest.fn()}
        submitForm={jest.fn()}
      />
    </MemoryRouter>
  );

  // Check that the submit button is initially disabled
  const submitButton = screen.getByRole('button', { name: /On Click Submit the form/i });
  expect(submitButton).toBeDisabled();

  // Fill in the form correctly
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2023-09-10' } });
  fireEvent.change(screen.getByLabelText('Choose time'), { target: { value: '17:00' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '3' } });
  fireEvent.change(screen.getByLabelText('Occasion'), { target: { value: 'Birthday' } });

  // Button should be enabled now that all fields are valid
  expect(submitButton).not.toBeDisabled();
});