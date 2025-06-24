import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Package, Plus, Trash2, Leaf, TrendingUp, AlertCircle } from 'lucide-react';
import { calculateCO2Savings } from '../utils/volumeCalculator';
import BoxSavingFlow from '../components/BoxSavingFlow/BoxSavingFlow';
import ConfirmDialog from '../components/ConfirmDialog';

interface Box {
  id: string;
  width_cm: number;
  height_cm: number;
  depth_cm: number;
  volume_l: number;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { user, loading: authLoading, isSupabaseConfigured: authSupabaseConfigured } = useAuth();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBoxFlowOpen, setIsBoxFlowOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; boxId: string | null }>({
    isOpen: false,
    boxId: null,
  });

  const fetchBoxes = useCallback(async () => {
    if (!user || !isSupabaseConfigured) return;

    setLoading(true);
    setError('');
    
    try {
      const { data, error } = await supabase
        .from('boxes')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching boxes:', error);
        setError(error.message);
      } else {
        setBoxes(data || []);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Failed to fetch boxes');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && !authLoading && isSupabaseConfigured) {
      fetchBoxes();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading, fetchBoxes]);

  const handleDeleteBox = async (boxId: string) => {
    if (!isSupabaseConfigured) {
      setError('Database connection not configured');
      return;
    }

    try {
      const { error } = await supabase
        .from('boxes')
        .delete()
        .eq('id', boxId)
        .eq('user_id', user?.id);

      if (error) {
        console.error('Error deleting box:', error);
        setError(error.message);
      } else {
        setBoxes(prevBoxes => prevBoxes.filter(box => box.id !== boxId));
        setDeleteConfirm({ isOpen: false, boxId: null });
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Failed to delete box');
    }
  };

  const handleBoxFlowClose = useCallback(() => {
    setIsBoxFlowOpen(false);
    if (user && isSupabaseConfigured) {
      fetchBoxes();
    }
  }, [user, fetchBoxes]);

  // Calculate stats
  const totalVolume = boxes.reduce((sum, box) => sum + box.volume_l, 0);
  const totalCO2Savings = boxes.reduce((sum, box) => sum + calculateCO2Savings(box.volume_l), 0);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please sign in to access your dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
            <p className="text-gray-600">Manage your saved boxes and track your environmental impact</p>
          </div>

          {/* Supabase Connection Warning */}
          {!isSupabaseConfigured && (
            <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-yellow-600 mr-2" />
                <div>
                  <p className="text-yellow-800 font-medium">Database Not Connected</p>
                  <p className="text-yellow-700 text-sm">
                    To save and manage your boxes, please connect to Supabase using the "Connect to Supabase" button in the top right.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Boxes</p>
                  <p className="text-2xl font-bold text-gray-900">{boxes.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Volume</p>
                  <p className="text-2xl font-bold text-gray-900">{totalVolume.toFixed(1)}L</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">CO₂ Savings Potential</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCO2Savings}g</p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {/* Boxes List */}
          <div className="bg-white rounded-xl shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Your Saved Boxes</h2>
              <button
                onClick={() => setIsBoxFlowOpen(true)}
                disabled={!isSupabaseConfigured}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Box
              </button>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading your boxes...</p>
                </div>
              ) : boxes.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No boxes saved yet</h3>
                  <p className="text-gray-600 mb-6">
                    {isSupabaseConfigured 
                      ? "Start by adding your first box to track your environmental impact"
                      : "Connect to Supabase to start saving and managing your boxes"
                    }
                  </p>
                  {isSupabaseConfigured && (
                    <button
                      onClick={() => setIsBoxFlowOpen(true)}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      Add Your First Box
                    </button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Dimensions (W×H×D)</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Volume</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">CO₂ Savings</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Date Added</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {boxes.map((box) => (
                        <tr key={box.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <span className="font-medium text-gray-900">
                              {box.width_cm} × {box.height_cm} × {box.depth_cm} cm
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-emerald-600 font-medium">{box.volume_l}L</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="text-green-600 font-medium">
                              {calculateCO2Savings(box.volume_l)}g
                            </span>
                          </td>
                          <td className="py-4 px-4 text-gray-600">
                            {new Date(box.created_at).toLocaleDateString()}
                          </td>
                          <td className="py-4 px-4">
                            <button
                              onClick={() => setDeleteConfirm({ isOpen: true, boxId: box.id })}
                              className="text-red-600 hover:text-red-800 transition-colors"
                              title="Delete box"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <BoxSavingFlow 
        isOpen={isBoxFlowOpen} 
        onClose={handleBoxFlowClose}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        title="Delete Box"
        message="Are you sure you want to delete this box? This action cannot be undone."
        onConfirm={() => deleteConfirm.boxId && handleDeleteBox(deleteConfirm.boxId)}
        onCancel={() => setDeleteConfirm({ isOpen: false, boxId: null })}
      />
    </>
  );
};

export default Dashboard;