import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const setSeatStatus = async (seatId, status) => {
  try {
    console.log(`Saving seat ${seatId} with status: ${status}`); // Debug log
    await setDoc(doc(db, "seats", seatId), { status }, { merge: true });
  } catch (error) {
    console.error("Error saving seat:", error);
  }
};
