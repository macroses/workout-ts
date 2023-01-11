import { db } from "@/firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { ref } from "vue";
import { CollectionStatus } from "@/types/collectionStatus";
import type { Ref } from "vue";
import type { ChallengeDate } from "@/types/challengeTypes";

const updateChallengeCollection = () => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);

  const updateCollection = async (
    challengeDates: Array<ChallengeDate>,
    challengeId: string
  ) => {
    const docRef = doc(db, "challenges", challengeId);

    try {
      status.value = CollectionStatus.Pending;
      await updateDoc(docRef, {
        challengeDates: challengeDates,
      });

      console.log(challengeId + " is updated");
      status.value = CollectionStatus.Ok;
    } catch (e: any) {
      console.log(e);
      status.value = CollectionStatus.Error;
    }
  };

  return { status, updateCollection };
};

export default updateChallengeCollection;
