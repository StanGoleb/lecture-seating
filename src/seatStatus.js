// seatStatus.js
import { collection, doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

// Funkcja do ustawiania statusu miejsca
export const setSeatStatus = async (seatId, status) => {
  try {
    await setDoc(doc(db, "seats", seatId), { seatId, status });
    console.log(`Seat ${seatId} status updated to ${status}`);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Funkcja do nasłuchiwania zmian w statusie miejsc
export const listenToSeats = (callback) => {
  return onSnapshot(collection(db, "seats"), (snapshot) => {
    const seatsData = {};
    snapshot.forEach((doc) => {
      seatsData[doc.id] = doc.data().status;
    });
    callback(seatsData);
  });
};
