import { FadeIn, getIncrementor } from 'anima-react';
import { ReactElement, useContext } from 'react';
import s from './style.module.scss';
import { useRouter } from 'next/router';
import cN from 'classnames';
import { AuthContext } from '../../../context/AuthContext';
import { mdiCogOutline } from '@mdi/js';
import { NoSsr } from '../../ContentBuilder/Util/NoSsr';
import Icon from '@mdi/react';

export const Header = (): ReactElement => {
  const { user, toggleEditPage, editPage } = useContext(AuthContext);
  const router = useRouter();
  const getTitleDelay = getIncrementor(0, 0.02);

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
              onClick={() => router.push('chronik')}>
              Kontakt
            </button>
          </FadeIn>
          <FadeIn orientation='right' delay={0.25}>
            <button
              className={cN('noStyleButton', s.menuEntry)}
              onClick={() => router.push('chronik')}>
              Chroniken
            </button>
          </FadeIn>
        </div>
        {user && (
          <FadeIn orientation='right' delay={0.25}>
            <button
              className={cN('noStyleButton', s.menuEntry)}
              onClick={() => toggleEditPage()}>
              <NoSsr>
                <Icon
                  className='pt-2'
                  path={mdiCogOutline}
                  size={1.5}
                  color={editPage ? 'firebrick' : 'black'}
                  title={'Seite bearbeiten'}
                />
              </NoSsr>
            </button>
          </FadeIn>
        )}
      </div>
    </div>
  );
};
