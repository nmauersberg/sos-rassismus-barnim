import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TagColor } from '../components/Tag';
import firebase from '../firebase/clientApp';
import Settings from '../pages/einstellungen';

export type Category = {
  label: string;
  value: string;
  color: TagColor;
};

export type Settings = {
  pages: string[];
  publishedYears: number[];
  categories: Category[];
};

type SettingsContext = {
  settings: Settings;
  updateSettings: (settings: Settings) => void;
};

const defaultSettings: Settings = {
  pages: [],
  publishedYears: [],
  categories: [],
};

const defaultContext: SettingsContext = {
  settings: defaultSettings,
  updateSettings: (s: Settings) => {},
};

export const SettingsContext = createContext<SettingsContext>(defaultContext);

const db = getFirestore(firebase);

const getSettings = async (): Promise<Settings> => {
  const docRef = doc(db, 'settings', '4VotbNdMDI1TcNr13CLu');
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Settings;
};

export function SettingsProvider({ children }: any) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    getSettings().then((s) => setSettings(s));
  }, []);

  const updateSettings = async (settings: Settings) => {
    try {
      await setDoc(doc(db, 'settings', '4VotbNdMDI1TcNr13CLu'), settings);
      getSettings().then((s) => setSettings(s));
      toast.success('Eintrag gespeichert!');
    } catch (error) {
      toast.error(
        `Einstellungen konnten nicht gespeichert werden. Fehler: ${error}`
      );
    }
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
