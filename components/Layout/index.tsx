import { ReactElement } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children: ReactElement;
};

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};
