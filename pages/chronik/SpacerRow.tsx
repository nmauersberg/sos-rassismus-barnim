import { ReactElement } from 'react';
import s from './style.module.scss';

export const SpacerRow = (): ReactElement => {
  return (
    <div className={s.chronicleEmptyRow}>
      <div className={s.dateDesktop}>
        <h3 className='m-0'></h3>
      </div>
      <div className={s.timeline}>
        <div className={s.timelineLine}></div>
      </div>
      <div className={s.entryContainer}>
        <div className={s.dateMobile}>
          <h3 className='m-0'></h3>
        </div>
      </div>
    </div>
  );
};
