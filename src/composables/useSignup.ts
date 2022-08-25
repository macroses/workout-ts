import { ref } from 'vue';
import type { Ref } from 'vue';
// firebase imports
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

const error = ref(null);
const isPending = ref(false);

const signup = async (
    email: string, 
    password: string, 
    displayName: string
  ): Promise<any> => {
  error.value = null;
  isPending.value = true;

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    if(!user) {
      throw new Error('Регистрация не завершена');
    }

    await updateProfile(user, {
      displayName: displayName
    })
    
    error.value = null;
    isPending.value = false;

    return user;
  } 
  catch (e: any) {
    console.log(e.message);
    error.value = e.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return {
    error,
    isPending,
    signup
  }
};

export default useSignup;