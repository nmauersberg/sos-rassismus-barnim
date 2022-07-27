import s from './style.module.scss';
import es from '../../components/Timeline/style.module.scss';
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
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { updateDocument } from '../../firebase/docUtils';
import { EntryEditor } from '../../components/Timeline/EntryEditor';
import { SettingsContext } from '../../context/SettingsContext';

const auth = getAuth(firebase);

const Chronik = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { settings } = useContext(SettingsContext);
  const [addEntry, setAddEntry] = useState<boolean>(false);
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
      return { id: entry.id, ...entry.data() } as _Entry;
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

  // const updateEntries = () => {
  //   mappedEntries.map(async (e) => {
  //     const transformed = { ...e };
  //     if (e.extraContent && typeof e.extraContent === 'string') {
  //       transformed.extraContent = [e.extraContent];
  //     } else {
  //       transformed.extraContent = [];
  //     }
  //     transformed.title.trim();
  //     // await updateEntry('entries', transformed);
  //     console.log(e);
  //   });
  // };

  const selectedYear =
    typeof router.query.year === 'string' && router.query.year !== 'alle-jahre'
      ? parseInt(router.query.year)
      : 'alle-jahre';

  const publicEntries = user
    ? mappedEntries
    : mappedEntries.filter((e) =>
        settings.publishedYears.includes(e.date.toDate().getFullYear())
      );

  const pageEntries =
    !user &&
    typeof selectedYear === 'number' &&
    !settings.publishedYears.includes(selectedYear)
      ? []
      : publicEntries.filter((e) =>
          selectedYear === 'alle-jahre'
            ? true
            : e.date.toDate().getFullYear() === selectedYear
        );

  if (!pageEntries || pageEntries.length === 0) {
    return (
      <h2 className={'text-center m-8'}>Keine Einträge für {selectedYear}</h2>
    );
  }

  return (
    <div className={s.timelinePage}>
      <div className={cN('pageWidth', s.chronicles)}>
        {user && !addEntry && (
          <div className={s.actionRow}>
            <button onClick={() => setAddEntry(true)}>Neuer Eintrag</button>
            {/* <button onClick={() => updateEntries()}>Update Entries</button> */}
          </div>
        )}
        <FadeIn delay={getDelay()}>
          <SpacerRow />
        </FadeIn>
        {addEntry && (
          <EntryWrapper label={'Anlegen'}>
            <div className={cN(es.entry, 'p-4')}>
              <EntryEditor setAddEntry={setAddEntry} />
            </div>
          </EntryWrapper>
        )}
        {pageEntries.map((entry, index) => {
          return (
            <FadeIn delay={getDelay()} key={`${entry.id}-${index}`}>
              <EntryWrapper
                label={entry.date.toDate().toLocaleDateString('de-DE')}>
                <Entry entry={entry} />
              </EntryWrapper>
            </FadeIn>
          );
        })}
      </div>
    </div>
  );
};

type EntryWrapperProps = { label: string; children: ReactElement };

const EntryWrapper = ({ label, children }: EntryWrapperProps) => {
  return (
    <>
      <div className={s.chronicleRow}>
        <div className={s.dateDesktop}>
          <h3 className='m-0'>{label}</h3>
        </div>
        <div className={s.timeline}>
          <div className={s.timelineLine}></div>
          <div className={s.timelineDot}></div>
        </div>
        <div className={s.entryContainer}>
          <div className={s.dateMobile}>
            <h3 className='m-0'>{label}</h3>
          </div>
          {children}
        </div>
      </div>
      <SpacerRow />
    </>
  );
};

export default Chronik;
