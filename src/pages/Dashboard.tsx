import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Package, Plus, Recycle, Leaf, TrendingUp, CheckCircle } from 'lucide-react';
import { calculateCO2Savings } from '../utils/volumeCalculator';
import BoxSavingFlow from '../components/BoxSavingFlow/BoxSavingFlow';
import ConfirmDialog from '../components/ConfirmDialog';
import DashboardLayout from '../components/DashboardLayout';

interface Box {
  id: string;
  width_cm: number;
  height_cm: number;
  depth_cm: number;
  volume_l: number;
  created_at: string;
  reused?: boolean; // Track if box has been reused
}

const Dashboard: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBoxFlowOpen, setIsBoxFlowOpen] = useState(false);
  const [reuseConfirm, setReuseConfirm] = useState<{ isOpen: boolean; boxId: string | null }>({
    isOpen: false,
    boxId: null,
  });
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBoxes = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError('');
    
    try {
      if (isSupabaseConfigured) {
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
      } else {
        // Enhanced mock data for demo with reused status
        setBoxes([
          {
            id: '1',
            width_cm: 30,
            height_cm: 20,
            depth_cm: 15,
            volume_l: 9,
            created_at: new Date().toISOString(),
            reused: false,
          },
          {
            id: '2',
            width_cm: 40,
            height_cm: 30,
            depth_cm: 20,
            volume_l: 24,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            reused: false,
          },
          {
            id: '3',
            width_cm: 25,
            height_cm: 25,
            depth_cm: 25,
            volume_l: 15.6,
            created_at: new Date(Date.now() - 172800000).toISOString(),
            reused: true, // This box has been reused
          }
        ]);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Failed to fetch boxes');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user && !authLoading) {
      fetchBoxes();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [user, authLoading, fetchBoxes]);

  const handleReuseBox = async (boxId: string) => {
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase
          .from('boxes')
          .update({ reused: true })
          .eq('id', boxId)
          .eq('user_id', user?.id);

        if (error) {
          console.error('Error marking box as reused:', error);
          setError(error.message);
        } else {
          setBoxes(prevBoxes => 
            prevBoxes.map(box => 
              box.id === boxId ? { ...box, reused: true } : box
            )
          );
          setReuseConfirm({ isOpen: false, boxId: null });
          setSuccessMessage('🎉 Fantastico! Hai riutilizzato una scatola e salvato CO₂!');
          setTimeout(() => setSuccessMessage(''), 5000);
        }
      } else {
        // Mock reuse for demo
        setBoxes(prevBoxes => 
          prevBoxes.map(box => 
            box.id === boxId ? { ...box, reused: true } : box
          )
        );
        setReuseConfirm({ isOpen: false, boxId: null });
        setSuccessMessage('🎉 Fantastico! Hai riutilizzato una scatola e salvato CO₂!');
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Failed to mark box as reused');
    }
  };

  const handleBoxFlowClose = useCallback(() => {
    setIsBoxFlowOpen(false);
    if (user) {
      fetchBoxes();
    }
  }, [user, fetchBoxes]);

  // Calculate stats
  const totalBoxes = boxes.length;
  const reusedBoxes = boxes.filter(box => box.reused).length;
  const availableBoxes = boxes.filter(box => !box.reused).length;
  const totalVolume = boxes.reduce((sum, box) => sum + box.volume_l, 0);
  const totalCO2Savings = boxes.filter(box => box.reused).reduce((sum, box) => sum + calculateCO2Savings(box.volume_l), 0);
  const potentialCO2Savings = boxes.reduce((sum, box) => sum + calculateCO2Savings(box.volume_l), 0);

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
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Dashboard</h1>
          <p className="text-gray-600">Manage your saved boxes and track your environmental impact</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
              <p className="text-green-600 font-medium">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-emerald-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Boxes</p>
                <p className="text-2xl font-bold text-gray-900">{totalBoxes}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Recycle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Boxes Reused</p>
                <p className="text-2xl font-bold text-gray-900">{reusedBoxes}</p>
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
                <p className="text-sm font-medium text-gray-600">CO₂ Saved</p>
                <p className="text-2xl font-bold text-gray-900">{totalCO2Savings}g</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Summary */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Environmental Impact</h3>
              <p className="text-gray-600">
                You have <span className="font-bold text-emerald-600">{availableBoxes} boxes available</span> for reuse.
                Potential CO₂ savings: <span className="font-bold text-emerald-600">{potentialCO2Savings - totalCO2Savings}g</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-emerald-600">{Math.round((reusedBoxes / totalBoxes) * 100) || 0}%</div>
              <div className="text-sm text-gray-600">Reuse Rate</div>
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
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
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
                  Start by adding your first box to track your environmental impact
                </p>
                <button
                  onClick={() => setIsBoxFlowOpen(true)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Add Your First Box
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Dimensions (W×H×D)</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Volume</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">CO₂ Impact</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date Added</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boxes.map((box) => (
                      <tr key={box.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          {box.reused ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <Recycle className="h-3 w-3 mr-1" />
                              Reused
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              <Package className="h-3 w-3 mr-1" />
                              Available
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-medium text-gray-900">
                            {box.width_cm} × {box.height_cm} × {box.depth_cm} cm
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-emerald-600 font-medium">{box.volume_l}L</span>
                        </td>
                        <td className="py-4 px-4">
                          <span className={`font-medium ${box.reused ? 'text-green-600' : 'text-gray-500'}`}>
                            {box.reused ? '✅ ' : '💡 '}
                            {calculateCO2Savings(box.volume_l)}g CO₂
                          </span>
                        </td>
                        <td className="py-4 px-4 text-gray-600">
                          {new Date(box.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-4 px-4">
                          {!box.reused ? (
                            <button
                              onClick={() => setReuseConfirm({ isOpen: true, boxId: box.id })}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center"
                              title="Mark as reused"
                            >
                              <Recycle className="h-4 w-4 mr-1" />
                              Reusa
                            </button>
                          ) : (
                            <span className="text-green-600 text-sm font-medium">
                              ✅ Reused
                            </span>
                          )}
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

      <BoxSavingFlow 
        isOpen={isBoxFlowOpen} 
        onClose={handleBoxFlowClose}
      />

      <ConfirmDialog
        isOpen={reuseConfirm.isOpen}
        title="Mark Box as Reused"
        message="Hai riutilizzato questa scatola? Questo aggiornerà le tue statistiche ambientali e segnerà la scatola come riutilizzata."
        onConfirm={() => reuseConfirm.boxId && handleReuseBox(reuseConfirm.boxId)}
        onCancel={() => setReuseConfirm({ isOpen: false, boxId: null })}
        confirmText="Sì, l'ho riutilizzata!"
        cancelText="Annulla"
        variant="info"
      />
    </DashboardLayout>
  );
};

export default Dashboard;