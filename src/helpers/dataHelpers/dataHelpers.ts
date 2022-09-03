// import type { Exercise } from "@/types/interface";
// import { ref } from 'vue';

// const filledArray = ref<Exercise[]>([]);

// export const useFillOutsideArray = (exercise: Exercise) => {
//   if(filledArray.value.includes(exercise)) { // удалим, если уже есть в массиве
//     filledArray.value = filledArray.value.filter(el => el.id !== exercise.id);
//   }
//   else {
//     filledArray.value.push(exercise)
//   }
  
//   return { filledArray };
  
// }