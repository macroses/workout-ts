import { ref } from "vue";
import type { Ref } from "vue";

import { auth } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";

const user: Ref<User | null> = ref(auth.currentUser);

onAuthStateChanged(auth, (_user) => {
  user.value = _user;
});

const getUser = () => {
  return { user };
};

export default getUser;
