import { db } from '@/firebase/config';
import { updateDoc, doc } from 'firebase/firestore';
import { CollectionStatus } from "@/composables/useCollection";
import { ref, type Ref } from "vue";
import type {Exercise} from "@/types/interface";

const updateWorkoutCollection = async (
  id: string,
  workoutName?: string,
  color?: string,
  dataSets?: Exercise[]
) => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);
  const error: Ref<string> = ref('');

  const docRef = doc(db, 'workouts', id);

  try {
    status.value = CollectionStatus.Pending;

    await updateDoc(docRef, {
      workoutName: workoutName,
      color: color,
      exercisesUserDataSets: dataSets
    });

    status.value = CollectionStatus.Ok
    console.log(id, "was updated")

  } catch (e: any) {

    console.log(e);
    status.value = CollectionStatus.Error;
    error.value = e.message;
  }

  //return status for create loader
  return { status, error };
}

export default updateWorkoutCollection;