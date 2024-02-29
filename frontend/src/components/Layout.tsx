// components/Layout.js
import Navbar from './Navbar';

type Props = {
  children: React.ReactNode; // Or the specific type of your children
}



const Layout: React.FC<Props> = ({ children }) => {

  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
