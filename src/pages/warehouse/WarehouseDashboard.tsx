import React, { useState, useEffect } from 'react';
import { 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign,
  ArrowUp,
  ArrowDown,
  Plus
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../../lib/warehouse-supabase';
import { DashboardStats } from '../../types/warehouse';

const WarehouseDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalValue: 0,
    lowStockItems: 0,
    recentMovements: 0,
    topCategories: [],
    stockLevels: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchDashboardStats();
    } else {
      // Mock data when Supabase is not configured
      setStats({
        totalProducts: 156,
        totalValue: 45230.50,
        lowStockItems: 12,
        recentMovements: 34,
        topCategories: [
          { category: 'Electronics', count: 45, value: 15000 },
          { category: 'Furniture', count: 32, value: 12000 },
          { category: 'Tools', count: 28, value: 8500 },
        ],
        stockLevels: [
          { date: '2024-01-01', in: 120, out: 85 },
          { date: '2024-01-02', in: 95, out: 110 },
          { date: '2024-01-03', in: 140, out: 95 },
          { date: '2024-01-04', in: 110, out: 125 },
          { date: '2024-01-05', in: 130, out: 100 },
        ],
      });
      setLoading(false);
    }
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch basic stats
      const [productsResult, movementsResult] = await Promise.all([
        supabase.from('products').select('*'),
        supabase.from('movements').select('*').gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      ]);

      const products = productsResult.data || [];
      const recentMovements = movementsResult.data || [];

      const totalProducts = products.length;
      const lowStockItems = products.filter(p => p.current_stock <= p.min_stock).length;
      const totalValue = products.reduce((sum, p) => sum + (p.current_stock * (p.weight_kg * 10)), 0); // Mock value calculation

      setStats({
        totalProducts,
        totalValue,
        lowStockItems,
        recentMovements: recentMovements.length,
        topCategories: [], // Would need to join with categories
        stockLevels: [], // Would need to aggregate movements by date
      });
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: Package,
      color: 'blue',
      change: '+12%',
      changeType: 'increase' as const,
    },
    {
      title: 'Total Value',
      value: `$${stats.totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'green',
      change: '+8.2%',
      changeType: 'increase' as const,
    },
    {
      title: 'Low Stock Items',
      value: stats.lowStockItems.toString(),
      icon: AlertTriangle,
      color: 'red',
      change: '-5%',
      changeType: 'decrease' as const,
    },
    {
      title: 'Recent Movements',
      value: stats.recentMovements.toString(),
      icon: TrendingUp,
      color: 'purple',
      change: '+15%',
      changeType: 'increase' as const,
    },
  ];

  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-6 h-32"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to your warehouse management system</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div className={`flex items-center text-sm font-medium ${
                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'increase' ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {[
              { action: 'Product Added', item: 'Wireless Headphones', time: '2 hours ago', type: 'success' },
              { action: 'Stock Movement', item: 'Office Chair - OUT', time: '4 hours ago', type: 'warning' },
              { action: 'Low Stock Alert', item: 'USB Cables', time: '6 hours ago', type: 'error' },
              { action: 'Product Updated', item: 'Laptop Stand', time: '1 day ago', type: 'info' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'success' ? 'bg-green-500' :
                  activity.type === 'warning' ? 'bg-yellow-500' :
                  activity.type === 'error' ? 'bg-red-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Top Categories</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Manage
            </button>
          </div>
          <div className="space-y-4">
            {stats.topCategories.length > 0 ? stats.topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                <div>
                  <p className="font-medium text-gray-900">{category.category}</p>
                  <p className="text-sm text-gray-600">{category.count} items</p>
                </div>
                <p className="font-semibold text-gray-900">${category.value.toLocaleString()}</p>
              </div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No categories data available</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group">
            <Plus className="h-6 w-6 text-gray-400 group-hover:text-blue-500 mr-2" />
            <span className="text-gray-600 group-hover:text-blue-600 font-medium">Add Product</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group">
            <TrendingUp className="h-6 w-6 text-gray-400 group-hover:text-green-500 mr-2" />
            <span className="text-gray-600 group-hover:text-green-600 font-medium">Record Movement</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
            <AlertTriangle className="h-6 w-6 text-gray-400 group-hover:text-purple-500 mr-2" />
            <span className="text-gray-600 group-hover:text-purple-600 font-medium">View Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarehouseDashboard;