import { ref } from 'vue';
import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore';
import { CollectionStatus } from "@/types/collectionStatus";
import type { Ref } from "vue";

const useCollection = (col: string) => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);

  const addDocument = async <T>( document: T): Promise<void> => {
    const collectionGroup = collection(db, col);

    try {
      status.value = CollectionStatus.Pending
      await addDoc(collectionGroup, document);
      status.value = CollectionStatus.Ok
    }
    catch(e: any) {
      console.log(e.message);
      status.value = CollectionStatus.Error
    }
  }

  return { status, addDocument }
}

export default useCollection;