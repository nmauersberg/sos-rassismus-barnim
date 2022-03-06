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
import { Entry, _Entry } from '../../components/Entry';

const auth = getAuth(firebase);

const Timeline = () => {
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

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={s.timeline}>
      {entries
        ? entries.docs.map((entry, index) => {
            const data = entry.data() as _Entry;
            return (
              <div key={`${data.id}-${index}`} className={s.entry}>
                <div className={s.title}>
                  <h3>{data.date.toDate().toLocaleDateString('de-DE')}</h3>
                </div>
                <div className={s.body}>
                  <Entry entry={data} />
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Timeline;
