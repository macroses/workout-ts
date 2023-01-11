import { ref } from "vue";
// firebase imports
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const pending = ref(false);

const login = async (email: string, password: string) => {
  error.value = null;
  pending.value = true;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (!res) {
      throw new Error("Вход не завершен");
    }

    error.value = null;
    pending.value = false;
  } catch (e: any) {
    console.log(e.message);
    error.value = e.message;
    pending.value = false;
  }
};

const useLogin = () => {
  return {
    error,
    pending,
    login,
  };
};

export default useLogin;
