import { FC } from 'react';
import './styles.scss';
import TempToggle from 'components/TempToggle';
import ThemeToggle from 'components/ThemeToggle';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <ThemeToggle />
        <TempToggle />
      </div>
    </header>
  );
};

export default Header;
