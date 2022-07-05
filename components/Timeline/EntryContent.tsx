import { useCategories } from '../../hooks/useCategories';
import { Tag } from '../Tag';
import parseHTML from 'html-react-parser';
import { _Entry } from './Entry';
import s from './style.module.scss';

type EntryContentProps = {
  entry: _Entry;
};

export const EntryContent = ({ entry }: EntryContentProps) => {
  const [, mapCategory] = useCategories();
  const entryCategories = entry.categories.map(mapCategory);

  return (
    <>
      <h2 className='mb-2'>{entry.title}</h2>
      <div className={'categoryRow'}>
        {entryCategories.map((category, index) => (
          <Tag key={index} label={category.label} color={category.color} />
        ))}
      </div>
      <br />
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
      {entry.extraContent.map((extra, index) => {
        return (
          <div key={index}>
            <span>
              Nachtrag {index + 1}: {parseHTML(extra)}
            </span>
          </div>
        );
      })}
    </>
  );
};
