import { db } from "@/firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { ref } from "vue";
import { CollectionStatus } from "@/types/collectionStatus";
import type { Ref } from "vue";

type UpdateCollection = {
  status: Ref<CollectionStatus>;
  updateCollection: (id: string, date: Date | null) => Promise<void>;
};

const updateWorkoutDate = (): UpdateCollection => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);

  const updateCollection = async (
    id: string,
    date: Date | null
  ): Promise<void> => {
    const docRef = doc(db, "workouts", id);

    console.log(id, date);

    try {
      status.value = CollectionStatus.Pending;
      await updateDoc(docRef, { workoutDate: date });
      status.value = CollectionStatus.Ok;
    } catch (e: any) {
      console.log(e);
      status.value = CollectionStatus.Error;
    }
  };

  return { status, updateCollection };
};

export default updateWorkoutDate;
