import type { Dayjs } from "dayjs";

export interface Workout {
  workoutDate: Date | null
  workoutName: string
  color: string
  userId: string | null
  userName: string | null
  id?: string
  exercisesUserDataSets: Set[]
}

export interface Exercise {
  area: string
  categoryId: number
  isSelected: boolean
  isSettingsActive: boolean
  name: string,
  id: string
}

export interface MuscleGroup {
  iconName: string,
  muscleId: number,
  name: string,
  id: string
}

export interface Set {
  exerciseTitle: string
  weight: string
  repeats: string
  load?: string
  setId: string
  exerciseId: string
}

export type Store = {
  taskColor: string
  workoutName: string
  pickedExercises: Exercise[]
  exercisesUserDataSets: Set[]
  exerciseWeight: string
  exerciseLoad: LoadType | null
  exerciseRepeats: string
  initialDate: Dayjs
  pickedDate: Dayjs | null
}

export type LoadType = {
  id: string,
  loadType: string
  activeLoadType: boolean
  color: string
}

export type Collection = Workout | Exercise | MuscleGroup | Store