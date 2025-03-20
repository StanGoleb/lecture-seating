const Seat = ({ room, row, seat, status, updateSeatStatus, user }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    if (user) {
      setShowPopup(true); // Only show popup if the user is authenticated
    }
  };

  return (
    <div className="seat-container">
      <div
        className="seat"
        style={{ backgroundColor: statusColors[status] }}
        onClick={handleClick}
      >
        {seat}
      </div>
      {showPopup && (
        <SeatPopup
          seat={seat}
          currentStatus={status}
          updateSeatStatus={(newStatus) => updateSeatStatus(room, row, seat, newStatus)}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};
