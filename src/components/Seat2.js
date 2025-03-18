import React, { useState } from "react";
import SeatPopup from "./SeatPopup";
import "./Seat.css";

const statusColors = {
    working: "green",
    meh: "yellow",
    broken: "red",
};

const Seat = ({ room, row, seat, status, updateSeatStatus }) => {
    const [showPopup, setShowPopup] = useState(false);

    return (
        <div className="seat-container">
            <div
                className="seat"
                style={{ backgroundColor: statusColors[status] }}
                onClick={() => setShowPopup(true)}
            >
                {seat}
            </div>
            {showPopup && (
                <SeatPopup
                    room={room}
                    row={row}
                    seat={seat}
                    currentStatus={status}
                    updateSeatStatus={updateSeatStatus}
                    closePopup={() => setShowPopup(false)}
                />
            )}
        </div>
    );
};

export default Seat;
