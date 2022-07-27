import { useEditor, EditorContent, JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import s from './style.module.scss';

type TiptapNoMenuProps = {
  content: string | JSONContent;
  updateContent: (content: string) => void;
};

export const TiptapNoMenu = ({ content, updateContent }: TiptapNoMenuProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate({ editor }) {
      updateContent(editor.getHTML());
    },
  });

  console.log(editor?.getJSON());

  return (
    <div>
      <EditorContent editor={editor} className={s.editor} />
    </div>
  );
};
