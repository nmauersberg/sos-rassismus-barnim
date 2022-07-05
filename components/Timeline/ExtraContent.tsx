import { SetStateAction, useEffect, useState } from 'react';
import { TiptapNoMenu } from '../Editor/Tiptap';

type ExtraContentProps = {
  extraContent: string[];
  setExtraContent: React.Dispatch<SetStateAction<string[]>>;
  index: number;
  extra: string;
};

export const ExtraContent = ({
  extraContent,
  setExtraContent,
  index,
  extra: _extra,
}: ExtraContentProps) => {
  const [extra, setExtra] = useState(_extra);

  useEffect(() => {
    const update = [...extraContent];
    update[index] = extra;
    setExtraContent(update);
  }, [extra]);

  const removeContent = (index: number) => {
    const update = [...extraContent];
    update.splice(index, 1);
    setExtraContent(update);
  };

  return (
    <div className='my-2' key={index}>
      <div className='mb-1'>
        <label>Nachtrag {index + 1}:</label>
        <button className='ml-2' onClick={() => removeContent(index)}>
          Nachtrag {index + 1} entfernen
        </button>
      </div>
      <TiptapNoMenu content={extra} updateContent={setExtra} />
    </div>
  );
};
