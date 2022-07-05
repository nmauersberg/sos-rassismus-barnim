import { doc, getFirestore, setDoc } from 'firebase/firestore';
import firebase from './clientApp';

type Collection = 'entries';

export const updateDocument = async (
  collection: Collection,
  document: { [key: string]: any }
) => {
  const db = getFirestore(firebase);
  await setDoc(doc(db, collection, document.id), document);
};
