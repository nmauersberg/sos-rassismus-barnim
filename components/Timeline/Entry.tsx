import { Timestamp } from 'firebase/firestore';
import { ReactElement, useRef } from 'react';
import parseHTML from 'html-react-parser';
import s from './style.module.scss';
import cN from 'classnames';
import { useInView } from 'react-intersection-observer';

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
    </div>
  );
};
