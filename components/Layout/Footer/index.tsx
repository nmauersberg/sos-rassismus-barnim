import { ReactElement } from 'react';
import s from './style.module.scss';

export const Footer = (): ReactElement => {
  return (
    <div className={s.footer}>
      © {new Date().getFullYear()} - SOS Rassismus Barnim{' '}
    </div>
  );
};
