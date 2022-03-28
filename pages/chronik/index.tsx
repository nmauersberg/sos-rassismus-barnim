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
import { FadeIn, getIncrementor } from 'anima-react';
import { LoadingAnimation } from '../../components/LoadingAnimation/index';
import cN from 'classnames';
import { SpacerRow } from '../../components/Timeline/SpacerRow';
import { useEffect, useState } from 'react';

const auth = getAuth(firebase);
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

const Chronik = () => {
  const [user] = useAuthState(auth);
  const [entries, loading, error] = useCollection(
    collection(getFirestore(firebase), 'entries'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [mappedEntries, setMappedEntries] = useState<_Entry[]>([]);

  useEffect(() => {
    if (!entries) return;

    const raw = entries.docs.map((entry, index) => {
      return entry.data() as _Entry;
    });
    const sorted = raw.sort(
      (a, b) => a.date.toDate().getTime() - b.date.toDate().getTime()
    );
    setMappedEntries(sorted);
  }, [entries]);

  const getDelay = getIncrementor(0, 0.1);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div className={cN('pageWidth', s.chronicles)}>
      <FadeIn delay={getDelay()}>
        <SpacerRow />
      </FadeIn>
      {mappedEntries
        ? mappedEntries.map((entry, index) => {
            return (
              <FadeIn delay={getDelay()} key={`${entry.id}-${index}`}>
                <>
                  <div className={s.chronicleRow}>
                    <div className={s.dateDesktop}>
                      <h3 className='m-0'>
                        {entry.date.toDate().toLocaleDateString('de-DE')}
                      </h3>
                    </div>
                    <div className={s.timeline}>
                      <div className={s.timelineLine}></div>
                      <div className={s.timelineDot}></div>
                    </div>
                    <div className={s.entryContainer}>
                      <div className={s.dateMobile}>
                        <h3 className='m-0'>
                          {entry.date.toDate().toLocaleDateString('de-DE')}
                        </h3>
                      </div>
                      <Entry entry={entry} />
                    </div>
                  </div>
                  <SpacerRow />
                </>
              </FadeIn>
            );
          })
        : null}
    </div>
  );
};

export default Chronik;
