import { db } from '../firebase/config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  serverTimestamp 
} from 'firebase/firestore';

const COLLECTION_NAME = 'reservations';

export const reservationService = {
  // Create a new reservation
  createReservation: async (data) => {
    try {
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...data,
        status: 'pending',
        createdAt: serverTimestamp()
      });
      return { id: docRef.id, ...data };
    } catch (error) {
      console.error("Error creating reservation:", error);
      throw error;
    }
  },

  // Get all reservations (for Admin)
  getAllReservations: async () => {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Convert timestamp to date if needed, or handle in component
        createdAt: doc.data().createdAt?.toDate()
      }));
    } catch (error) {
      console.error("Error fetching reservations:", error);
      throw error;
    }
  },

  // Update reservation status
  updateStatus: async (id, status) => {
    try {
      const reservationRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(reservationRef, { status });
      return { id, status };
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  },

  // Get approved reservations for a specific date (to check availability)
  getReservationsByDate: async (dateString) => {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('date', '==', dateString),
        where('status', '==', 'approved')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Error fetching date reservations:", error);
      throw error;
    }
  }
};
