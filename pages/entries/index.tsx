import { NextPage } from 'next';
import { ReactElement } from 'react';
import s from './style.module.scss';

import firebase from '../../firebase/clientApp';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Entry, _Entry } from '../../components/Timeline/Entry';

const auth = getAuth(firebase);

const Chronicles: NextPage = (): ReactElement => {
  const db = getFirestore(firebase);

  const addEntry = async () => {
    await addDoc(collection(db, 'entries'), {
      title: 'Another Test 6',
      content: '<h2>Hello hello?</h2>',
      date: serverTimestamp() as Timestamp,
    });
  };

  const updateEntry = async () => {
    await setDoc(doc(db, 'entries', '<idOfDocToUpdate>'), {
      title: 'Another Test...',
      content: '<h2>Hello hello?</h2>',
      date: serverTimestamp() as Timestamp,
    });
  };

  const [user] = useAuthState(auth);
  const [entries, loading, error] = useCollection(
    collection(getFirestore(firebase), 'entries'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );

  return (
    <>
      <h2>chronicles</h2>
      {loading ? (
        'loading'
      ) : (
        <div className={s.entryContainer}>
          {entries
            ? entries.docs.map((entry, index) => {
                const data = entry.data() as _Entry;
                return <Entry key={`${data.id}-${index}`} entry={data} />;
              })
            : null}
        </div>
      )}
      {user && <button onClick={() => addEntry()}>Add Entry!</button>}
    </>
  );
};

export default Chronicles;
