import { Timestamp } from 'firebase/firestore';
import { ReactElement, useRef } from 'react';
import parseHTML from 'html-react-parser';
import useOnScreen from '../../hooks/useOnScreen';
import s from './style.module.scss';
import cN from 'classnames';

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
  const refTop = useRef(null);
  const topIsVisible = useOnScreen(refTop);

  const refBottom = useRef(null);
  const bottomIsVisible = useOnScreen(refBottom);

  const dateHR = entry.date
    ? new Date(entry.date.toDate()).toLocaleDateString('de-DE')
    : new Date().toLocaleDateString('de-DE');

  return (
    <div
      ref={refTop}
      className={cN(s.entry, {
        [s.notInView]: !topIsVisible,
      })}>
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
      {entry.label && <p>Kategorie: {entry.label}</p>}
    </div>
  );
};
