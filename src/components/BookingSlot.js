import "./BookingSlot.css";

function BookingSlot({ availableTimes, dispatchTimeSlot }) {
  const tablesUi = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

  return (
    <div className="booking-slot-time-slot">
      {tablesUi.map((table, index) => (
        <div key={index} className="table-ui">
          {table}
        </div>
      ))}
    </div>
  );
}

export default BookingSlot;
