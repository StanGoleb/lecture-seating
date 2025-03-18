import React from "react";
import SeatLayout from "./SeatLayout";
import "./Room.css";

const Room = ({ room, layout, seatStatus, updateSeatStatus }) => {
    return (
        <div className="room-container">
            <h2>Sala: {room}</h2>
            <SeatLayout
                room={room}
                layout={layout}
                seatStatus={seatStatus}
                updateSeatStatus={updateSeatStatus}
            />
        </div>
    );
};

export default Room;
