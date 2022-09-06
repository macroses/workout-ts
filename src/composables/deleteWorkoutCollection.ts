import { db } from '@/firebase/config';
import {  doc, deleteDoc } from 'firebase/firestore';

const deleteWorkoutCollection = async (id: string) => {
  await deleteDoc(doc(db, 'workouts', id))
}

export default deleteWorkoutCollection;