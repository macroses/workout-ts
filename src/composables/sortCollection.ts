import {computed, type Ref} from "vue";
import getCollectionByUser from "@/composables/getCollectionByUser";

const sortingCollection = (option: Ref<string | null>) => {
  const { documents } = getCollectionByUser('workouts');

  return computed(() => {
    if(option.value === "1") {
      return documents.value?.sort((a,b) => a.workoutDate - b.workoutDate);
    }

    if(option.value === "2") {
      return documents.value?.sort((a,b) => b.workoutDate - a.workoutDate);
    }
  })
}

export { sortingCollection }

