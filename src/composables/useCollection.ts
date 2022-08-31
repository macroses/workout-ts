import { ref } from 'vue';
import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import type { Ref } from "vue";

export enum CollectionStatus {
  Ok = 0,
  Pending = 1,
  Error = 2
}

interface Document {
  workoutDate: Date | null
  workoutName: string
  color: string
  userId: string | null
  userName: string | null
}

const useCollection = (col: string) => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);

  const addDocument = async ( document: Document ): Promise<void> => {
    const newGroup = collection(db, col);

    try {
      status.value = CollectionStatus.Pending
      await addDoc(newGroup, document);
      status.value = CollectionStatus.Ok
    }
    catch(e: any) {
      console.log(e.message);
      status.value = CollectionStatus.Error
    }
  }

  return { status, addDocument }
}

export default useCollection