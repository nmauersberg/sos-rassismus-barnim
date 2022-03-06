import type { NextPage } from 'next';
import firebase from '../firebase/clientApp';
import { getAuth } from 'firebase/auth';
import {
  getFirestore,
  collection,
  Timestamp,
  serverTimestamp,
  doc,
  addDoc,
  setDoc,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { Tiptap } from '../components/Editor/Tiptap';
import { Entry, _Entry } from '../components/Entry';

const auth = getAuth(firebase);

const Home: NextPage = () => {
  const db = getFirestore(firebase);

  const addEntry = async () => {
    await addDoc(collection(db, 'entries'), {
      title: 'Another Test 4',
      content: '<h2>Hello hello?</h2>',
      date: serverTimestamp() as Timestamp,
    });
  };

  const updateEntry = async () => {
    await setDoc(doc(db, 'entries', '<idOfDocToUpdate>'), {
      title: 'Another Test 4',
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
      <h1>SOS Rassismus Barnim</h1>
      {loading ? (
        'loading'
      ) : (
        <>
          {entries
            ? entries.docs.map((entry, index) => {
                const data = entry.data() as _Entry;
                return <Entry key={`${data.id}-${index}`} entry={data} />;
              })
            : null}
        </>
      )}
      {user && <button onClick={() => addEntry()}>Add Entry!</button>}
      <Tiptap />
    </>
  );
};

export default Home;
