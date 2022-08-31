<script setup lang="ts">
import type { Dayjs } from 'dayjs';
import { ref } from 'vue';
import Icon from '../ui/Icon.vue';
import Input from '../ui/Input.vue';
import DropdownColor from '../ui/DropdownColor.vue';
import Button from '../ui/Button.vue';
import { useStore } from '@/stores/store';
import getUser from '@/composables/getUser';
import useCollection from '@/composables/useCollection';
import MuscleGroups from './MuscleGroups.vue';

const props = defineProps<{ pickedDate: Dayjs | null }>();
const emits = defineEmits<{ (e: 'close'): void }>();
const store = useStore();

const { user } = getUser();
const { addDocument, error, isPending } = useCollection('workouts');

const workoutName = ref<string>('');
const closeForm = () => emits('close');

// пушим пробник
const handleSubmit = async () => {
  await addDocument({
    workoutDate: props.pickedDate?.toDate() ??null,
    workoutName: workoutName.value,
    color: store.taskColor,
    userId: user.value?.uid ??null,
    userName: user.value?.displayName ??null
  });

  if(!error.value) {
    workoutName.value = '';
  }
}
</script>

<template>
  <div 
    class="workout-form"
    :class="{ active: pickedDate }"
  >
    <div class="workout-form__title">
      <div class="workout-form__name">
        <div class="workout-form__icon">
          <Icon width="20px" iconName="clipboard-check"/>
        </div>
        Тренировка <span class="workout-form__date">{{ pickedDate?.format('DD.MM.YYYY') }}</span>
      </div>
      <div class="a11y-wrap" @click="closeForm">
        <Icon width="20px" iconName="xmark"/>
      </div>
    </div>
    <form class="workout-form__body" @submit.prevent="handleSubmit">
      <Input 
        v-model="workoutName"
        inputType="text" 
        placeholder="Название тренировки"
        required
      />
      <DropdownColor />
      <MuscleGroups />
      <div class="workout-form__btns">
        <Button size="md" @click="closeForm">Закрыть</Button>
        <Button size="md"  @click="handleSubmit">Сохранить</Button>
      </div>
    </form>
  </div>
</template>