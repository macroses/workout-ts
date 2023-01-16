<script lang="ts" setup>
import type { Workout } from "@/types/interface";
import type { Dayjs } from "dayjs";
import Weekdays from "@/components/weekdays/Weekdays.vue";
import CalendarDates from "@/components/calendarDates/CalendarDates.vue";
import WorkoutForm from "@/components/workoutForm/WorkoutForm.vue";
import EditWorkout from "@/components/editWorkout/EditWorkout.vue";
import ReadWorkoutData from "@/components/readWorkoutData/ReadWorkoutData.vue";
import { useStore } from "@/stores/store";
import {ref} from "vue";
import Icon from "../components/ui/Icon.vue";
import { getNextMonth, getPrevMonth } from "@/helpers/getDate";
import Challenges from "@/components/challenges/Challenges.vue";

const store = useStore();

const getPickedDate = (date: Dayjs) => (store.pickedDate = date);
const editWorkout = ref<Workout | null>(null);
const getEditWorkout = (workout: Workout) => (editWorkout.value = workout);

let isHovered = false;
let isNext = false;
let isPrev = false;
let timer = ref(0);

const currentHalf = ref("");
let leftSideWidth = window.innerWidth / 2;

const dragIntersection = (direction: string) => {
  // if dragged workout go to left or right side interval start
  // then month toggle to next or prev value
  if (!isHovered) {
    isHovered = true;

    if (direction === "next") {
      isNext = true;

      timer.value = setInterval(() => {
        store.initialDate = getNextMonth(store.initialDate);
      }, 700);
    } else if (direction === "prev") {
      isPrev = true;

      timer.value = setInterval(() => {
        store.initialDate = getPrevMonth(store.initialDate);
      }, 700);
    }
    else {
      store.isDragged = false;
      currentHalf.value = '';
    }
  }
};

const resetDragInterval = (e) => {
  isHovered = isNext = isPrev = false;
  clearInterval(timer.value);
};

const translateCalendarLayout = (event: MouseEvent) => {
  if (event.clientX <= leftSideWidth) {
    currentHalf.value = "left";
  }
  else currentHalf.value = "right";
};

const resetByDrop = (dropEvent: any) => {
  if ( dropEvent.dataTransfer.dropEffect === 'none' ) {
    store.isDragged = false;
    currentHalf.value = '';
  }
}
</script>

<template>
  <main>
    <Transition :duration="100" mode="out-in" name="slideMonth">
      <div
        :key="store.initialDate.toDate().toDateString()"
        :class="[
          { dragged: store.isDragged },
          { toLeft: currentHalf === 'left' },
          { toRight: currentHalf === 'right' },
        ]"
        class="calendar-layout"
        @dragover="translateCalendarLayout"
        @dragleave="resetDragInterval"
        @dragend="resetByDrop"
      >
        <div :class="{ editMode: store.isEditMode }" class="lock-layer"></div>
        <Weekdays />
        <ul ref="countCells" class="days">
          <CalendarDates @pickDate="getPickedDate" />
        </ul>
      </div>
    </Transition>
    <div
      :class="{ dragged: store.isDragged }"
      class="next-month"
      @dragenter="dragIntersection('next')"
      @dragexit="resetDragInterval"
    >
      <Icon iconName="chevrons-right" width="40px" />
    </div>
    <div
      :class="{ dragged: store.isDragged }"
      class="perv-month"
      @dragenter="dragIntersection('prev')"
      @dragexit="resetDragInterval"
    >
      <Icon iconName="chevrons-left" width="40px" />
    </div>
    <WorkoutForm />
    <ReadWorkoutData @editWorkout="getEditWorkout" />
    <EditWorkout :editableWorkout="editWorkout" />
  </main>
  <Transition>
    <Challenges />
  </Transition>
</template>
