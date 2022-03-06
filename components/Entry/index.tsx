import { Timestamp } from 'firebase/firestore';
import { ReactElement } from 'react';
import parseHTML from 'html-react-parser';

export type _Entry = {
  id: string;
  title: string;
  content: string;
  date: Timestamp;
};

type EntryProps = { entry: _Entry };

export const Entry = ({ entry }: EntryProps): ReactElement => {
  const dateHR = entry.date
    ? new Date(entry.date.toDate()).toLocaleDateString('de-DE')
    : new Date().toLocaleDateString('de-DE');

  return (
    <>
      <h2>{entry.title}</h2>
      {parseHTML(entry.content)}
      <p>Date: {dateHR}</p>
    </>
  );
};
