import { Timestamp } from 'firebase/firestore';
import { ReactElement, useRef } from 'react';
import parseHTML from 'html-react-parser';
import useOnScreen from '../../hooks/useOnScreen';
import s from './style.module.scss';
import cN from 'classnames';

export type _Entry = {
  id: string;
  title: string;
  content: string;
  date: Timestamp;
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
      <p>Date: {dateHR}</p>
    </div>
  );
};
