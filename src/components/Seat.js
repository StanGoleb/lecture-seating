import React, { useState } from "react";
import SeatPopup from "./SeatPopup";
import "./Seat.css";

const statusColors = {
  working: "green",
  meh: "yellow",
  broken: "red",
};

const Seat = ({ room, row, seat, status, updateSeatStatus, user, selectedSeat, setSelectedSeat }) => {
  const handleClick = () => {
    console.log(`Seat ${room}_${row}_${seat} clicked. User authenticated: ${!!user}`); // Debug log
    if (user) {
      // Update the selected seat
      setSelectedSeat({ room, row, seat }); // Set the selected seat, so it triggers a new popup for the clicked seat
    } else {
      console.log("User is not authenticated. Cannot edit seat."); // Debug log
    }
  };

  return (
    <div className="seat-container">
      <div
        className="seat"
        style={{ backgroundColor: statusColors[status] }}
        onClick={handleClick}
      >
        {seat}
      </div>
      {/* Show the popup only if this seat is the selected one */}
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
