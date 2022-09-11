import { db } from '@/firebase/config';
import { updateDoc, doc } from 'firebase/firestore';
import { CollectionStatus } from "@/composables/useCollection";
import { ref, type Ref } from "vue";

const updateWorkoutCollection = async (
  id: string,
  workoutName?: string,
  color?: string
) => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);
  const error: Ref<string> = ref('');

  const docRef = doc(db, 'workouts', id);

  try {
    status.value = CollectionStatus.Pending;

    await updateDoc(docRef, {
      workoutName: workoutName,
      color: color
    });

    status.value = CollectionStatus.Ok
    console.log(id, "was updated")

  } catch (e: any) {

    console.log(e);
    status.value = CollectionStatus.Error;
    error.value = e.message;
  }

  //return status for create loader
  return { status, error }
}

export default updateWorkoutCollection;