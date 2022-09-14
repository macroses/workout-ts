import {type Ref, ref, watchEffect} from "vue";

import { db } from '@/firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

import getUser from "./getUser";
import type {Workout} from "@/types/interface";

const { user } = getUser();

const getCollectionByUser = (c: string) => {
  const documents: Ref<Workout[] | undefined> = ref([]);
  const pending = ref(false);

  let colRef = collection(db, c);

  const unsub = onSnapshot(colRef, snapshot => {
    let results: any = [];
    pending.value = true;

    snapshot.docs.forEach(doc => {

      if(doc.data().userId === user.value?.uid) {
        results.push({
        ...doc.data(),
        id: doc.id,
      })
      }
    })

    documents.value = results;
  })

  watchEffect(onInvalidate => {
    onInvalidate(() => unsub());
    pending.value = false
  })

  return { documents, pending };
}

export default getCollectionByUser;