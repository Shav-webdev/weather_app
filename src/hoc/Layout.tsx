import { FC, ReactNode } from 'react';
import './styles.scss';
import Main from './Main';
import Header from './Header';
import Footer from './Footer';
import Section from './Section';

interface LayoutProps {
  children?: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-wrapper">
      <div className="main-wrapper">
        <Header />
        <Main>
          <div className="element" id="containerElement">
            <Section>{children}</Section>
          </div>
        </Main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
