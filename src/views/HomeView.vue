<script setup lang="ts">
import type {Workout} from "@/types/interface";
import type {Dayjs} from 'dayjs';
import Weekdays from '@/components/weekdays/Weekdays.vue';
import CalendarDates from '@/components/calendarDates/CalendarDates.vue';
import WorkoutForm from '@/components/workoutForm/WorkoutForm.vue';
import EditWorkout from "@/components/editWorkout/EditWorkout.vue";
import ReadWorkoutData from "@/components/readWorkoutData/ReadWorkoutData.vue";
import {useStore} from "@/stores/store";
import {ref} from "vue";
import Icon from "../components/ui/Icon.vue";
import { resetDragInterval, dragIntersection } from "@/helpers/dragDirection";

const store = useStore();

const getPickedDate = (date: Dayjs) => store.pickedDate = date;
const editWorkout = ref<Workout | null>(null);
const getEditWorkout = (workout: Workout) => editWorkout.value = workout;

const blockIntersection = (direction: string) => {
  dragIntersection(direction);

};
</script>

<template>
<main>
  <Transition name="slideMonth" mode="out-in" :duration="100">
    <div 
      class="calendar-layout" 
      :class="{dragged: store.isDragged}"
      :key="store.initialDate.toDate().toDateString()"
      @dragend="resetDragInterval"
    >
      <div class="lock-layer" :class="{editMode: store.isEditMode}"></div>
      <Weekdays />
      <ul ref="countCells" class="days">
        <CalendarDates @pickDate="getPickedDate" />
      </ul>
    </div>
  </Transition>
  <div 
    class="next-month" 
    :class="{ dragged: store.isDragged }"
    @dragenter="blockIntersection('next')"
    @dragexit="resetDragInterval"
  >
    <Icon width="30px" iconName="chevrons-right"/>
  </div>
  <div 
    class="perv-month" 
    :class="{ dragged: store.isDragged }"
    @dragenter="blockIntersection('prev')" 
    @dragexit="resetDragInterval"
  >
    <Icon width="30px" iconName="chevrons-left"/>
  </div>
  <WorkoutForm />
  <ReadWorkoutData @editWorkout="getEditWorkout"/>
  <EditWorkout :editableWorkout="editWorkout"/>
</main>
</template>