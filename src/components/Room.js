import React, { useState } from "react";
import SeatLayout from "./SeatLayout"; // Import the SeatLayout component

const Room = ({ room, layout, seatStatus, updateSeatStatus, user }) => {
  const [selectedSeat, setSelectedSeat] = useState(null); // Track the currently selected seat
  const seatGap = 10; // Define the gap you want between seats, you can adjust this as needed

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
        seatGap={seatGap} // Pass seat gap to the SeatLayout
      />
    </div>
  );
};

export default Room;
