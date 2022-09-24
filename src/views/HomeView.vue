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
import {getNextMonth, getPrevMonth} from "@/helpers/getDate";

const store = useStore();

const getPickedDate = (date: Dayjs) => store.pickedDate = date;
const editWorkout = ref<Workout | null>(null);
const getEditWorkout = (workout: Workout) => editWorkout.value = workout;

let isHovered = false;
let isNext = false;
let isPrev = false;
let timer = ref(0);

const currentHalf = ref('');
let leftSideWidth = window.innerWidth / 2;

const dragIntersection = (direction: string ) => {
  // if dragged workout go to left or right side interval start
  // then month toggle to next or prev value
  if (!isHovered) {
    isHovered = true;

    if(direction === "next") {
      isNext = true;

      timer.value = setTimeout(() => {
        store.initialDate = getNextMonth(store.initialDate);
      }, 1500);
    }
    else if (direction === "prev") {
      isPrev = true;

      timer.value = setTimeout(() => {
        store.initialDate = getPrevMonth(store.initialDate);
      }, 1500);
    }

    else store.isDragged = false;
  }
};

const resetDragInterval = () => {
  isHovered = isNext = isPrev = false;
  clearInterval(timer.value);
}

const translateCalendarLayout = (event: MouseEvent) => {
  if (event.clientX <= leftSideWidth) currentHalf.value = 'left';
  else currentHalf.value = 'right';
}

const throttle = (callback, ms) => {
  let isThrottled = false;
  let saveArgs;
  let savedThis;

  function wrapper () {
    if (isThrottled) {
      saveArgs = arguments;
      savedThis = this;
      return;
    }

    callback.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (saveArgs) {
        wrapper.apply(savedThis, savedThis);
        saveArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}

const wheelEvent = (event: WheelEvent) => {
  if (event.deltaY > 0) {
    store.initialDate = getNextMonth(store.initialDate);
    console.log(event.deltaY)
  }
  else if (event.deltaY < 0) {
    store.initialDate = getPrevMonth(store.initialDate);
  }
}


</script>

<template>
<main>
  <Transition name="slideMonth" mode="out-in" :duration="100">
    <div 
      class="calendar-layout" 
      :class="[
        {dragged: store.isDragged},
        {toLeft: currentHalf === 'left'},
        {toRight: currentHalf === 'right'}
      ]"
      :key="store.initialDate.toDate().toDateString()"
      @dragend="resetDragInterval"
      @dragover="translateCalendarLayout"
      @wheel="throttle(wheelEvent, 1000)"
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
    @dragenter="dragIntersection('next')"
    @dragexit="resetDragInterval"
  >
    <Icon width="40px" iconName="chevrons-right"/>
  </div>
  <div 
    class="perv-month" 
    :class="{ dragged: store.isDragged }"
    @dragenter="dragIntersection('prev')"
    @dragexit="resetDragInterval"
  >
    <Icon width="40px" iconName="chevrons-left"/>
  </div>
  <WorkoutForm />
  <ReadWorkoutData @editWorkout="getEditWorkout"/>
  <EditWorkout :editableWorkout="editWorkout"/>
</main>
</template>