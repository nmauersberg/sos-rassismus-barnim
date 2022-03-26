import { FadeIn } from 'anima-react';
import { ReactElement } from 'react';
import s from './style.module.scss';

export const Footer = (): ReactElement => {
  return (
    <FadeIn delay={0.25} orientation='up' duration={0.25} distance={25}>
      <div className={s.footer}>
        © {new Date().getFullYear()} - SOS Rassismus Barnim{' '}
      </div>
    </FadeIn>
  );
};
