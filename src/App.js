import React, { useState, useEffect } from "react";
import Room from "./components/Room";
import Login from "./components/Login";
import { auth } from "./firebase";
import { setSeatStatus as updateSeatStatusFirestore } from "./seatStatus"; // Import setSeatStatus (renamed to avoid conflict)
import roomLayouts from "./roomLayouts";
import "./App.css";
import { collection, getDocs } from "firebase/firestore"; // Import Firestore functions
import { db } from "./firebase"; // Import Firestore instance

function App() {
  const [seatStatus, setSeatStatus] = useState(() => {
    const savedStatus = localStorage.getItem("seatStatus");
    return savedStatus ? JSON.parse(savedStatus) : {};
  });
  const [user, setUser] = useState(null); // Track authenticated user
  const [showLogin, setShowLogin] = useState(false); // Control login popup visibility

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is authenticated:", user.email); // Debug log
        setUser(user); // Set the authenticated user
      } else {
        console.log("No user is authenticated"); // Debug log
        setUser(null); // No user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  // Sync Firestore data with state when the component loads
  useEffect(() => {
    const loadSeatStatus = async () => {
      const snapshot = await getDocs(collection(db, "seats"));
      const firebaseSeatStatus = {};

      snapshot.forEach((doc) => {
        const [room, row, seat] = doc.id.split("_");
        if (!firebaseSeatStatus[room]) firebaseSeatStatus[room] = {};
        if (!firebaseSeatStatus[room][row]) firebaseSeatStatus[room][row] = {};

        firebaseSeatStatus[room][row][seat] = doc.data().status;
      });

      console.log("🔥 Loaded seat data from Firestore:", firebaseSeatStatus);
      setSeatStatus(firebaseSeatStatus);
    };

    loadSeatStatus();
  }, []);

  // Update seat status (only for authenticated users)
  const updateSeatStatus = async (room, row, seat, newStatus) => {
    console.log(`🚀 Attempting to update seat ${room}_${row}_${seat} to ${newStatus}. User authenticated: ${!!user}`); // Debug log
    if (!user) {
      console.log("❌ User not authenticated. Cannot update seat."); // Debug log
      return; // Only allow updates if the user is authenticated
    }

    const seatId = `${room}_${row}_${seat}`;
    console.log(`Updating seat ${seatId} to ${newStatus}`); // Debug log

    try {
      // Update Firestore
      await updateSeatStatusFirestore(seatId, newStatus);

      // Merge new status into the existing state properly
      setSeatStatus((prevStatus) => {
        console.log("🔍 Previous state:", prevStatus); // Debug log

        const updatedStatus = { ...prevStatus };

        if (!updatedStatus[room]) updatedStatus[room] = {};
        if (!updatedStatus[room][row]) updatedStatus[room][row] = {};

        updatedStatus[room][row][seat] = newStatus;

        console.log("✅ Updated state:", updatedStatus); // Debug log

        localStorage.setItem("seatStatus", JSON.stringify(updatedStatus));
        return updatedStatus;
      });
    } catch (error) {
      console.error("🔥 Error updating seat:", error);
    }
  };

  // Logout functionality
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setUser(null); // Clear the user state
      console.log("User logged out successfully"); // Debug log
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="app-container">
      <h1>Krzesła Wydziału Biologii</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => setShowLogin(true)}>Login to Edit</button>
      )}
      {Object.keys(roomLayouts).map((room) => (
        <Room
          key={room}
          room={room}
          layout={roomLayouts[room]}
          seatStatus={seatStatus[room] || {}}
          updateSeatStatus={updateSeatStatus}
          user={user} // Pass the user prop
        />
      ))}
      {showLogin && <Login setUser={setUser} setShowLogin={setShowLogin} />}
    </div>
  );
}

export default App;
