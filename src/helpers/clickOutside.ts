import { onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';



export const clickOutside = (ref: Ref<null | HTMLAllCollection>, callback = () => {}): void => {
  function handleClickOutside(event: Event) {
    if (ref.value && !ref.value.contains(event.target)) {
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

