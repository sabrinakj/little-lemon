import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BookingForm from "./components/BookingForm";
import { initializeMainState, reducerForUpdatingMainState } from "./components/Main";
import { fetchAPI } from "./BookingAPI";
import { MemoryRouter } from 'react-router-dom';
import ConfirmedBooking from "./components/ConfirmedBooking";
import '@testing-library/jest-dom';

const fakeMainState = {
  tableInUiForTheSelectedDay: [],
  tablesForTheWeek: []
};
const fakeDispatchUpdatingMainState = jest.fn();
const fakeSubmitForm = jest.fn(() => true);
const fakeIsFormSubmited = false;

jest.mock('./BookingAPI', () => ({
  fetchAPI: jest.fn(),
}));

test("Check for some static text being rendered in the BookingForm component: testing the BookingForm heading", () => {
  render(
    <BookingForm
      mainState={fakeMainState}
      dispatchUpdatingMainState={fakeDispatchUpdatingMainState}
      submitForm={fakeSubmitForm}
      isFormSubmited={fakeIsFormSubmited}
    />
  );
  const headingElement = screen.getByText(/Make Your reservation/i);
  expect(headingElement).toBeInTheDocument();
});

test("Check for initializeTimes, testing if initializeMainState returns the correct initial state", () => {
  const mainState = initializeMainState();
  expect(mainState.tablesForTheWeek).toHaveLength(98);
  expect(mainState.tablesForTheWeek[0]).toEqual({
    bookingStatus:  expect.any(Boolean),
    date: expect.any(String),
    hour: "17:00",
    guests: "0",
    occasion: "",
    refreshedStatus: false,
  });
});

test("reducerForUpdatingMainState returns the same state when no valid action is provided", () => {
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
  const updatedState = reducerForUpdatingMainState(initialState, action);
  expect(updatedState).toEqual(initialState);
});

test('initializeMainState calls fetchAPI and returns available times', () => {
  const mockTimes = ['17:00', '18:00', '19:00'];
  fetchAPI.mockReturnValue(mockTimes);
  const mainState = initializeMainState();
  expect(fetchAPI).toHaveBeenCalled();
  expect(mainState.tablesForTheWeek).toHaveLength(98);
  expect(mainState.tablesForTheWeek[0].hour).toEqual('17:00');
});

test('reducerForUpdatingMainState updates available times for a selected date', () => {
  const mockSelectedDate = new Date('2025-04-18');
  const mockTimes = ["17:00","17:30","19:30","20:00","21:30","22:30","23:00","23:30"];
  fetchAPI.mockReturnValue(mockTimes);
  const initialState = initializeMainState();
  const action = {
    type: "UPDATE_SLOTS_SHOWN_IN_UI",
    payload: {
        selectedDate: mockSelectedDate,
        availableTimesForTheSelectedDay: mockTimes,
    }
}
  const updatedState = reducerForUpdatingMainState(initialState, action);
  expect(updatedState.tableInUiForTheSelectedDay[0]?.hour).toEqual('17:00');
});

jest.spyOn(Storage.prototype, 'setItem');

test('writes form data to localStorage when the form is submitted', () => {
  const mockSubmitForm = jest.fn((formData) => {
    localStorage.setItem('bookingData', JSON.stringify(formData));
  });

  render(
    <MemoryRouter>
      <BookingForm
        mainState={{
          tableInUiForTheSelectedDay: [{ hour: '17:00' }, { hour: '18:00' }],
        }}
        dispatchUpdatingMainState={jest.fn()}
        submitForm={mockSubmitForm}
      />
    </MemoryRouter>
  );

  const dateInput = screen.getByLabelText('Choose date');
  fireEvent.change(dateInput, { target: { value: '2023-09-10' } });

  const timeInput = screen.getByLabelText('Choose time');
  fireEvent.change(timeInput, { target: { value: '17:00' } });

  const guestsInput = screen.getByLabelText('Number of guests');
  fireEvent.change(guestsInput, { target: { value: '3' } });

  const occasionInput = screen.getByLabelText('Occasion');
  fireEvent.change(occasionInput, { target: { value: 'Birthday' } });

  const submitButton = screen.getByRole('button', { name: /On Click Submit the form/i });
  fireEvent.click(submitButton);

  expect(mockSubmitForm).toHaveBeenCalledWith({
    date: '2023-09-10',
    selectedTime: '17:00',
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

jest.spyOn(Storage.prototype, 'getItem');
test('reads form data from localStorage and displays it on the confirmation page', async () => {
  localStorage.getItem.mockReturnValue(
    JSON.stringify({
      date: '16/04/2025',
      selectedTime: '17:00',
      guests: '3',
      occasion: 'Birthday',
    })
  );

  render(<ConfirmedBooking confimedSuccess={true} isFormSubmited={true} />);

  await waitFor(() => {
    expect(screen.getByText(/16\/04\/2025/i)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/17:00/)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/3/)).toBeInTheDocument();
  });

  await waitFor(() => {
    expect(screen.getByText(/Birthday/i)).toBeInTheDocument();
  });
});

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
  const dateInput = screen.getByLabelText('Choose date');
  expect(dateInput).toHaveAttribute('type', 'date');
  expect(dateInput).toBeRequired();
  const timeSelect = screen.getByLabelText('Choose time');
  expect(timeSelect).toBeRequired();
  const guestsInput = screen.getByLabelText('Number of guests');
  expect(guestsInput).toHaveAttribute('type', 'number');
  expect(guestsInput).toHaveAttribute('min', '1');
  expect(guestsInput).toHaveAttribute('max', '10');
  expect(guestsInput).toBeRequired();
  const occasionSelect = screen.getByLabelText('Occasion');
  expect(occasionSelect).toBeRequired();
});

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

  const submitButton = screen.getByRole('button', { name: /On Click Submit the form/i });
  expect(submitButton).toBeDisabled();
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2023-09-10' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '3' } });
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

  const submitButton = screen.getByRole('button', { name: /On Click Submit the form/i });
  expect(submitButton).toBeDisabled();
  fireEvent.change(screen.getByLabelText('Choose date'), { target: { value: '2023-09-10' } });
  fireEvent.change(screen.getByLabelText('Choose time'), { target: { value: '17:00' } });
  fireEvent.change(screen.getByLabelText('Number of guests'), { target: { value: '3' } });
  fireEvent.change(screen.getByLabelText('Occasion'), { target: { value: 'Birthday' } });
  expect(submitButton).not.toBeDisabled();
});