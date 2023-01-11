import { db } from "@/firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { ref } from "vue";
import type { Exercise } from "@/types/interface";
import { CollectionStatus } from "@/types/collectionStatus";
import type { Ref } from "vue";

const updateWorkoutCollection = () => {
  const status: Ref<CollectionStatus> = ref(CollectionStatus.Ok);

  const updateCollection = async (
    id: string,
    workoutName?: string,
    color?: string,
    dataSets?: Exercise[],
    workoutTonnage?: number
  ) => {
    const docRef = doc(db, "workouts", id);

    try {
      status.value = CollectionStatus.Pending;

      await updateDoc(docRef, {
        workoutName: workoutName,
        color: color,
        exercisesUserDataSets: dataSets,
        workoutTonnage: workoutTonnage,
      });

      status.value = CollectionStatus.Ok;
      console.log(id, "was updated");
    } catch (e: any) {
      console.log(e);
      status.value = CollectionStatus.Error;
    }
  };

  return { status, updateCollection };
};

export default updateWorkoutCollection;
