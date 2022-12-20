import { ref } from 'vue';
import { db } from '@/firebase/config'
import { collection, addDoc } from 'firebase/firestore';
import { CollectionStatus } from "@/types/collectionStatus";
import type { Ref } from "vue";

const useChallengesCollection = (col: string) => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);

  const addChallenge = async ( challenge ): Promise<void> => {
    const challenges = collection(db, col);

    try {
      status.value = CollectionStatus.Pending
      await addDoc(challenges, document);
      status.value = CollectionStatus.Ok
    }
    catch(e: any) {
      console.log(e.message);
      status.value = CollectionStatus.Error
    }
  }

  return { status, addChallenge }
}

export default useChallengesCollection;