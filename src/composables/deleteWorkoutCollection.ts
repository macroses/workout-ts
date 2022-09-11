import {db} from '@/firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import {CollectionStatus} from "@/composables/useCollection";
import {ref, type Ref} from "vue";

const deleteWorkoutCollection = async (id: string) => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);
  const error: Ref<string> = ref('');

  try {
    status.value = CollectionStatus.Pending;
    await deleteDoc(doc(db, 'workouts', id));
    status.value = CollectionStatus.Ok
  } catch (e: any) {
    console.log(e);
    status.value = CollectionStatus.Error;
    error.value = e.message;
  }

  //return status for create loader
  return { status, error }
}

export default deleteWorkoutCollection;