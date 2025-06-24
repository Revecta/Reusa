import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useWarehouseAuth } from './hooks/useWarehouseAuth';
import WarehouseLayout from './components/layout/WarehouseLayout';
import AuthPage from './pages/auth/AuthPage';
import WarehouseDashboard from './pages/warehouse/WarehouseDashboard';

// Placeholder components for other routes
const ProductsPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Products</h1><p>Products management coming soon...</p></div>;
const MovementsPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Movements</h1><p>Stock movements coming soon...</p></div>;
const LocationsPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Locations</h1><p>Location management coming soon...</p></div>;
const CategoriesPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Categories</h1><p>Category management coming soon...</p></div>;
const ReportsPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Reports</h1><p>Reports and analytics coming soon...</p></div>;
const UsersPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Users</h1><p>User management coming soon...</p></div>;
const SettingsPage = () => <div className="p-6"><h1 className="text-2xl font-bold">Settings</h1><p>Settings coming soon...</p></div>;

function App() {
  const { loading } = useWarehouseAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/warehouse" element={<WarehouseLayout />}>
          <Route index element={<WarehouseDashboard />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="movements" element={<MovementsPage />} />
          <Route path="locations" element={<LocationsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/" element={<Navigate to="/warehouse" replace />} />
      </Routes>
    </Router>
  );
}

export default App;