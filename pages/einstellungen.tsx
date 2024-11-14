import { getAuth } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../firebase/clientApp';
import { useRouter } from 'next/router';
import { Section, SectionsText } from '../components/ContentBuilder/Section';
import { SectionWrapper } from '../components/ContentBuilder/Section/SectionWrapper';
import { SectionContent } from '../components/ContentBuilder/Section/SectionContent';
import { SettingsContext } from '../context/SettingsContext';
import type { Category } from '../context/SettingsContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, getFirestore } from 'firebase/firestore';
import Switch from 'react-switch';
import { AuthContext } from '../context/AuthContext';
import { Tag, TagColor, tagColors } from '../components/Tag';
import { Dropdown } from '../components/Layout/Header/Dropdown';
import { downloadBlob } from '../backup/backup-data';
import { _Entry } from '../components/Timeline/Entry';

const auth = getAuth(firebase);

const Settings = () => {
  const { editPage } = useContext(AuthContext);
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  return (
    <>
      <Section section={section} editSections={editPage} />

      <SectionWrapper
        title='Öffentliche Chroniken'
        colorScheme='colorSchemeRed'>
        <SectionContent>
          <EditPublicChronicles />
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper title='Kategorien' colorScheme='colorSchemeWhite'>
        <SectionContent>
          <EditCategories />
        </SectionContent>
      </SectionWrapper>

      <SectionWrapper title='Backup Manager' colorScheme='colorSchemeBlack'>
        <SectionContent>
          <BackupManager />
        </SectionContent>
      </SectionWrapper>
    </>
  );
};

const EditPublicChronicles = () => {
  const { settings, updateSettings } = useContext(SettingsContext);
  const [entries] = useCollection(
    collection(getFirestore(firebase), 'entries'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const availableYears = entries
    ? [
        ...new Set(
          entries.docs.map((e) => e.data().date.toDate().getFullYear())
        ),
      ].sort()
    : [];

  return (
    <>
      <p>
        Die hier aktivierten Jahre sind als Chronik öffentlich zugänglich. Wenn
        die Bearbeitung abgeschlossen ist, kann die Chronik hier veröffentlicht
        werden.
      </p>
      <p>
        Neu angelegte Jahre erscheinen automatisch, sobald ein Eintrag mit
        entsprechendem Datum angelegt wurde. Standardmäßig sind die Chroniken
        zuerst nicht öffentlich, sondern werden hier manuell freigeschaltet.
      </p>
      {availableYears.map((year) => {
        return (
          <div key={year} className='justify-between w-32 h-12 items-center'>
            <b>{year}</b>
            <Switch
              onChange={() => {
                if (settings.publishedYears.includes(year)) {
                  const newSettings = {
                    ...settings,
                    publishedYears: settings.publishedYears.filter(
                      (y) => y !== year
                    ),
                  };
                  updateSettings(newSettings);
                } else {
                  const newSettings = { ...settings };
                  newSettings.publishedYears.push(year);
                  updateSettings(newSettings);
                }
              }}
              checked={settings.publishedYears.includes(year)}
            />
          </div>
        );
      })}
    </>
  );
};

const EditCategories = () => {
  const { settings, updateSettings } = useContext(SettingsContext);
  const [unsavedCategories, setUnsavedCategories] = useState<Array<Category>>(
    []
  );

  const categories = settings.categories.concat(unsavedCategories);

  const handleCategoryUpdate = (newCategory: Category, index: number) => {
    if (newCategory.value.substring(0, 7) === 'unsaved') {
      const resetUnsaved = unsavedCategories.filter(
        (c) => c.value !== newCategory.value
      );
      setUnsavedCategories(resetUnsaved);
      newCategory.value = `cat${settings.categories.length + 1}`;
      const newCats = [...settings.categories];
      newCats.push(newCategory);
      const update = { ...settings, categories: newCats };
      updateSettings(update);
    } else {
      const newCats = [...settings.categories];
      newCats[index] = newCategory;
      const update = { ...settings, categories: newCats };
      updateSettings(update);
    }
  };

  return (
    <>
      <div>
        {categories.map((category: Category, index: number) => {
          return (
            <Category
              key={category.value}
              category={category}
              index={index}
              updateSettings={handleCategoryUpdate}
            />
          );
        })}
        <button
          className='mt-2'
          onClick={() => {
            const update = [...unsavedCategories];
            update.push({
              label: 'Neue Kategorie',
              color: '#A188A6',
              value: 'unsaved' + unsavedCategories.length,
            });
            setUnsavedCategories(update);
          }}>
          Kategorie hinzufügen
        </button>
      </div>
    </>
  );
};

type CategoryProps = {
  category: Category;
  index: number;
  updateSettings: (cat: Category, index: number) => void;
};

const Category = ({ category, index, updateSettings }: CategoryProps) => {
  const [editCategory, setEditCategory] = useState(
    category.value.substring(0, 7) === 'unsaved' ? true : false
  );
  const [newLabel, setNewLabel] = useState(category.label);
  const [newColor, setNewColor] = useState(category.color);

  return (
    <div className={'categoryRow my-2 items-center'}>
      <Tag label={newLabel} color={newColor} />
      {editCategory && (
        <>
          <input
            className='w-128 text-lg'
            onChange={(e) => setNewLabel(e.target.value)}
            value={newLabel}
          />
          <Dropdown label={<ColorDot color={newColor} />}>
            <div className='flex'>
              {tagColors.map((color, index) => (
                <button
                  key={color + index}
                  className='noStyleButton'
                  onClick={() => setNewColor(color)}>
                  <div className='m-2'>
                    <ColorDot color={color} />
                  </div>
                </button>
              ))}
            </div>
          </Dropdown>
        </>
      )}
      {!editCategory ? (
        <button onClick={() => setEditCategory(!editCategory)}>
          Bearbeiten
        </button>
      ) : (
        <button
          onClick={() => {
            updateSettings(
              { ...category, label: newLabel, color: newColor },
              index
            );
            setEditCategory(!editCategory);
          }}>
          Speichern
        </button>
      )}
    </div>
  );
};

const ColorDot = ({ color }: { color: TagColor }) => {
  return (
    <div
      style={{
        background: color,
        width: '1.5rem',
        height: '1.5rem',
        borderRadius: '50%',
      }}
    />
  );
};

const BackupManager = () => {
  // Setings
  const { settings } = useContext(SettingsContext);

  // Timeline entries
  const [entries] = useCollection(
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

  // Pages
  const [documents, loading, error] = useCollection(
    collection(getFirestore(firebase), 'sections'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const sections = documents
    ? documents.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Section;
      })
    : null;

  const downloadBackup = () => {
    const blob = new Blob(
      [
        JSON.stringify({
          settings,
          pageSections: sections,
          timeline: mappedEntries,
        }),
      ],
      {
        type: 'application/json',
      }
    );
    downloadBlob(blob);
  };

  return (
    <>
      <p>Backup aller Daten in einer Datei:</p>
      <button onClick={() => downloadBackup()}>Backup herunterladen</button>
    </>
  );
};

const description: SectionsText = {
  id: 'settingsDescription',
  sort: 0,
  overrideLayout: null,
  index: 0,
  groupElement: false,
  content:
    '<p>Hier sind die Einstellungen zu finden. Veröffentlichte Chroniken, Kategoriebezeichnungen und ähnliches.</p>',
  collection: 'sectionsText',
};

const section: Section = {
  id: 'settings',
  title: 'Einstellungen',
  sort: 0,
  status: 'Published',
  layout: '100',
  colorScheme: 'colorSchemeBlack',
  render: [description],
  page: 'settings',
};

export default Settings;
