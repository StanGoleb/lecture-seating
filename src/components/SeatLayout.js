import React from "react";
import Seat from "./Seat"; // Import the Seat component
import "./SeatLayout.css";

const SeatLayout = ({ room, layout, seatStatus, updateSeatStatus, user, selectedSeat, setSelectedSeat }) => {
  return (
    <div className="seat-layout">
      {layout.map((seatsInRow, rowIndex) => (
        <div key={rowIndex} className="seat-row">
          <span className="row-label">{rowIndex + 1}</span>
          {Array.from({ length: seatsInRow }, (_, seatIndex) => (
            <Seat
              key={seatIndex}
              room={room}
              row={rowIndex + 1}
              seat={seatIndex + 1}
              status={seatStatus[rowIndex + 1]?.[seatIndex + 1] || "working"}
              updateSeatStatus={updateSeatStatus}
              user={user}
              selectedSeat={selectedSeat} // Pass selectedSeat to each Seat
              setSelectedSeat={setSelectedSeat} // Pass setSelectedSeat to each Seat
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SeatLayout;
