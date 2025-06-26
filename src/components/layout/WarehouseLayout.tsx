import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Package, 
  BarChart3, 
  Users, 
  Settings, 
  Bell, 
  Menu, 
  X, 
  LogOut,
  Home,
  Archive,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useWarehouseAuth } from '../../hooks/useWarehouseAuth';

const WarehouseLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, profile, signOut, loading } = useWarehouseAuth();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/warehouse', icon: Home },
    { name: 'Products', href: '/warehouse/products', icon: Package },
    { name: 'Movements', href: '/warehouse/movements', icon: TrendingUp },
    { name: 'Locations', href: '/warehouse/locations', icon: MapPin },
    { name: 'Categories', href: '/warehouse/categories', icon: Archive },
    { name: 'Reports', href: '/warehouse/reports', icon: BarChart3 },
    { name: 'Users', href: '/warehouse/users', icon: Users, adminOnly: true },
    { name: 'Settings', href: '/warehouse/settings', icon: Settings },
  ];

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const filteredNavigation = navigation.filter(item => 
    !item.adminOnly || (profile?.role === 'ADMIN')
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 z-50 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="fixed inset-y-0 left-0 flex w-64 flex-col bg-white shadow-xl">
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <div className="flex items-center">
              <img 
                src="/images/reusa-logo.svg" 
                alt="Reusa Logo" 
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-emerald-600">Inventory</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex flex-col flex-grow bg-white border-r border-gray-200">
          <div className="flex h-16 items-center px-4 border-b border-gray-200">
            <img 
              src="/images/reusa-logo.svg" 
              alt="Reusa Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-emerald-600">Inventory</span>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            {filteredNavigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-600 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex items-center space-x-4">
              <button className="text-gray-400 hover:text-gray-600 relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {profile?.full_name || user.email}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">
                    {profile?.role?.toLowerCase()}
                  </p>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default WarehouseLayout;