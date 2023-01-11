<script lang="ts" setup>
import type { Dayjs } from "dayjs";
import type { Workout } from "@/types/interface";
import { CollectionStatus } from "@/types/collectionStatus";
import { computed, ref } from "vue";
import { useStore } from "@/stores/store";
import { useDragStore } from "@/stores/dragStore";
import { getDateEquality, getDaysArr, getEmptyDays } from "@/helpers/getDate";
import updateWorkoutDate from "@/composables/updateWorkoutDate";
import useCollection from "@/composables/useCollection";
import WorkoutTask from "../workoutTask/workoutTask.vue";
import Button from "@/components/ui/Button.vue";
import Loader from "@/components/loader/Loader.vue";
import ChallengeTask from "@/components/challengeTask/ChallengeTask.vue";
import getCollectionByUser from "@/composables/getCollectionByUser";

const store = useStore();
const dragStore = useDragStore();

const emits = defineEmits<{
  (e: "pickDate", day: Dayjs): void;
}>();

const cell = ref(null);

const { updateCollection } = updateWorkoutDate();
const { addDocument, status } = useCollection("workouts");
const { documents, pending } = getCollectionByUser("challenges");

const activeCellIndex = ref<number>(0); // выделение активной ячейки
const draggedDate = ref<Date | null>(null);
const isConfirm = ref(false);

const emptyDaysCells = computed(() => getEmptyDays(store.initialDate));
const filledDaysCells = computed(() => getDaysArr(store.initialDate));

const pickDate = (date: Dayjs, index: number): void => {
  store.readWorkout = null;
  activeCellIndex.value = index;

  if (activeCellIndex.value === index) {
    store.pickedDate = date;
  }

  emits("pickDate", date);
};

const handleStartDrag = (workout: Workout) => {
  store.pickedDate = null;
  store.readWorkout = null;
  dragStore.draggedObject = workout;
};

const handleDrop = (day: Dayjs) => {
  isConfirm.value = !isConfirm.value;
  draggedDate.value = day.toDate(); // drop workout and get new date of workout
  store.isDragged = false;
};

const taskReplace = async () => {
  store.readWorkout = null; // clear, for closing read window
  isConfirm.value = false;

  await updateCollection(
    dragStore.draggedObject?.id as string,
    draggedDate.value
  );
};

const taskCopy = async () => {
  await addDocument({
    workoutDate: draggedDate.value,
    workoutName: dragStore.draggedObject?.workoutName ?? null,
    userName: dragStore.draggedObject?.userName ?? null,
    userId: dragStore.draggedObject?.userId ?? null,
    exercisesUserDataSets:
      dragStore.draggedObject?.exercisesUserDataSets ?? null,
    color: dragStore.draggedObject?.color,
    workoutTonnage: dragStore.draggedObject?.workoutTonnage ?? null,
  });

  isConfirm.value = false;
};
</script>

<template>
  <li
    v-for="(_, index) in emptyDaysCells"
    :key="index"
    class="calendar-cell"
  ></li>
  <li
    v-for="(day, index) in filledDaysCells"
    :key="day.format('D')"
    ref="cell"
    :class="[
      { today: getDateEquality(day) },
      { activeCell: index === activeCellIndex },
    ]"
    class="calendar-cell"
    @click="pickDate(day, index)"
    @drop="handleDrop(day)"
    @dragenter.prevent
    @dragover.prevent
  >
    <span class="day-num">{{ day.format("D") }}</span>
    <WorkoutTask :workoutDate="day" @handleStartDrag="handleStartDrag" />
    <ChallengeTask :challengeDate="day" />
  </li>
  <teleport to="body">
    <Transition name="bounce">
      <div v-if="isConfirm" class="confirm-dialog">
        <div class="confirm-dialog__layer">
          <div
            v-if="status === CollectionStatus.Ok"
            class="confirm-dialog__title"
          >
            Выберите действие для тренировки
          </div>
          <div class="confirm-dialog__buttons button-group">
            <Button size="custom" @click="isConfirm = false">Отменить</Button>
            <Button :accent="true" size="custom" @click="taskCopy"
              >Копировать</Button
            >
            <Button :accent="true" size="custom" @click="taskReplace"
              >Переместить</Button
            >
          </div>
          <Loader v-if="status === CollectionStatus.Pending" />
        </div>
      </div>
    </Transition>
  </teleport>
</template>
