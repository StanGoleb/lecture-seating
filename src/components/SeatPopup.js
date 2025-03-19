import React from "react";
import "./SeatPopup.css";

const SeatPopup = ({ seat, currentStatus, updateSeatStatus, closePopup }) => {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <h3>Seat {seat}</h3>
        <button onClick={() => updateSeatStatus("working")} className="btn green">
          Working
        </button>
        <button onClick={() => updateSeatStatus("meh")} className="btn yellow">
          Meh
        </button>
        <button onClick={() => updateSeatStatus("broken")} className="btn red">
          Broken
        </button>
        <button onClick={closePopup} className="btn close"> {/* 🔥 Naprawione zamykanie */}
          Close
        </button>
      </div>
    </div>
  );
};

export default SeatPopup;
