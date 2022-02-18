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
import parse from 'html-react-parser';
import { ReactElement } from 'react';
import { Tiptap } from '../components/editor/Tiptap';

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
                const data = entry.data() as Entry;
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

type Entry = {
  id: string;
  title: string;
  content: string;
  date: Timestamp;
};

type EntryProps = { entry: Entry };

const Entry = ({ entry }: EntryProps): ReactElement => {
  const dateHR = entry.date
    ? new Date(entry.date.toDate()).toLocaleDateString('de-DE')
    : new Date().toLocaleDateString('de-DE');

  return (
    <>
      <h2>{entry.title}</h2>
      {parse(entry.content)}
      <p>Date: {dateHR}</p>
    </>
  );
};

export default Home;
