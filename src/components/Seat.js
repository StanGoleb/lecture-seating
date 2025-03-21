import React, { useState } from "react";
import SeatPopup from "./SeatPopup";
import "./Seat.css";

const statusColors = {
  working: "green",
  meh: "yellow",
  broken: "red",
};

const Seat = ({ room, row, seat, status, updateSeatStatus, user, selectedSeat, setSelectedSeat, seatGap }) => {
  const handleClick = () => {
    console.log(`Seat ${room}_${row}_${seat} clicked. User authenticated: ${!!user}`); // Debug log
    if (user) {
      setSelectedSeat({ room, row, seat }); // Set the selected seat, so it triggers a new popup for the clicked seat
    } else {
      console.log("User is not authenticated. Cannot edit seat."); // Debug log
    }
  };

  return (
    <div className="seat-container">
      <div
        className="seat"
        style={{
          backgroundColor: statusColors[status],
          margin: seatGap ? `${seatGap}px` : "5px", // Apply gap between seats
        }}
        onClick={handleClick}
      >
        {seat}
      </div>
      {selectedSeat && selectedSeat.room === room && selectedSeat.row === row && selectedSeat.seat === seat && (
        <SeatPopup
          seat={seat}
          currentStatus={status}
          updateSeatStatus={(newStatus) => updateSeatStatus(room, row, seat, newStatus)}
          closePopup={() => setSelectedSeat(null)} // Close the popup when "closePopup" is clicked
        />
      )}
    </div>
  );
};

export default Seat;
