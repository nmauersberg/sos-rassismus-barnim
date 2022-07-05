import { _Entry } from './Entry';
import { SetStateAction, useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import Select, { MultiValue, OnChangeValue } from 'react-select';
import { Category } from '../../context/SettingsContext';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import firebase from '../../firebase/clientApp';
import toast from 'react-hot-toast';
import { TiptapNoMenu } from '../Editor/Tiptap';
import { ExtraContent } from './ExtraContent';
import { TimeInput } from './TimeInput';
import s from './style.module.scss';

type EmptyEntry = Omit<_Entry, 'id' | 'date'> & {
  id: null;
  date: null;
};

type EntryEditorProps = {
  entry?: _Entry;
  setEditEntry?: React.Dispatch<SetStateAction<boolean>>;
  setAddEntry?: React.Dispatch<SetStateAction<boolean>>;
};

export const EntryEditor = ({
  entry: _entry,
  setEditEntry,
  setAddEntry,
}: EntryEditorProps) => {
  const entry: EmptyEntry | _Entry = _entry || {
    title: '',
    location: '',
    source: '',
    content: '',
    extraContent: [],
    categories: [],
    date: null,
    id: null,
  };
  const [categories, mapCategory, mapValue] = useCategories();
  const [title, setTitle] = useState(entry.title);
  const [location, setLocation] = useState(entry.location);
  const [source, setSource] = useState(entry.source);
  const [content, setContent] = useState(entry.content);
  const [extraContent, setExtraContent] = useState<Array<string>>(
    entry.extraContent
  );

  const entryStartDate = entry.date?.toDate();

  const [startDay, setStartDay] = useState<number | undefined>(
    entryStartDate?.getDate()
  );
  const [startMonth, setStartMonth] = useState<number | undefined>(
    entryStartDate ? entryStartDate?.getMonth() + 1 : undefined
  );
  const [startYear, setStartYear] = useState<number | undefined>(
    entryStartDate?.getFullYear()
  );

  const entryEndDate = entry.endDate?.toDate();

  const [endDay, setEndDay] = useState<number | undefined>(
    entryEndDate?.getDate()
  );
  const [endMonth, setEndMonth] = useState<number | undefined>(
    entryEndDate ? entryEndDate?.getMonth() + 1 : undefined
  );
  const [endYear, setEndYear] = useState<number | undefined>(
    entryEndDate?.getFullYear()
  );

  const parseDate = (d: number, m: number, y: number) => {
    return new Date(`${m}/${d}/${y}`);
  };

  const [selectedCategories, setSelectedCategories] = useState<
    MultiValue<Category>
  >(entry.categories.map(mapCategory));

  const onChange = (selectedOptions: OnChangeValue<Category, true>) =>
    setSelectedCategories(selectedOptions);

  const db = getFirestore(firebase);

  const updateEntry = async () => {
    if (
      entry &&
      entry.id &&
      setEditEntry &&
      startDay &&
      startMonth &&
      startYear
    ) {
      const date = parseDate(startDay, startMonth, startYear);
      const endDate =
        endDay && endMonth && endYear
          ? parseDate(endDay, endMonth, endYear)
          : null;
      await setDoc(doc(db, 'entries', entry.id), {
        title,
        location,
        source,
        content,
        extraContent,
        categories: selectedCategories.map(mapValue),
        date: Timestamp.fromDate(date),
        endDate: endDate ? Timestamp.fromDate(endDate) : null,
      });
      toast.success('Eintrag gespeichert!');
      setEditEntry(false);
    } else {
      toast.error('Bitte ein Datum angeben!');
    }
  };

  const addEntry = async () => {
    if (startDay && startMonth && startYear && setAddEntry) {
      const date = parseDate(startDay, startMonth, startYear);
      const endDate =
        endDay && endMonth && endYear
          ? parseDate(endDay, endMonth, endYear)
          : null;
      await addDoc(collection(db, 'entries'), {
        title,
        location,
        source,
        categories: selectedCategories.map(mapValue),
        content,
        extraContent,
        date: Timestamp.fromDate(date),
        endDate: endDate ? Timestamp.fromDate(endDate) : null,
      });
      toast.success('Eintrag hinzugefügt!');
      setAddEntry(false);
    } else {
      toast.error('Bitte ein Datum angeben!');
    }
  };

  const handleDelete = async () => {
    if (setEditEntry) {
      if (entry && entry.id) {
        if (window.confirm('Den Eintrag wirklich löschen?')) {
          await deleteDoc(doc(db, 'entries', entry.id));
          toast.success('Eintrag gelöscht!');
        }
      }
    } else if (setAddEntry) {
      setAddEntry(false);
    }
  };

  const handleSave = () => {
    if (setEditEntry) {
      updateEntry();
    } else if (setAddEntry) {
      addEntry();
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
        <label>
          Titel (<span style={{ color: 'firebrick' }}>*</span>):
        </label>
        <input
          placeholder='Titel'
          className='text-lg mb-2 w-full'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className='mb-6'>
        <label>
          Kategorie (<span style={{ color: 'firebrick' }}>*</span>):
        </label>
        <Select
          isMulti
          defaultValue={selectedCategories}
          onChange={onChange}
          options={categories}
          placeholder={'Kategorie auswählen...'}
          styles={{
            control: (provided) => ({
              ...provided,
              border: '1px solid black',
              '&:hover': {
                border: '1px solid black',
              },
            }),
          }}
        />
      </div>
      <div className='mt-2 mb-6'>
        <label>
          Eintrag (<span style={{ color: 'firebrick' }}>*</span>):
        </label>
        <TiptapNoMenu content={content} updateContent={setContent} />
      </div>
      <div className='mt-2 mb-4'>
        <label>
          Ort (<span style={{ color: 'firebrick' }}>*</span>):
        </label>
        <input
          placeholder='Ort'
          className='text-lg mb-2 w-full'
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>
      <div className='mt-2 mb-4'>
        <label>Quelle (optional):</label>
        <input
          placeholder='Quelle'
          className='text-lg mb-2 w-full'
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>
      <label>Nachträge (optional):</label>
      {extraContent.map((extra, index) => (
        <ExtraContent
          key={extra.substring(0, 10) + index}
          extra={extra}
          index={index}
          extraContent={extraContent}
          setExtraContent={setExtraContent}
        />
      ))}
      <div>
        <button
          onClick={() => {
            const update = [...extraContent];
            update.push('');
            setExtraContent(update);
          }}>
          Einen Nachtrag hinzufügen
        </button>
      </div>
      <div className='mt-6 mb-2 flex space-between'>
        <div>
          <label>
            Datum Anfang (<span style={{ color: 'firebrick' }}>*</span>):
          </label>
          <TimeInput
            day={startDay}
            month={startMonth}
            year={startYear}
            setDay={setStartDay}
            setMonth={setStartMonth}
            setYear={setStartYear}
          />
        </div>
        <div className='pl-8'>
          <label>Datum Ende (optional):</label>
          <TimeInput
            day={endDay}
            month={endMonth}
            year={endYear}
            setDay={setEndDay}
            setMonth={setEndMonth}
            setYear={setEndYear}
          />
        </div>
      </div>
    </>
  );
};
