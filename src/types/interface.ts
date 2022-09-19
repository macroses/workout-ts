import type { Dayjs } from "dayjs";

export interface Workout {
  workoutDate: Date | null
  workoutName: string | null
  color: string | null
  userId: string | null
  userName: string | null
  id?: string | null
  exercisesUserDataSets: Exercise[] | null
}

export interface Exercise {
  area: string
  categoryId: number
  isSelected: boolean
  isSettingsActive: boolean
  name: string,
  id: string,
  sets: Set[]
}

export interface MuscleGroup {
  iconName: string,
  muscleId: number,
  name: string,
  id: string
}

export interface Set {
  exerciseId: string
  load?: string
  repeats: string
  setId: string
  weight: string
}

export interface Store {
  taskColor?: string
  workoutName?: string
  pickedExercises: Exercise[] | null
  sets?: {
    weight: string
    repeats: string
    load?: string
    setId: string
    exerciseId: string
  } | null
  exerciseWeight: string
  exerciseLoad: LoadType | null
  exerciseRepeats: string
  initialDate: Dayjs
  pickedDate: Dayjs | null
  readWorkout: Workout | null
  isEditMode: boolean
  isDragged: boolean
}

export type LoadType = {
  id: string,
  loadType: string
  activeLoadType: boolean
  color: string
}

export type Collection = Workout | Exercise | MuscleGroup | Store