import { ref, watchEffect } from "vue";

import { db } from '@/firebase/config';
import { collection, onSnapshot } from 'firebase/firestore';

const getCollection = (c: string) => {
  const documents = ref();

  let colRef = collection(db, c);

  const unsub = onSnapshot(colRef, snapshot => {
    let results: any = [];
    
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
  })

  return { documents };
}

export default getCollection;