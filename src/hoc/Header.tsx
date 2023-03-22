import { FC } from 'react';
import './styles.scss';
import ThemeToggle from 'components/ThemeToggle';
import TempSelect from 'components/TempSelect';

const Header: FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <TempSelect />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
