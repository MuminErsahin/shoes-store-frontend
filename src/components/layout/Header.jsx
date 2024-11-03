import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../hooks/useCart';

const Header = () => {
  const { user, logout, hasRole } = useAuth();
  const { items } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const isAdmin = hasRole('ROLE_ADMIN');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-1 flex justify-center">
          <Link to="/" className="text-2xl font-bold">
            SHOES STORE
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4 flex-1 justify-center">
          <Link to="/category/sport" className="text-gray-600 hover:text-gray-900">Sport</Link>
          <Link to="/category/casual" className="text-gray-600 hover:text-gray-900">Casual</Link>
          <Link to="/category/classic" className="text-gray-600 hover:text-gray-900">Classic</Link>
          <div className="relative">
            <form onSubmit={handleSearch}>
              <input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-4 py-1 rounded-full bg-gray-100 focus:bg-white"
              />
              <button type="submit">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </button>
            </form>
          </div>
        </nav>

      
        <div className="flex items-center space-x-4 flex-1 justify-end">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-5 h-5" />
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
          {user ? (
            <div className="flex items-center space-x-4">
              {isAdmin && (
                <Link 
                  to="/admin"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Admin Panel
                </Link>
              )}
              <div className="flex items-center space-x-2">
                <Link to="/profile">
                  <User className="w-5 h-5" />
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="text-gray-600 hover:text-gray-900">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;