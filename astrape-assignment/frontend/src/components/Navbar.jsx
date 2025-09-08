import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            ShopEasy
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/products"
              className="text-gray-700 hover:text-blue-600 pb-1 border-b-2 border-transparent hover:border-blue-600"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-blue-600 pb-1 border-b-2 border-transparent hover:border-blue-600 flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-1" />
              Cart ({getItemCount()})
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700">{user?.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-600 hover:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white border-t border-gray-200">
        <div className="flex">
          <Link
            to="/products"
            className="flex-1 py-3 text-center text-gray-700 hover:bg-blue-50 hover:text-blue-600"
          >
            Products
          </Link>
          <Link
            to="/cart"
            className="flex-1 py-3 text-center text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Cart ({getItemCount()})
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;