import { onMounted, onUnmounted } from 'vue';

export const clickOutside = (ref = null, callback = () => {}) => {
  function handleClickOutside(event) {
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

