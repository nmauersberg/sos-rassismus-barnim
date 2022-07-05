import { useContext } from 'react';
import { Category, SettingsContext } from '../context/SettingsContext';

export const useCategories = (): [
  Category[],
  (value: string) => Category,
  (category: Category) => string
] => {
  const { settings } = useContext(SettingsContext);
  return [
    settings.categories,
    (value) => settings.categories.find((c) => c.value === value) as Category,
    (category) => category.value,
  ];
};
