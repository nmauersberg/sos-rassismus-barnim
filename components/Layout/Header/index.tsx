import { FadeIn, getIncrementor } from 'anima-react';
import { ReactElement } from 'react';

export const Header = (): ReactElement => {
  const getTitleDelay = getIncrementor(0, 0.01);

  return (
    <div style={{ display: 'flex' }}>
      {'SOS Rassismus Barnim'.split(' ').map((word, index) => {
        return (
          <p key={index} style={{ display: 'flex', marginRight: '0.5rem' }}>
            {word.split('').map((char, index) => {
              return (
                <FadeIn key={index} delay={getTitleDelay()}>
                  <h1>{char}</h1>
                </FadeIn>
              );
            })}
          </p>
        );
      })}
    </div>
  );
};
