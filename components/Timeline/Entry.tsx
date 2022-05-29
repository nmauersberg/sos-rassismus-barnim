import { ReactElement, SetStateAction, useState } from 'react';
import parseHTML from 'html-react-parser';
import s from './style.module.scss';
import cN from 'classnames';
import { useInView } from 'react-intersection-observer';
import { Dropdown } from '../Dropdown';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../../firebase/clientApp';
import { getAuth } from 'firebase/auth';
import {
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { TiptapNoMenu } from '../Editor/Tiptap';

const auth = getAuth(firebase);

export type _Entry = {
  id: string;
  date: Timestamp;
  title: string;
  content: string;
  extraContent?: string;
  location?: string;
  source?: string;
  label?: string;
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

type EntryContentProps = {
  entry: _Entry;
};

const EntryContent = ({ entry }: EntryContentProps) => {
  return (
    <>
      <h2>{entry.title}</h2>
      {parseHTML(entry.content)}
      {entry.location && (
        <>
          <span>Ort: {entry.location}</span>
          <br />
        </>
      )}
      {entry.source && (
        <>
          <span>Quelle: {entry.source}</span>
          <br />
          <br />
        </>
      )}
      {entry.extraContent && (
        <span>Nachtrag: {parseHTML(entry.extraContent)}</span>
      )}
      {entry.label && <p>Kategorie: {mapLabelOptions(entry.label)}</p>}
    </>
  );
};

type EntryEditorProps = {
  entry?: _Entry;
  setEditEntry?: React.Dispatch<SetStateAction<boolean>>;
  setAddEntry?: React.Dispatch<SetStateAction<boolean>>;
};

export const EntryEditor = ({
  entry,
  setEditEntry,
  setAddEntry,
}: EntryEditorProps) => {
  const [title, setTitle] = useState(entry?.title || '');
  const [location, setLocation] = useState(entry?.location || '');
  const [source, setSource] = useState(entry?.source || '');
  const [content, setContent] = useState(entry?.content || '');
  const [extraContent, setExtraContent] = useState(entry?.extraContent || '');

  const entryDate = entry?.date.toDate();

  const [day, setDay] = useState<number | undefined>(entryDate?.getDate());
  const [month, setMonth] = useState<number | undefined>(
    entryDate ? entryDate?.getMonth() + 1 : undefined
  );
  const [year, setYear] = useState<number | undefined>(
    entryDate?.getFullYear()
  );

  const handleCappedInput = (
    val: number,
    max: number,
    set: React.Dispatch<SetStateAction<number | undefined>>
  ) => {
    if (!val) {
      return set(undefined);
    }
    if (val <= max) {
      return set(val);
    }
    return set(max);
  };

  const parseDate = (d: number, m: number, y: number) => {
    return new Date(`${m}/${d}/${y}`);
  };

  const [label, setLabel] = useState(entry?.label || '');
  const handleChange = (event: { target: { value: string } }) => {
    setLabel(event.target.value);
  };

  const db = getFirestore(firebase);

  const updateEntry = async () => {
    if (entry && day && month && year) {
      const date = parseDate(day, month, year);
      await setDoc(doc(db, 'entries', entry.id), {
        title,
        location,
        source,
        label,
        content,
        extraContent,
        date: Timestamp.fromDate(date),
      });
    }
  };

  const handleDelete = async () => {
    if (setEditEntry) {
      if (entry) {
        await deleteDoc(doc(db, 'entries', entry.id));
      }
    } else if (setAddEntry) {
      setAddEntry(false);
    }
  };

  const handleSave = () => {
    if (setEditEntry) {
      updateEntry();
      setEditEntry(false);
    } else if (setAddEntry) {
      console.log('Add Entry');
      setAddEntry(false);
    }
  };

  const handleCancel = () => {
    if (setEditEntry) {
      setEditEntry(false);
    } else if (setAddEntry) {
      setAddEntry(false);
    }
  };

  return (
    <>
      <div className={s.actionRow}>
        <button onClick={() => handleDelete()}>Löschen</button>
        <button onClick={() => handleSave()}>Speichern</button>
        <button onClick={() => handleCancel()}>Abbrechen</button>
      </div>
      <div className='mb-4'>
        <label>Titel:</label>
        <input
          placeholder='Titel'
          className='text-lg mb-2 w-full'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mt-2 mb-6'>
        <label>Eintrag:</label>
        <TiptapNoMenu content={content} updateContent={setContent} />
      </div>
      <div className='mt-2 mb-4'>
        <label>Ort:</label>
        <input
          placeholder='Ort'
          className='text-lg mb-2 w-full'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='mt-2 mb-4'>
        <label>Quelle:</label>
        <input
          placeholder='Quelle'
          className='text-lg mb-2 w-full'
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>
      <div className='my-2'>
        <label>Nachtrag:</label>
        <TiptapNoMenu content={extraContent} updateContent={setExtraContent} />
      </div>
      <div className='mt-6 mb-2 flex space-between'>
        <Dropdown
          label={'Kategorie:'}
          value={label}
          options={labelOptions}
          onChange={handleChange}
        />
        <div className='pl-4'>
          <label>Datum:</label>
          <div className='w-full flex'>
            <input
              placeholder='TT'
              value={day}
              onChange={(e) =>
                handleCappedInput(parseInt(e.target.value), 31, setDay)
              }
              type='number'
              className='text-lg w-16 mr-2'
            />
            <input
              placeholder='MM'
              value={month}
              onChange={(e) =>
                handleCappedInput(parseInt(e.target.value), 31, setMonth)
              }
              type='number'
              className='text-lg w-16 mr-2'
            />
            <input
              placeholder='JJJJ'
              value={year}
              onChange={(e) =>
                handleCappedInput(parseInt(e.target.value), 2100, setYear)
              }
              type='number'
              className='text-lg w-24'
            />
          </div>
        </div>
      </div>
    </>
  );
};

const labelOptions = [
  {
    label: 'Verbale und physische Gewalt',
    value: 'cat1',
  },
  {
    label: '"Mikroaggressionen" - ausgrenzende Botschaften',
    value: 'cat2',
  },
  {
    label: 'Rechte Propaganda und Sachbeschädigungen',
    value: 'cat3',
  },
  {
    label: 'Strukturelle Probleme und Nachtrag aus Vorjahren',
    value: 'cat4',
  },
];

const mapLabelOptions = (val: string) => {
  switch (val) {
    case 'cat1':
      return labelOptions[0].label;
    case 'cat2':
      return labelOptions[1].label;
    case 'cat3':
      return labelOptions[2].label;
    case 'cat4':
      return labelOptions[3].label;
  }
};
