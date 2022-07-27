import { SetStateAction, useEffect, useState } from 'react';
import { TiptapNoMenu } from '../Editor/Tiptap';

type ExtraContentProps = {
  extraContent: string[];
  setExtraContent: React.Dispatch<SetStateAction<string[]>>;
  index: number;
  extra: string;
  spliceExtraContent: number;
  setSpliceExtraContent: React.Dispatch<SetStateAction<number>>;
};

export const ExtraContent = ({
  extraContent,
  setExtraContent,
  index,
  extra,
  spliceExtraContent,
  setSpliceExtraContent,
}: ExtraContentProps) => {
  const updateExtra = (extra: string) => {
    const updated = extraContent.map((el, i) => {
      return i === index ? extra : el;
    });
    setExtraContent(updated);
  };

  const removeContent = (index: number) => {
    setSpliceExtraContent(spliceExtraContent + 1);
    const update = [...extraContent];
    update.splice(index, 1);
    setExtraContent(update);
  };

  return (
    <div className='my-2'>
      <div className='mb-1'>
        <label>Nachtrag {index + 1}:</label>
        <button className='ml-2' onClick={() => removeContent(index)}>
          Nachtrag {index + 1} entfernen
        </button>
      </div>
      <TiptapNoMenu content={extra} updateContent={updateExtra} />
    </div>
  );
};
