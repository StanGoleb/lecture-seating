import React, { useState } from "react";
import SeatPopup from "./SeatPopup";
import "./Seat.css";

const statusColors = {
  working: "green",
  meh: "yellow",
  broken: "red",
};

const Seat = ({ room, row, seat, status, updateSeatStatus, user }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    console.log(`Seat ${room}_${row}_${seat} clicked. User authenticated: ${!!user}`); // Debug log
    if (user) {
      setShowPopup(true); // Only show popup if the user is authenticated
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
      {showPopup && (
        <SeatPopup
          seat={seat}
          currentStatus={status}
          updateSeatStatus={(newStatus) => updateSeatStatus(room, row, seat, newStatus)}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Seat;
