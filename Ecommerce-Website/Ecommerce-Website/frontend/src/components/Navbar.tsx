import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useContext } from 'react';
import AppContext from '../utils/AppContext';
import logo from '../assets/logo_Kora.png'; 

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
    </Link>
  );
};

const IconButton = ({
  icon: Icon,
  to = '#',
  cartItemCount = 0,
}: {
  icon: React.ElementType;
  to?: string;
  cartItemCount?: number;
}) => (
  <Link
    to={to}
    className="relative p-2 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
  >
    <Icon size={20} />
    {cartItemCount > 0 && (
      <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-[#3A3845] text-white text-xs leading-tight text-center">
        {cartItemCount}
      </span>
    )}
  </Link>
);

function Navbar() {
  const { cartItems } = useContext(AppContext); // Access cartItems from context
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total items in cart

  return (
    <nav className="bg-white shadow-md sticky top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <img src={logo} alt="Kora Logo" className="h-8 w-8" /> 
            <span className="ml-2 text-xl font-bold">Kora</span>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/shop">Shop</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <IconButton icon={ShoppingCart} to="/cart" cartItemCount={totalItems} />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
