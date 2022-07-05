import classNames from 'classnames';
import { ReactElement } from 'react';
import s from '../../pages/chronik/style.module.scss';

export const SpacerRow = (): ReactElement => {
  return (
    <div className={classNames(s.chronicleEmptyRow, 'pageWidth')}>
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
