import { ReactElement } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';
import s from './style.module.scss';

type LayoutProps = {
  children: ReactElement;
};

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <div className={s.content}>{children}</div>
      </div>
      <Footer />
    </>
  );
};
