import "./BookingSlot.css";

function BookingSlot({ mainState }) {
  console.log("mainState BookingSlot", mainState);

  return (
    <div className="booking-slot-time-slot">
      Available time slots
      {mainState.tableInUiForTheSelectedDay.map((table) => (
        <div key={table.date + table.hour} className="table-ui">
          {"Day: " + table.date + "\n" + "Time slot: " + table.hour}
        </div>
      ))}
    </div>
  );
}

export default BookingSlot;
