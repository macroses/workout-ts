import { defineStore } from "pinia";
import type { Workout } from "@/types/interface";

interface DragStore {
  draggedObject: Workout | null;
}

export const useDragStore = defineStore({
  id: "dragStore",
  state: () =>
    ({
      draggedObject: null,
    } as DragStore),
});
