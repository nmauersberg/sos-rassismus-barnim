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
import { FadeIn, getIncrementor } from 'anima-react';
import { LoadingAnimation } from '../../components/LoadingAnimation/index';
import cN from 'classnames';
import { SpacerRow } from './SpacerRow';

const auth = getAuth(firebase);

const Chronik = () => {
  const db = getFirestore(firebase);

  const getDelay = getIncrementor(0, 0.1);

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
    return <LoadingAnimation />;
  }

  return (
    <div className={cN('pageWidth', s.chronicles)}>
      <FadeIn delay={getDelay()}>
        <SpacerRow />
      </FadeIn>
      {entries
        ? entries.docs.map((entry, index) => {
            const data = entry.data() as _Entry;
            return (
              <FadeIn delay={getDelay()} key={`${data.id}-${index}`}>
                <div className={s.chronicleRow}>
                  <div className={s.dateDesktop}>
                    <h3 className='m-0'>
                      {data.date.toDate().toLocaleDateString('de-DE')}
                    </h3>
                  </div>
                  <div className={s.timeline}>
                    <div className={s.timelineLine}></div>
                    <div className={s.timelineDot}></div>
                  </div>
                  <div className={s.entryContainer}>
                    <div className={s.dateMobile}>
                      <h3 className='m-0'>
                        {data.date.toDate().toLocaleDateString('de-DE')}
                      </h3>
                    </div>
                    <Entry entry={data} />
                  </div>
                </div>
              </FadeIn>
            );
          })
        : null}
      <FadeIn delay={getDelay()}>
        <SpacerRow />
      </FadeIn>
    </div>
  );
};

export default Chronik;
