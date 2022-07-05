import { FadeIn, getIncrementor } from 'anima-react';
import { ReactElement, useContext } from 'react';
import s from './style.module.scss';
import { useRouter } from 'next/router';
import cN from 'classnames';
import { AuthContext } from '../../../context/AuthContext';
import { AdminMenu } from './AdminMenu';
import { Dropdown } from './Dropdown';
import { SettingsContext } from '../../../context/SettingsContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { getFirestore, collection } from 'firebase/firestore';
import firebase from '../../../firebase/clientApp';

export const Header = (): ReactElement => {
  const { user } = useContext(AuthContext);
  const { settings } = useContext(SettingsContext);

  const router = useRouter();
  const getTitleDelay = getIncrementor(0, 0.02);

  const [entries] = useCollection(
    collection(getFirestore(firebase), 'entries'),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const availableYears = entries
    ? [
        ...new Set(
          entries.docs.map((e) => e.data().date.toDate().getFullYear())
        ),
      ].sort()
    : [];

  const years = user ? availableYears : settings.publishedYears;

  return (
    <div className={s.header}>
      <div
        className={cN(
          'pageWidth',
          'justify-between',
          'items-center',
          'h-full'
        )}>
        <button className='noStyleButton' onClick={() => router.push('/')}>
          <div className={s.pageTitle}>
            {'SOS Rassismus Barnim'.split(' ').map((word, wordIndex) => {
              return (
                <span key={wordIndex} className={s.pageTitleWord}>
                  {word.split('').map((char, charIndex) => {
                    return (
                      <FadeIn key={charIndex} delay={getTitleDelay()}>
                        <h1
                          className={cN(
                            s.pageTitleLetter,
                            wordIndex === 0 ? s.sosFlash : ''
                          )}>
                          {char}
                        </h1>
                      </FadeIn>
                    );
                  })}
                </span>
              );
            })}
          </div>
        </button>
        <div className='grow'></div>
        <div className={s.optionRow}>
          <FadeIn orientation='right' delay={0.25}>
            <button
              className={cN('noStyleButton', s.menuEntry)}
              onClick={() => router.push('/kontakt')}>
              Kontakt & Links
            </button>
          </FadeIn>
          <Dropdown
            label={
              <FadeIn orientation='right' delay={0.25}>
                <button
                  className={cN('noStyleButton', s.menuEntry)}
                  // onClick={() => router.push('chronik')}
                >
                  Chroniken
                </button>
              </FadeIn>
            }>
            {years.map((year) => {
              return (
                <div key={year}>
                  <button
                    className={cN('noStyleButton', s.menuEntry)}
                    onClick={() => router.push(`/chronik/${year}`)}>
                    Chronik {year}
                  </button>
                </div>
              );
            })}
          </Dropdown>
          {user && <AdminMenu />}
        </div>
      </div>
    </div>
  );
};
