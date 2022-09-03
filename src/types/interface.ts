export interface Workout {
  workoutDate: Date | null
  workoutName: string
  color: string
  userId: string | null
  userName: string | null
  id?: string
  pickedExercise: Exercise[]
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

export type Collection = Workout | Exercise | MuscleGroup