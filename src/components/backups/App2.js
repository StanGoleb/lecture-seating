import React, { useState } from "react";
import Room from "./components/Room";
import roomLayouts from "./roomLayouts";
import "./App.css";

function App() {
    const [seatStatus, setSeatStatus] = useState(() => {
        const savedStatus = localStorage.getItem("seatStatus");
        return savedStatus ? JSON.parse(savedStatus) : {};
    });

    const updateSeatStatus = (room, row, seat, newStatus) => {
        setSeatStatus((prevStatus) => {
            const updatedStatus = {
                ...prevStatus,
                [room]: {
                    ...prevStatus[room],
                    [row]: {
                        ...prevStatus[room]?.[row],
                        [seat]: newStatus,
                    },
                },
            };
            localStorage.setItem("seatStatus", JSON.stringify(updatedStatus));
            return updatedStatus;
        });
    };

    return (
        <div className="app-container">
            <h1>Krzesła Wydziału Biologii</h1>
            {Object.keys(roomLayouts).map((room) => (
                <Room
                    key={room}
                    room={room}
                    layout={roomLayouts[room]}
                    seatStatus={seatStatus[room] || {}}
                    updateSeatStatus={updateSeatStatus}
                />
            ))}
        </div>
    );
}

export default App;
