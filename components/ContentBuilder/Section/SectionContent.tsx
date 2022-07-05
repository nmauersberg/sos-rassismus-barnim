import { ReactElement } from 'react';

type SectionContentProps = {
  children: ReactElement | ReactElement[] | string;
};

export const SectionContent = ({ children }: SectionContentProps) => {
  return <div className='p-4'>{children}</div>;
};
