import "./BookingSlot.css";

function BookingSlot({ mainState }) {
  // // console.log("mainState BookingSlot", mainState);
  
  return (
    <div className="booking-slot-time-slot">
      {mainState.tableInUiForTheSelectedDay.length === 0 ?
        <div>Booking available for only the next seven days.</div> :

          mainState.tableInUiForTheSelectedDay.map((table) => (

            <div key={table.date + table.hour} className={`table-ui ${table.bookingStatus ? 'table-ui-reserved' : ''}`} >

              {table.bookingStatus ? "Reserved" : "Available"} <br/> {"Day: " + table.date} <br/> {"Time slot: " + table.hour}
            </div>

          ))
      }
    </div>
  );
}

export default BookingSlot;
