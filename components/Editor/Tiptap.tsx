import { useEditor, EditorContent, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import rs from './ButtonRow.module.scss';
import s from './style.module.scss';
import cN from 'classnames';

export const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: `
    <h2>SOS-Rassismus Barnim Chronik 2019</h2>
    <p>30. Juni 2020</p>
    <p>
      Schweigen schützt nicht, stützt aber die Gewalt.<br />
      Diskriminierungen gehen uns alle an.
    </p>
    <p>
      <strong>
        Chronik rechtsextremer und rassistischer Vorfälle im Barnim 2019
      </strong>
    </p>
    <p>Bundespräsident Frank-Walter Steinmeier am 16. Juni 2020:</p>
    <p>Rassismus in jeder Form ist Feind der Demokratie.</p>
    <p>
      Rassismus will keinen Dialog, keine Vielfalt, kein friedliches Miteinander. Er
      will Hass auf andere und Dominanz über andere.
    </p>
    <p>
      Solange es Rassismus gibt in unserer Gesellschaft, in unserem Umfeld, in
      unserer Nachbarschaft, vor allem aber in unseren eigenen Einstellungen,
      Vorurteilen, Denkmustern, können wir uns nicht teilnahmslos verhalten. Sondern
      wir entscheiden uns – jeden Tag, bewusst oder unbewusst, in unserem Handeln
      wie in unserem Nichthandeln –, wo wir stehen, auf welcher Seite wir stehen.
    </p>
    <p>
      „Your silence will not protect you“, schrieb die amerikanische Aktivistin und
      Autorin Audre Lorde. Dein Schweigen wird dich nicht schützen.
    </p>
    <p>
      Nein, es reicht nicht aus, „kein Rassist“ zu sein. Wir müssen Antirassisten
      sein! (Quelle)
    </p>
    <p><strong>Über diese Chronik</strong></p>
    <p>
      Die Gruppe SOS Rassismus Barnim dokumentiert rassistische Vorfälle im Barnim
      und will damit zu einer gesellschaftlichen Sichtbarkeit von Rassismus
      beitragen. Welcher Vorfall als rassistischer Übergriff gilt, wird definiert
      durch die jeweilige Person, die davon betroffen ist. Wir sehen eine
      Unmöglichkeit darin, einen von uns oder Anderen definierten Rahmen von
      rassistischen Übergriffen zu setzen. Dies würde zur Unsichtbarmachung von
      Diskriminierungen führen und damit dem Rassismus Vorschub leisten.<br />Wir
      wissen, dass durch diese Dokumentation nur ein Bruchteil der alltäglichen,
      rassistischen Übergriffe aufgezeigt werden kann. Diese Chronik ist
      unvollständig, da wir nur die Fälle dokumentieren können, die uns bekannt
      wurden. Die Dunkelziffer liegt weitaus höher.<br />Rassismus ist ein
      Bestandteil rechtsextremer Ideologie, kommt aber auch ohne diese aus. Nicht
      jede*r Rassist*in ist rechtsextrem, aber jede*r Rechtsextreme ist rassistisch.
      Aufgrund dieser Verflechtung haben wir uns dafür entschieden, auch rechte bzw.
      rechtsextreme Vorfälle in die Chronik aufzunehmen.<br />Institutioneller /
      strukturell bedingter Rassismus wird meist reflexartig relativiert oder
      gänzlich geleugnet. Wenn Menschen in Institutionen, die der Allgemeinheit
      dienen und die Würde aller Menschen schützen sollten, indirekt oder direkt
      diskriminieren und notwendige Veränderungen bestreiten/behindern, leisten sie
      keinen Beitrag zur Überwindung von Rassismus. Dann sind sie nicht Teil der
      Lösung, sondern Teil des Problems und brauchen demokratische Veränderungen.
    </p>
    <p>
      Weitere Informationen, sowie die Chroniken der Jahre 2015 bis 2018 finden Sie
      auf:<br />http://refugeeswelcomebarnim.blogsport.de/<br />Kontakt:
      rassismus.barnim@gmail.com
    </p>
    <p>
      Sprechstunde: Jeden ersten Donnerstag im Monat, 17:00 – 18:00 Uhr,<br />im
      Palanca e.V., Coppistraße 1, 16227 Eberswalde
    </p>
    <p><strong>Rassismus passt in keine Broschüre…</strong></p>
    <p>
      Die hier veröffentlichten rassistischen Angriffe sind inakzeptabel. Es liegt
      nahe, sie zu verurteilen und sich damit gegen Rassismus positioniert zu haben.
      Allerdings sind diese An-griffe längst nicht alles, was Rassismus ausmacht.
      Vielmehr sind verbale Pöbeleien und körperliche Angriffe lediglich
      offensichtliche Erscheinungsformen von Rassismus.<br />In Deutschland wird
      häufig angenommen, dass es sich bei Rassismus um individuelle, bewusste
      Fehltritte handelt. Die Fälle hier könnten dann gelesen werden als Angriffe
      intoleranter Deppen.<br />Das greift aber zu kurz. Rassismus ist weder
      individuell, noch muss eine Absicht/Intention hinter rassistischem Handeln
      stehen. Stattdessen müssen wir Rassismus als eine Herrschaftsform verstehen,
      die historisch entstanden ist und bis heute die gesamte Gesellschaft
      durchzieht.<br />Die hier genannten Übergriffe stellen also lediglich die
      Spitze des Eisbergs dar. Es genügt nicht, sie als Angriffe Einzelner zu
      verurteilen. Stattdessen muss eine ernstgemeinte Auseinandersetzung mit
      Rassismus die eigene rassistische Sozialisation hinterfragen und
      Gesellschaftskritik üben. Die Grundlagen müssen dabei die Perspektiven
      Schwarzer Menschen/People of Color sein.<br />Buchtipps zum Thema Rassimus für
      „weiße“ Menschen:
    </p>
    <p>
      • exitRacism – rassismuskritisch denken lernen (Anti-Ra-Trainerin Tupoka
      Ogette)<br />• Wer hat Angst vorm schwarzen Mann (Gert Schramm, 1928-2016, mit
      15 J. ins KZ)<br />• Unter Weißen (Journalist Mohamed Amjahid)
    </p>
    <p>
      Anmerkung zur Schreibweise:<br />Die Begriffe Schwarze Menschen und People of
      Color sind Selbstbezeichnungen und beziehen sich auf gemachte
      Rassismuserfahrungen von Menschen. Schwarz wird bewusst groß und weiß kursiv
      geschrieben um deutlich zu machen, dass es sich um eine politische
      Zuschreibung, und nicht um eine Farbbezeichnung handelt.
    </p>
    <p>Für die Übersichtlichkeit dieser Chronik unterteilen wir in</p>
    <p>• Verbale und physische Gewalt</p>
    <p>• „Mikroaggressionen“ – ausgrenzende Botschaften</p>
    <p>• Rechte Propaganda und Sachbeschädigungen</p>
    <p>• Strukturelle Probleme und Nachtrag aus 2018</p>
    
    `,
  });

  // console.log(editor?.getHTML());

  return (
    <div className={s.editor}>
      {/* <MenuBar editor={editor} edit={edit} /> */}
      <EditorContent editor={editor} />
    </div>
  );
};

