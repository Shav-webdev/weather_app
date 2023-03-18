import { FC, ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ children }: SectionProps) => {
  return <section className={'section'}>{children}</section>;
};

export const Content: FC<SectionProps> = ({ children }: SectionProps) => {
  return <div className={'content'}>{children}</div>;
};

export default Section;
