import { ref } from 'vue';
import type { Ref } from 'vue';
// firebase imports
import { auth } from '@/firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

export interface IUseSignUp{
  error: Ref<string | null>,
  pending: Ref<boolean>,
  // TODO: определить тип возвращаемого параметра
  signup (email: string, password: string, displayName: string): Promise<any>
}

const error = ref(null);
const pending = ref(false);

const signup = async (email: string, password: string, displayName: string): Promise<any> => {
  error.value = null;
  pending.value = true;

  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);

    if(!user) {
      throw new Error('Регистрация не завершена');
    }

    await updateProfile(user, {
      displayName: displayName
    })
    
    error.value = null;
    pending.value = false;

    return user;
  } 
  catch (e: any) {
    console.log(e.message);
    error.value = e.message;
    pending.value = false;
  }
};

export default (): IUseSignUp => ({
  error: ref(null),
  pending: ref(false),
  signup
})