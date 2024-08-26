import "./BookingSlot.css";

function BookingSlot({ availableTimes }) {
  console.log("availableTimes BookingSlot", availableTimes.hour);

  return (
    <div className="booking-slot-time-slot">
      Available time slots
      {availableTimes.map((table, index) => (
        <div key={index} className="table-ui">
          {table.hour}
        </div>
      ))}
    </div>
  );
}

export default BookingSlot;
