import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path) => {
    return location.pathname === path ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700';
  };

  return (
    <div className="flex h-screen">
     
      <div className="w-64 bg-gray-900">
        <div className="flex items-center justify-between p-4 bg-gray-800">
          <h2 className="text-white text-xl font-semibold">Admin Panel</h2>
        </div>
        <nav className="mt-8">
          <Link
            to="/admin"
            className={`flex items-center px-6 py-3 ${isActive('/admin')}`}
          >
            Dashboard
          </Link>
          <Link
            to="/admin/products"
            className={`flex items-center px-6 py-3 ${isActive('/admin/products')}`}
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className={`flex items-center px-6 py-3 ${isActive('/admin/orders')}`}
          >
            Orders
          </Link>
          <Link
            to="/"
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700"
          >
            Return to Store
          </Link>
          <button
            onClick={logout}
            className="flex items-center px-6 py-3 text-gray-300 hover:bg-gray-700 w-full text-left"
          >
            Logout
          </button>
        </nav>
      </div>

    
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;