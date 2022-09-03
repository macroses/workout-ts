import { ref } from 'vue';
import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'
import type { Ref } from "vue";
import type { Workout } from "@/types/interface";

export enum CollectionStatus {
  Ok = 0,
  Pending = 1,
  Error = 2
}

const useCollection = (col: string) => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);

  const addDocument = async ( document: Workout ): Promise<void> => {
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