import { getNextMonth, getPrevMonth } from "@/helpers/getDate";
import { useStore } from "@/stores/store";
import { createApp } from 'vue';
import {createPinia} from "pinia";
import App from '@/App.vue';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);

const store = useStore();

let isHovered = false;
let isNext = false;
let isPrev = false;

let timer = 0;



const dragIntersection = (direction: string ) => {
  // if dragged workout go to left or right side interval start
  // then month toggle to next or prev value

  if (!isHovered) {
    isHovered = true;

    if(direction === "next") {
      isNext = true;

      timer = setInterval(() => {
        store.initialDate = getNextMonth(store.initialDate);
      }, 2000);
    }
    else {
      isPrev = true;

      timer = setInterval(() => {
        store.initialDate = getPrevMonth(store.initialDate);
      }, 2000);
    }
  }
};

const resetDragInterval = () => {
  isHovered = isNext = isPrev = false;
  clearInterval(timer);
}

export { resetDragInterval, dragIntersection };