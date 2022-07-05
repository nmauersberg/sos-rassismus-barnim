import { ReactElement, useState } from 'react';
import s from './style.module.scss';
import cN from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/clientApp';
import { getAuth } from 'firebase/auth';
import { Timestamp } from 'firebase/firestore';
import { EntryEditor } from './EntryEditor';
import { EntryContent } from './EntryContent';

const auth = getAuth(firebase);

export type _Entry = {
  id: string;
  date: Timestamp;

  title: string;
  content: string;
  extraContent: string[];
  categories: string[];
  location?: string;
  source?: string;
  endDate?: Timestamp | null;
};

type EntryProps = { entry: _Entry };

export const Entry = ({ entry }: EntryProps): ReactElement => {
  const [editEntry, setEditEntry] = useState(false);
  const [user] = useAuthState(auth);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const dateHR = entry.date
    ? new Date(entry.date.toDate()).toLocaleDateString('de-DE')
    : new Date().toLocaleDateString('de-DE');

  return (
    <div
      ref={ref}
      className={cN(s.entry, {
        [s.notInView]: !inView,
      })}>
      <div className='p-4'>
        {user && !editEntry && (
          <div className={s.actionRow}>
            <button onClick={() => setEditEntry(true)}>Bearbeiten</button>
          </div>
        )}
        {!editEntry ? (
          <EntryContent entry={entry} />
        ) : (
          <EntryEditor entry={entry} setEditEntry={setEditEntry} />
        )}
      </div>
    </div>
  );
};
