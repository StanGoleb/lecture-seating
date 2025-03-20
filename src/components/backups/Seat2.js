import React, { useState, useEffect } from "react";
import { setSeatStatus, listenToSeats } from "../seatStatus";
import SeatPopup from "./SeatPopup";
import "./Seat.css";

const statusColors = {
  working: "green",
  meh: "yellow",
  broken: "red",
};

const Seat = ({ room, row, seat, status, updateSeatStatus }) => {
  const [seatStatus, setSeatStatusState] = useState(status);
  const [showPopup, setShowPopup] = useState(false);
  const seatId = `${room}_${row}_${seat}`;

  // Listen to Firebase for real-time updates
  useEffect(() => {
    const unsubscribe = listenToSeats((seats) => {
      if (seats[seatId]) {
        setSeatStatusState(seats[seatId]);
      }
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [seatId]);

  // Handle seat click to show the popup
  const handleClick = () => {
    setShowPopup(true);
  };

  // Handle status change from the popup
  const handleStatusChange = async (newStatus) => {
    try {
      // Update Firebase
      await setSeatStatus(seatId, newStatus);
      // Update local state
      setSeatStatusState(newStatus);
      // Update parent component state
      updateSeatStatus(room, row, seat, newStatus);
      // Close the popup
      setShowPopup(false);
    } catch (error) {
      console.error("Error updating seat:", error);
    }
  };

  // Close the popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="seat-container">
      <div
        className="seat"
        style={{ backgroundColor: statusColors[seatStatus] }}
        onClick={handleClick}
      >
        {seat}
      </div>
      {showPopup && (
        <SeatPopup
          seat={seat}
          currentStatus={seatStatus}
          updateSeatStatus={handleStatusChange}
          closePopup={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Seat;
