import {onMounted, onUnmounted} from 'vue';
import type {Ref} from "vue";

export const clickOutside = <T extends HTMLElement>(ref: Ref<T | null>, callback = () => {}): void => {
  function handleClickOutside(event: MouseEvent) {
    if (ref?.value && !ref.value.contains(event.target as Node)) {
      callback()
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', handleClickOutside);
  })

  onUnmounted(() => {
    document.removeEventListener('mousedown', handleClickOutside);
  });
}