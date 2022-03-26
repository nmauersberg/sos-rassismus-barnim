import { FadeIn, getIncrementor } from 'anima-react';
import { ReactElement, useContext } from 'react';
import s from './style.module.scss';
import { useRouter } from 'next/router';
import cN from 'classnames';
import { AuthContext } from '../../../context/AuthContext';

export const Header = (): ReactElement => {
  const { user, toggleEditPage } = useContext(AuthContext);
  const router = useRouter();
  const getTitleDelay = getIncrementor(0, 0.02);

  return (
    <div className={s.header}>
      <div className={cN('pageWidth', 'justify-between')}>
        <button className='noStyleButton' onClick={() => router.push('/')}>
          <div className={s.pageTitle}>
            {'SOS Rassismus Barnim'.split(' ').map((word, wordIndex) => {
              return (
                <span key={wordIndex} className={s.pageTitleWord}>
                  {word.split('').map((char, charIndex) => {
                    return (
                      <FadeIn key={charIndex} delay={getTitleDelay()}>
                        <h1 className={wordIndex === 0 ? s.sosFlash : ''}>
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
        <div className='flex'>
          {user && (
            <FadeIn orientation='right' delay={0.25}>
              <button
                className={cN('noStyleButton', s.menuEntry)}
                onClick={() => toggleEditPage()}>
                Seite bearbeiten
              </button>
            </FadeIn>
          )}
          <FadeIn orientation='right' delay={0.25}>
            <button
              className={cN('noStyleButton', s.menuEntry)}
              onClick={() => router.push('chronik')}>
              Chroniken
            </button>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};
