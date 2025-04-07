
import React, { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  Settings, 
  Menu, 
  X,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RootState } from '@/store';
import { useDispatch } from 'react-redux';
import { logout } from '@/store/slices/authSlice';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  
  const isAdmin = user?.role === 'admin';
  
  // Redirect if not authenticated or not admin
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Orders', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Customers', href: '/admin/customers', icon: Users },
    // { name: 'Categories', href: '/admin/categories', icon: Tag },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];
  
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`bg-gray-900 text-white ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {isSidebarOpen && (
            <Link to="/admin" className="text-xl font-bold">Admin Panel</Link>
          )}
          <button 
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-700 transition-colors"
            aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        <nav className="flex-grow py-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-3 ${
                    isSidebarOpen ? 'justify-start' : 'justify-center'
                  } ${
                    isActiveLink(item.href)
                      ? 'bg-primary text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  } rounded-md transition-colors`}
                >
                  <item.icon size={20} className={isSidebarOpen ? 'mr-3' : ''} />
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-gray-700">
          <Button 
            variant="destructive" 
            className={`w-full flex items-center ${isSidebarOpen ? 'justify-start' : 'justify-center'}`}
            onClick={() => dispatch(logout())}
          >
            <LogOut size={20} className={isSidebarOpen ? 'mr-2' : ''} />
            {isSidebarOpen && <span>Logout</span>}
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="py-4 px-6 flex items-center justify-between">
            <h1 className="text-xl font-semibold">
              {navigation.find(item => isActiveLink(item.href))?.name || 'Admin'}
            </h1>
            
            <div className="flex items-center">
              <Link to="/" className="text-sm text-primary hover:underline mr-4">
                View Website
              </Link>
              
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                  <span className="text-xs font-medium">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                
                {user?.name && (
                  <span className="text-sm font-medium">{user.name}</span>
                )}
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
