import React, { useState } from 'react';
import './App.css';

function App() {
  const rooms = [
    { id: 1, name: "Room 1", seats: Array(120).fill("Working") },
    { id: 2, name: "Room 2", seats: Array(120).fill("Working") },
    { id: 3, name: "Room 3", seats: Array(120).fill("Working") },
    { id: 4, name: "Room 4", seats: Array(120).fill("Working") },
    { id: 5, name: "Room 5", seats: Array(120).fill("Working") },
  ];

  const [seats, setSeats] = useState(rooms);

  const toggleSeatStatus = (roomId, seatIndex) => {
    const updatedRooms = [...seats];
    const room = updatedRooms.find((room) => room.id === roomId);
    const currentStatus = room.seats[seatIndex];
    room.seats[seatIndex] = currentStatus === "Working" ? "Broken" : "Working";
    setSeats(updatedRooms);
  };

  return (
    <div className="App">
      <h1>Lecture Room Seat Status</h1>
      {seats.map((room) => (
        <div key={room.id} className="room">
          <h2>{room.name}</h2>
          <div className="seats">
            {room.seats.map((status, index) => (
              <div
                key={index}
                className={`seat ${status}`}
                onClick={() => toggleSeatStatus(room.id, index)}
                style={{
                  backgroundColor: status === "Working" ? "green" : "red",
                  width: "30px",
                  height: "30px",
                  margin: "5px",
                  borderRadius: "5px",
                  display: "inline-block",
                  cursor: "pointer",
                  textAlign: "center",
                  lineHeight: "30px",
                  color: "white",
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
