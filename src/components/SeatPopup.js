import React from "react";
import "./SeatPopup.css";

const SeatPopup = ({ room, row, seat, currentStatus, updateSeatStatus, closePopup }) => {
    const handleStatusChange = (newStatus) => {
        updateSeatStatus(room, row, seat, newStatus);
        closePopup();
    };

    return (
        <div className="popup-container">
            <div className="popup-content">
                <h3>Miejsce {seat} (Rząd {row})</h3>
                <button onClick={() => handleStatusChange("working")} className="btn green">
                    Działa
                </button>
                <button onClick={() => handleStatusChange("meh")} className="btn yellow">
                    Meh
                </button>
                <button onClick={() => handleStatusChange("broken")} className="btn red">
                    Zepsute
                </button>
                <button onClick={closePopup} className="btn close">
                    Zamknij
                </button>
            </div>
        </div>
    );
};

export default SeatPopup;
