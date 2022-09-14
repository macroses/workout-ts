import {db} from '@/firebase/config';
import { deleteDoc, doc } from 'firebase/firestore';
import { CollectionStatus } from "@/types/collectionStatus";
import { ref, type Ref } from "vue";

const deleteWorkoutCollection = () => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);
  const error: Ref<string> = ref('');

  const deleteCollection = async (id: string) => {

    const docRef = doc(db, 'workouts', id);

    try {
      status.value = CollectionStatus.Pending;
      await deleteDoc(docRef);
      status.value = CollectionStatus.Ok
    } catch (e: any) {
      console.log(e);
      status.value = CollectionStatus.Error;
      error.value = e.message;
    }
  }

  return { status, error, deleteCollection }
}

export default deleteWorkoutCollection;