import Icon from '@mdi/react';
import { mdiAccountCircle } from '@mdi/js';
import s from './style.module.scss';
import classNames from 'classnames';
import { ReactElement, useContext } from 'react';
import { useRouter } from 'next/router';
import { Dropdown } from '../Dropdown';
import { ZoomIn } from 'anima-react';
import firebase from '../../../../firebase/clientApp';
import { getAuth, signOut } from 'firebase/auth';
import { AuthContext } from '../../../../context/AuthContext';

const auth = getAuth(firebase);

export const AdminMenu = () => {
  const { toggleEditPage, editPage } = useContext(AuthContext);
  const router = useRouter();

  const adminOptions = [
    {
      label: editPage ? 'Seite bearbeiten AUS' : 'Seite bearbeiten EIN',
      action: () => toggleEditPage(),
    },
    { label: 'Einstellungen', action: () => router.push('/einstellungen') },
    { label: 'Abmelden', action: () => signOut(auth) },
  ];

  return (
    <Dropdown
      label={
        <ZoomIn delay={0.25}>
          <div className='items-center'>
            <Icon
              path={mdiAccountCircle}
              size={1.5}
              color={'firebrick'}
              title={'Seite bearbeiten'}
            />
          </div>
        </ZoomIn>
      }>
      {adminOptions.map((option, index) => (
        <Option key={`${option}-${index}`} option={option} />
      ))}
    </Dropdown>
  );
};

type OptionProps = {
  option: {
    label: string;
    action: () => void;
  };
};

const Option = ({ option }: OptionProps): ReactElement => {
  const { label, action } = option;
  return (
    <div>
      <button
        className={classNames('noStyleButton', s.menuEntry)}
        onClick={() => action()}>
        <span className={s.optionLabel}>{label}</span>
      </button>
    </div>
  );
};
