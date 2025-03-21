import React from "react";
import Seat from "./Seat";
import "./SeatLayout.css";

const SeatLayout = ({ room, layout, seatStatus, updateSeatStatus, user, selectedSeat, setSelectedSeat }) => {
  return (
    <div className="seat-layout">
      {layout.map((row, rowIndex) => {
        let seatNumber = 0; // Track actual seat numbering

        return (
          <div key={rowIndex} className="seat-row">
            <span className="row-label">{rowIndex + 1}</span>
            {row.map((seat, seatIndex) => {
              if (seat === 1) {
                seatNumber++; // Only count real seats
                return (
                  <Seat
                    key={seatIndex}
                    room={room}
                    row={rowIndex + 1}
                    seat={seatNumber} // Use adjusted numbering
                    status={seatStatus[rowIndex + 1]?.[seatNumber] || "working"}
                    updateSeatStatus={updateSeatStatus}
                    user={user}
                    selectedSeat={selectedSeat}
                    setSelectedSeat={setSelectedSeat}
                  />
                );
              } else {
                return <div key={seatIndex} className="seat-gap"></div>; // Render gaps
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SeatLayout;
