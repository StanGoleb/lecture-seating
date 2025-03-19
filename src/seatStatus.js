import { collection, doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const setSeatStatus = async (seatId, status) => {
  try {
    await setDoc(doc(db, "seats", seatId), { status }, { merge: true }); // 🔥 Używamy merge, aby nie nadpisywać całego dokumentu
  } catch (error) {
    console.error("Error saving seat:", error);
  }
};

export const getInitialSeatStatus = async (seatId) => {
  try {
    const docSnap = await getDoc(doc(db, "seats", seatId));
    return docSnap.exists() ? docSnap.data().status : "working";
  } catch (error) {
    console.error("Error fetching seat:", error);
    return "working";
  }
};

export const listenToSeats = (callback) => {
  return onSnapshot(collection(db, "seats"), (snapshot) => {
    const seatsData = {};
    snapshot.forEach((doc) => {
      seatsData[doc.id] = doc.data().status;
    });
    callback(seatsData);
  });
};
