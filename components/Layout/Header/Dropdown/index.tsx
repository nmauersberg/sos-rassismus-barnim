import s from './style.module.scss';
import classNames from 'classnames';
import { ReactElement } from 'react';

type DropdownProps = {
  label: ReactElement | ReactElement[] | string;
  children?: ReactElement | ReactElement[] | string;
};

export const Dropdown = ({ label, children }: DropdownProps) => {
  return (
    <div className={classNames(s.dropdown, 'items-center')}>
      <div>{label}</div>
      <div className={s.dropdownContent}>{children}</div>
    </div>
  );
};
