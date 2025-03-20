import React, { useState } from "react";
import SeatLayout from "./SeatLayout"; // Import the SeatLayout component

const Room = ({ room, layout, seatStatus, updateSeatStatus, user }) => {
  const [selectedSeat, setSelectedSeat] = useState(null); // Track the currently selected seat

  return (
    <div className="room-container">
      <h2>{room}</h2>
      <SeatLayout
        room={room}
        layout={layout}
        seatStatus={seatStatus}
        updateSeatStatus={updateSeatStatus}
        user={user}
        selectedSeat={selectedSeat} // Pass selectedSeat to the SeatLayout
        setSelectedSeat={setSelectedSeat} // Pass setSelectedSeat function to SeatLayout
      />
    </div>
  );
};

export default Room;
