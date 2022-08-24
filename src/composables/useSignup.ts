import { ref } from 'vue';
// firebase imports
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const error = ref(null);
const isPending = ref(false);

const signup = async (email: string, password: string) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if(!res) {
      throw new Error('Регистрация не завершена');
    }

    error.value = null;
    isPending.value = false;
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