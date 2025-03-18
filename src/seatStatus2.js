export const getSeatStatus = () => {
  const savedStatus = JSON.parse(localStorage.getItem('seats'));
  if (savedStatus) {
    return savedStatus;
  }

  const defaultStatus = {
    room1: Array(150).fill('green'), // 15 rows * 10 seats
    room2: Array(100).fill('green'), // 10 rows * 10 seats
    room3: Array(200).fill('green'), // 20 rows * 10 seats
    room4: Array(250).fill('green'), // 25 rows * 10 seats
  };

  return defaultStatus;
};

export const updateSeatStatus = (room, seatIndex, status) => {
  const currentStatus = getSeatStatus();
  currentStatus[room][seatIndex] = status;
  localStorage.setItem('seats', JSON.stringify(currentStatus));
};
