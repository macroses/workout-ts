import { getNextMonth, getPrevMonth } from "@/helpers/getDate";
import type { Store } from "@/types/interface";

const handleThrottle = (event: WheelEvent, store: Store) => {
  let wait = false;

  return function () {
    if (!wait) {
      if (event.deltaY > 0) {
        store.initialDate = getNextMonth(store.initialDate);
        console.log(event.deltaY);
      } else if (event.deltaY < 0) {
        store.initialDate = getPrevMonth(store.initialDate);
      }

      wait = true;

      setTimeout(() => (wait = false), 1000);
    }
  };
};

export default handleThrottle;
