import { ReactElement } from 'react';
import { Footer } from './Footer';
import { Header } from './Header';

type LayoutProps = {
  children: ReactElement;
};

export const Layout = ({ children }: LayoutProps): ReactElement => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
