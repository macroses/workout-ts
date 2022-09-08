import type { Set, Workout, Exercise, Collection } from "@/types/interface";
import { computed, type ComputedRef } from "vue";

type ResultSet = {
  exerciseId: string
  exerciseTitle: string
  sets: Array<{
    weight: string,
    repeats: string,
    load?: string,
    setId: string
  }>
}


const reduceExerciseBySets = (exercise: Workout ) => {
  return exercise.exercisesUserDataSets.reduce((acc: Array<ResultSet>, current): ResultSet[] => {

    const found = acc.find(set => set.exerciseId = current.exerciseId);

    if (found) {
      found.sets.push({
        weight: current.weight,
        repeats: current.repeats,
        load: current.load,
        setId: current.setId
      });
    } else {
      acc.push({
        exerciseId: current.exerciseId,
        exerciseTitle: current.exerciseTitle,
        sets: [{
          weight: current.weight,
          repeats: current.repeats,
          load: current.load,
          setId: current.setId
        }]
      })
    }

    return acc;

  }, [])
}

export { reduceExerciseBySets };
