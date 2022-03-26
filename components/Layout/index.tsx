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
      <div className={s.layout}>
        <Header />
        <div className={s.content}>{children}</div>
      </div>
      <Footer />
    </>
  );
};
