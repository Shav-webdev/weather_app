import { FC, ReactNode } from 'react';
import './styles.scss';

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }: MainProps) => {
  return (
    <main className="main">
      <div className="main-content">{children}</div>
    </main>
  );
};

export default Main;
