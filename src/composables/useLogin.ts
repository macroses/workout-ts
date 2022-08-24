import { ref } from 'vue';
// firebase imports
import { auth } from '@/firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const error = ref(null);
const isPending = ref(false);

const login = async (email: string, password: string) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if(!res) {
      throw new Error('Вход не завершен');
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

const useLogin = () => {
  return {
    error,
    isPending,
    login
  }
};

export default useLogin;