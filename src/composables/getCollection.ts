import { ref, watchEffect } from "vue";

import { db } from '@/firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

const getCollection = (c: string) => {
  const documents = ref();
  const pending = ref(false);

  let colRef = collection(db, c);

  const unsub = onSnapshot(colRef, snapshot => {
    let results: any = [];
    pending.value = true;

    snapshot.docs.forEach(doc => {
      results.push({
        ...doc.data(),
        id: doc.id
      })
    })

    documents.value = results;
  })

  watchEffect(onInvalidate => {
    onInvalidate(() => unsub());
    pending.value = false
  })

  return { documents, pending };
}

export default getCollection;