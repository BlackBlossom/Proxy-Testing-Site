import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusIcon, PencilIcon, TrashIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import axios from '../lib/axios';

function EditAdModal({ ad, onClose, onSave }) {
  const [form, setForm] = useState(ad);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // onSave will call updateAd in the parent component
      onSave(form);
      setError(null);
    } catch (err) {
      setError("Failed to save ad. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#1B1340]">Edit Ad</h3>
          <button onClick={onClose} className="p-1 text-[#1B1340]/70 hover:text-[#1B1340] rounded-full">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1B1340]">Name</label>
            <input
              type="text"
              value={form.adName}
              onChange={(e) => setForm({ ...form, adName: e.target.value })}
              className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B1340]">Type</label>
            <select
              value={form.adType}
              onChange={(e) => setForm({ ...form, adType: e.target.value })}
              className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              required
            >
              <option value="AdSense">AdSense</option>
              <option value="GAM">Google Ad Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B1340]">Placement</label>
            <select
              value={form.placement}
              onChange={(e) => setForm({ ...form, placement: e.target.value })}
              className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              required
            >
              <option value="home_top">Homepage Top</option>
              <option value="header_banner">Header Banner</option>
              <option value="sidebar_right">Right Sidebar</option>
              <option value="footer_banner">Footer Banner</option>
              <option value="article_top">Article Top</option>
              <option value="article_middle">Article Middle</option>
              <option value="article_bottom">Article Bottom</option>
              <option value="popup_ad">Popup/Interstitial</option>
              <option value="inline_mobile">Mobile Inline</option>
            </select>
          </div>
          {form.placement === 'popup_ad' && (
            <div>
              <label className="block text-sm font-medium text-[#1B1340]">Popup Timing (seconds)</label>
              <input
                type="number"
                value={form.popupTiming || ''}
                onChange={(e) => setForm({ ...form, popupTiming: e.target.value })}
                className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              />
            </div>
          )}
          {form.placement === 'inline_mobile' && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.mobileOnly || false}
                onChange={(e) => setForm({ ...form, mobileOnly: e.target.checked })}
              />
              <label className="text-sm font-medium text-[#1B1340]">Mobile Only</label>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-[#1B1340]">Ad Code</label>
            <textarea
              value={form.adCode}
              onChange={(e) => setForm({ ...form, adCode: e.target.value })}
              rows="5"
              className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D0D2E5] rounded-lg hover:bg-[#D0D2E5]/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4B39EF] text-white rounded-lg hover:bg-[#372580]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function CreateAdModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    adName: '',
    adType: 'AdSense',
    placement: 'home_top',
    adCode: '',
    popupTiming: 5,
    mobileOnly: false,
    isActive: true
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // onCreate will call createAd in the parent component
      await onCreate(form);
      setError(null);
    } catch (err) {
      setError("Failed to create ad. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-xl p-6 w-full max-w-xl"
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-[#1B1340]">Create New Ad</h3>
          <button onClick={onClose} className="p-1 text-[#1B1340]/70 hover:text-[#1B1340] rounded-full">
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        {error && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#1B1340]">Name</label>
            <input
              type="text"
              value={form.adName}
              onChange={(e) => setForm({ ...form, adName: e.target.value })}
              className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B1340]">Type</label>
            <select
              value={form.adType}
              onChange={(e) => setForm({ ...form, adType: e.target.value })}
              className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              required
            >
              <option value="AdSense">AdSense</option>
              <option value="GAM">Google Ad Manager</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[#1B1340]">Placement</label>
            <select
              value={form.placement}
              onChange={(e) => setForm({ ...form, placement: e.target.value })}
              className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              required
            >
              <option value="home_top">Homepage Top</option>
              <option value="header_banner">Header Banner</option>
              <option value="sidebar_right">Right Sidebar</option>
              <option value="footer_banner">Footer Banner</option>
              <option value="article_top">Article Top</option>
              <option value="article_middle">Article Middle</option>
              <option value="article_bottom">Article Bottom</option>
              <option value="popup_ad">Popup/Interstitial</option>
              <option value="inline_mobile">Mobile Inline</option>
            </select>
          </div>
          {form.placement === 'popup_ad' && (
            <div>
              <label className="block text-sm font-medium text-[#1B1340]">Popup Timing (seconds)</label>
              <input
                type="number"
                value={form.popupTiming}
                onChange={(e) => setForm({ ...form, popupTiming: e.target.value })}
                className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              />
            </div>
          )}
          {form.placement === 'inline_mobile' && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.mobileOnly}
                onChange={(e) => setForm({ ...form, mobileOnly: e.target.checked })}
              />
              <label className="text-sm font-medium text-[#1B1340]">Mobile Only</label>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-[#1B1340]">Ad Code</label>
            <textarea
              value={form.adCode}
              onChange={(e) => setForm({ ...form, adCode: e.target.value })}
              rows="5"
              className="w-full p-2 border border-[#D0D2E5] rounded-lg"
              required
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#D0D2E5] rounded-lg hover:bg-[#D0D2E5]/30"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#4B39EF] text-white rounded-lg hover:bg-[#372580]"
            >
              Create Ad
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#1B1340]">Confirm Deletion</h3>
              <button
                onClick={onCancel}
                className="p-1 text-[#1B1340]/70 hover:text-[#1B1340] rounded-full"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <p className="text-[#1B1340]/70 mb-6">
              Are you sure you want to delete this ad? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 text-[#1B1340] hover:bg-[#D0D2E5]/30 border border-[#D0D2E5] rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-[#F2188C] hover:bg-[#F2188C]/90 text-white rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ToggleSwitch({ isActive, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      aria-pressed={isActive}
      className="relative w-12 h-7 rounded-full transition-colors duration-300 focus:outline-none"
      style={{
        background: isActive ? 'linear-gradient(90deg,#34d399,#059669)' : '#e5e7eb',
      }}
    >
      <motion.span
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`absolute top-1 left-1 w-5 h-5 rounded-full shadow-md bg-white ${
          isActive ? 'translate-x-5' : ''
        }`}
        style={{
          boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
        }}
      />
    </button>
  );
}



// Get all ads (optionally filter by status)
async function getAllAds({ status } = {}) {
  try {
    const params = {};
    if (status) params.status = status;
    const response = await axios.get('/ads', { params });
    return response.data;
  } catch (err) {
    console.error("Error fetching ads:", err);
    return [];
  }
}

// Get ads by placement (optionally filter by status)
async function getAdsByPlacement(placement, { status } = {}) {
  try {
    const params = {};
    if (status) params.status = status;
    const response = await axios.get(`/ads/${placement}`, { params });
    return response.data;
  } catch (err) {
    console.error("Error fetching ads by placement:", err);
    return [];
  }
}

// Create a new ad
async function createAd(adData) {
  try {
    const response = await axios.post('/ads', adData);
    return response.data;
  } catch (err) {
    console.error("Error creating ad:", err);
    return { error: "Failed to create ad" };
  }
}

// Update an ad
async function updateAd(id, updates) {
  try {
    const response = await axios.put(`/ads/${id}`, updates);
    return response.data;
  } catch (err) {
    console.error("Error updating ad:", err);
    return { error: "Failed to update ad" };
  }
}

// Delete an ad
async function deleteAd(id) {
  try {
    const response = await axios.delete(`/ads/${id}`);
    return response.data;
  } catch (err) {
    console.error("Error deleting ad:", err);
    return { error: "Failed to delete ad" };
  }
}


export default function AdsManager() {
  const [ads, setAds] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentAd, setCurrentAd] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);;
  const [error, setError] = useState(null);

  // Fetch all ads on mount
  useEffect(() => {
    const fetchAds = async () => {
      setIsLoading(true);
      try {
        const data = await getAllAds();
        setAds(data);
        setError(null);
      } catch (err) {
        setError("Failed to load ads. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAds();
  }, []);

  // Toggle ad status
  const toggleAdStatus = async (ad) => {
    try {
      const updatedAd = await updateAd(ad._id, { isActive: !ad.isActive });
      setAds(prevAds => prevAds.map(a => a._id === updatedAd._id ? updatedAd : a));
    } catch (err) {
      setError("Failed to update ad status.");
    }
  };

  // Delete ad
  const handleDeleteAd = async () => {
    try {
      await deleteAd(adToDelete._id);
      setAds(ads.filter(a => a._id !== adToDelete._id));
      setIsDeleteModalOpen(false);
    } catch (err) {
      setError("Failed to delete ad.");
    }
  };

  // Open edit modal
  const openEditModal = (ad) => {
    setCurrentAd(ad);
    setIsEditModalOpen(true);
  };

  // Save edited ad
  const handleSaveAd = async (updatedAd) => {
    try {
      const savedAd = await updateAd(updatedAd._id, updatedAd);
      setAds(ads.map(a => a._id === savedAd._id ? savedAd : a));
      setIsEditModalOpen(false);
    } catch (err) {
      setError("Failed to save ad.");
    }
  };

  // Create new ad
  const handleCreateAd = async (newAd) => {
    try {
      const createdAd = await createAd(newAd);
      setAds([...ads, createdAd]);
      setIsCreateModalOpen(false);
    } catch (err) {
        console.log(err);
      setError("Failed to create ad.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5FF] ml-10 p-8 px-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-[#1B1340] mb-8"
      >
        Ads Management
      </motion.h1>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border-l-4 border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Add New Ad Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsCreateModalOpen(true)}
        className="mb-6 bg-gradient-to-r from-[#372580] to-[#412D99] text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <PlusIcon className="w-5 h-5" />
        Add New Ad
      </motion.button>

      {/* Ads Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-[#1B1340] text-lg text-white">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Placement</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  Loading...
                </td>
              </tr>
            ) : ads.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center">
                  No ads found.
                </td>
              </tr>
            ) : (
              ads.map((ad) => (
                <motion.tr
                  key={ad._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-b border-[#D0D2E5] hover:bg-[#F7F5FF]"
                >
                  <td className="p-4">{ad.adName}</td>
                  <td className="p-4">{ad.adType}</td>
                  <td className="p-4">{ad.placement}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                                ad.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                        >
                            {ad.isActive ? 'Active' : 'Inactive'}
                        </span>
                        <ToggleSwitch
                            isActive={ad.isActive}
                            onChange={() => toggleAdStatus(ad)}
                        />
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => openEditModal(ad)}
                            className="p-2 text-[#4B39EF] hover:bg-[#D0D2E5]/30 rounded-lg"
                        >
                            <PencilIcon className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => {
                                setAdToDelete(ad);
                                setIsDeleteModalOpen(true);
                            }}
                            className="p-2 text-[#F2188C] hover:bg-[#D0D2E5]/30 rounded-lg"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteAd}
      />

      {/* Edit Ad Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <EditAdModal
            ad={currentAd}
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSaveAd}
          />
        )}
      </AnimatePresence>

      {/* Create Ad Modal */}
      <AnimatePresence>
        {isCreateModalOpen && (
          <CreateAdModal
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreateAd}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
