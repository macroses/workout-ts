<script lang="ts" setup>
import type { Dayjs } from "dayjs";
import { computed, ref } from "vue";
import { getEmptyDays, getDaysArr, getDateEquality } from "@/helpers/getDate";
import updateWorkoutDate from '@/composables/updateWorkoutDate';
import { useStore } from "@/stores/store";
import WorkoutTask from "../workoutTask/workoutTask.vue";
import Button from "@/components/ui/Button.vue";
import type {Workout} from "@/types/interface";
import useCollection from "@/composables/useCollection";
import {CollectionStatus} from "@/types/collectionStatus";
import Loader from '@/components/loader/Loader.vue'

const store = useStore();
const emits = defineEmits<{
  (e: 'pickDate', day: Dayjs): void
}>();

const { updateCollection } = updateWorkoutDate();
const { addDocument, status } = useCollection('workouts')

const activeCellIndex = ref<number>(0); // выделение активной ячейки
const dragObject = ref<Workout | null>(null);
const draggedDate = ref<Date | null>(null);
const isConfirm = ref(false);

const emptyDaysCells = computed(() => getEmptyDays(store.initialDate));
const filledDaysCells = computed(() => getDaysArr(store.initialDate));

const pickDate = (date: Dayjs, index: number): void => {
  store.readWorkout = null;
  activeCellIndex.value = index;

  if(activeCellIndex.value === index) {
    store.pickedDate = date;
  }
  
  emits('pickDate', date)
};

const handleStartDrag = (workout: Workout) => dragObject.value = workout;

const handleDrop = async (day: Dayjs) => {
  isConfirm.value = !isConfirm.value;
  draggedDate.value = day.toDate(); // drop workout and get new date of workout
}

const taskReplace = async () => {
  store.readWorkout = null; // clear, for closing read window
  isConfirm.value = false;
  await updateCollection(
    dragObject.value?.id as string,
    draggedDate.value
  );
};

const taskCopy = async () => {

  await addDocument({
    workoutDate: draggedDate.value,
    workoutName: dragObject.value?.workoutName ?? null,
    userName: dragObject.value?.userName ?? null,
    userId: dragObject.value?.userId ?? null,
    exercisesUserDataSets: dragObject.value?.exercisesUserDataSets ?? null,
    color: dragObject.value?.color ?? null
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
    ref="cell"
    v-for="( day, index ) in filledDaysCells"
    :key="day.format('D')"
    :class="[ { today: getDateEquality(day) }, { activeCell: index === activeCellIndex } ]"
    class="calendar-cell"
    @click="pickDate(day, index)"
    @drop="handleDrop(day)"
    @dragenter.prevent
    @dragover.prevent
  >
    <span class="day-num">{{ day.format('D') }}</span>
    <WorkoutTask
      @handleStartDrag="handleStartDrag"
      :workoutDate="day"
    />
  </li>
  <teleport to="body">
    <Transition name="bounce">
      <div
        class="confirm-dialog"
        v-if="isConfirm"
      >
        <div class="confirm-dialog__layer" >
          <div class="confirm-dialog__title" v-if="status === CollectionStatus.Ok">Выберите действие для тренировки</div>
          <div class="confirm-dialog__buttons button-group">
            <Button size="custom" @click="isConfirm = false">Отменить</Button>
            <Button size="custom" :accent="true" @click="taskCopy">Копировать</Button>
            <Button size="custom" :accent="true" @click="taskReplace">Переместить</Button>
          </div>
          <Loader v-if="status === CollectionStatus.Pending"/>
        </div>
      </div>
    </Transition>
  </teleport>
</template>