type MenuBarProps = { editor: Editor | null };

const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={s.buttonRow}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cN(s.rowButton, editor.isActive('bold') ? 'is-active' : '')}>
        bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cN(
          s.rowButton,
          editor.isActive('italic') ? 'is-active' : ''
        )}>
        italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={cN(
          s.rowButton,
          editor.isActive('strike') ? 'is-active' : ''
        )}>
        strike
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={cN(s.rowButton, editor.isActive('code') ? 'is-active' : '')}>
        code
      </button>
      {/* <button
        className={s.rowButton}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}>
        clear marks
      </button>
      <button
        className={s.rowButton}
        onClick={() => editor.chain().focus().clearNodes().run()}>
        clear node
      </button> */}
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={cN(
          s.rowButton,
          editor.isActive('paragraph') ? 'is-active' : ''
        )}>
        paragraph
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cN(
          s.rowButton,
          editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
        )}>
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cN(
          s.rowButton,
          editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
        )}>
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cN(
          s.rowButton,
          editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
        )}>
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={cN(
          s.rowButton,
          editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
        )}>
        h4
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={cN(
          s.rowButton,
          editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
        )}>
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={cN(
          s.rowButton,
          editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
        )}>
        h6
      </button> */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cN(
          s.rowButton,
          editor.isActive('bulletList') ? 'is-active' : ''
        )}>
        bullet list
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cN(
          s.rowButton,
          editor.isActive('orderedList') ? 'is-active' : ''
        )}>
        ordered list
      </button>
      {/* <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={cN(
          s.rowButton,
          editor.isActive('codeBlock') ? 'is-active' : ''
        )}>
        code block
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={cN(
          s.rowButton,
          editor.isActive('blockquote') ? 'is-active' : ''
        )}>
        blockquote
      </button> */}
      <button
        className={s.rowButton}
        onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        horizontal rule
      </button>
      {/* <button
        className={s.rowButton}
        onClick={() => editor.chain().focus().setHardBreak().run()}>
        hard break{' '}
      </button> */}
      <button
        className={s.rowButton}
        onClick={() => editor.chain().focus().undo().run()}>
        undo{' '}
      </button>
      <button
        className={s.rowButton}
        onClick={() => editor.chain().focus().redo().run()}>
        redo{' '}
      </button>
    </div>
  );
};
