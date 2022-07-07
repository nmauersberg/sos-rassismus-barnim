import { createContext, useState } from 'react';
import { TagColor } from '../components/Tag';
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
  pages: ['start', 'einstellungen', 'kontakt', 'chronik', 'login'],
  publishedYears: [2021],
  categories: [
    {
      label: 'Verbale und physische Gewalt',
      value: 'cat1',
      color: '#B22222',
    },
    {
      label: '"Mikroaggressionen" - ausgrenzende Botschaften',
      value: 'cat2',
      color: '#539987',
    },
    {
      label: 'Rechte Propaganda und Sachbeschädigungen',
      value: 'cat3',
      color: '#3A3042',
    },
    {
      label: 'Struktureller / Institutioneller Rassismus',
      value: 'cat4',
      color: '#6279B8',
    },
    {
      label: 'Menschliche Einblicke',
      value: 'cat5',
      color: '#A188A6',
    },
  ],
};

const defaultContext: SettingsContext = {
  settings: defaultSettings,
  updateSettings: (s: Settings) => {},
};

export const SettingsContext = createContext<SettingsContext>(defaultContext);

export function SettingsProvider({ children }: any) {
  const [settings, setSettings] = useState<Settings>(defaultSettings);
  const updateSettings = (settings: Settings) => {
    setSettings(settings);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}
