import { FadeIn, getIncrementor } from 'anima-react';
import { ReactElement } from 'react';
import s from './style.module.scss';
import { useRouter } from 'next/router';
import cN from 'classnames';

export const Header = (): ReactElement => {
  const router = useRouter();
  const getTitleDelay = getIncrementor(0, 0.02);

  return (
    <div className={s.header}>
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
      <FadeIn orientation='right' delay={0.25}>
        <button
          className={cN('noStyleButton', s.menuEntry)}
          onClick={() => router.push('timeline')}>
          Chroniken
        </button>
      </FadeIn>
    </div>
  );
};
