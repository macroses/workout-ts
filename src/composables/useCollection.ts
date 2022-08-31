import { ref } from 'vue';
import type { Ref } from "vue";

import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore'


interface Document {
  workoutDate: Date | null
  workoutName: string
  color: string
  userId: string | null
  userName: string | null
}

const useCollection = (col: string) => {
  const error: Ref<string | null> = ref(null);
  const isPending: Ref<boolean> = ref(true);

  const addDocument = async (
    document: Document
  ): Promise<void> => {
    error.value = null
    const newGroup = collection(db, col);

    try {
      await addDoc(newGroup, document);
      isPending.value = false;
    }
    catch(e: any) {
      console.log(e.message);
      error.value = 'could not send the message';
      isPending.value = false;
    }
  }

  return { error, addDocument, isPending }
}

export default useCollection