import "./BookingSlot.css";
import React from "react";

function BookingSlot({ mainState }) {
  // // console.log("mainState BookingSlot", mainState);

  return (
    <div className="bookingslot-time-slot">
      {mainState.tableInUiForTheSelectedDay.length === 0 ? (
        <div>Booking available for only the next seven days.</div>
      ) : (
        mainState.tableInUiForTheSelectedDay.map((table, index) => (
          <React.Fragment key={table.date + table.hour}>
            <div
              className={`
                table-ui
                ${table.bookingStatus ? "table-ui-reserved" : ""}
              `}
            >
              {table.bookingStatus ? "Reserved" : "Available"} <br />
              {"Day: " + table.date} <br />
              {"Time slot: " + table.hour}
            </div>
            {index % 2 !== 0 && <br />}
          </React.Fragment>
        ))
      )}
    </div>
  );
}

export default BookingSlot;
