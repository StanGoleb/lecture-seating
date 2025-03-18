import React, { useState, useEffect } from "react";
import { setSeatStatus, listenToSeats } from "../seatStatus";

const Seat = ({ seatId }) => {
  const [status, setStatus] = useState("available");

  useEffect(() => {
    // Subskrybujemy zmiany w Firestore
    const unsubscribe = listenToSeats((seats) => {
      if (seats[seatId]) {
        setStatus(seats[seatId]); // Aktualizujemy status miejsca
      }
    });

    return () => unsubscribe(); // Odłączamy nasłuchiwanie przy odmontowaniu
  }, [seatId]);

  const handleClick = () => {
    const newStatus = status === "available" ? "occupied" : "available";
    setSeatStatus(seatId, newStatus);
  };

  return (
    <div onClick={handleClick} style={{ cursor: "pointer", padding: "10px", border: "1px solid black" }}>
      Seat {seatId} - {status}
    </div>
  );
};

export default Seat;
