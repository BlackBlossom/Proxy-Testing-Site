import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from '../lib/axios';
import { EyeSlashIcon, EyeIcon, PencilIcon, CheckIcon, XMarkIcon, UserCircleIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/outline';

const ProfileSection = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [editField, setEditField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminName')
    navigate('/login')
  }

  // Fetch admin data
  const fetchAdminProfile = async () => {
    try {
      const { data } = await axios.get('/auth/profile');
      setAdmin(data);
    } catch (err) {
      setError('Failed to load profile data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  // Handle field update
  const handleUpdate = async (field, newValue, oldPassword) => {
    try {
      const payload = {
        [field]: newValue,
        ...(field !== 'name' && { oldPassword }) // Include password for non-name fields
      };

      const { data } = await axios.put('/auth/update', payload);
      setAdmin(prev => ({ ...prev, [field]: newValue }));
      setEditField(null);
      setTempValue('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed');
    }
  };


  // Handle password update
  const handlePasswordUpdate = async (newPassword) => {
    try {
      await axios.put('/auth/update-password', {
        oldPassword: password,
        newPassword
      });
      setIsPasswordModalOpen(false);
      setPassword('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Password update failed');
    }
  };

  const handleEditStart = (field, value) => {
    setEditField(field);
    setTempValue(value);
  };

  const handleEditCancel = () => {
    setEditField(null);
    setTempValue("");
  };

  const handleEditSave = async (field) => {
    try {
      await axios.put("/auth/update", {
        [field]: tempValue,
        ...(field !== "name" && { oldPassword: password }),
      });
      setAdmin((prev) => ({ ...prev, [field]: tempValue }));
      setEditField(null);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5FF] p-8">
      <AnimatePresence>
        {error && (
          <motion.div
            className="p-4 mb-4 bg-red-100 text-red-700 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : admin && (
        <div className="max-w-2xl mx-auto space-y-6 ">
          <motion.div
            whileHover={{ scale: 1.0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
            className="p-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-[#D0D2E5]/80"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#4B39EF]/10 rounded-full">
                  <UserCircleIcon className="w-10 h-10 text-[#4B39EF]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#1B1340]">Admin Profile</h1>
                  <p className="text-sm text-[#1B1340]/60">Manage your account details</p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {handleLogout()}}
                className="flex items-center gap-2 px-4 py-2 text-[#F2188C] hover:bg-[#F2188C]/10 rounded-full transition-colors group"
              >
                <ArrowRightEndOnRectangleIcon className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
                <span className="text-sm font-medium hidden md:block">Log Out</span>
              </motion.button>
            </div>

            <div className="space-y-6">

              <motion.div
                className="max-w-2xl mx-auto space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* <motion.div
                  className="p-8 bg-white rounded-2xl shadow-lg"
                  whileHover={{ scale: 1.01 }}
                > */}
                  {/* Name Field */}
                  <motion.div
                    className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-4"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">
                        Full Name
                      </span>
                      {editField === "name" ? (
                        <div className="flex gap-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEditCancel}
                            className="text-red-500"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              localStorage.setItem('adminName', tempValue);
                              handleEditSave("name");
                            }}
                            className="text-green-500"
                          >
                            <CheckIcon className="w-5 h-5" />
                          </motion.button>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditStart("name", admin.name)}
                          className="text-blue-500"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                    <AnimatePresence mode="wait">
                      {editField === "name" ? (
                        <motion.input
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="w-full border-b-2 border-blue-500 focus:outline-none"
                          autoFocus
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                      ) : (
                        <motion.p
                          className="text-lg font-medium text-gray-800"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {admin.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-4"
                    whileHover={{ scale: 1.01 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">
                        Email Address
                      </span>
                      {editField === "email" ? (
                        <div className="flex gap-2">
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleEditCancel}
                            className="text-red-500"
                          >
                            <XMarkIcon className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setIsPasswordModalOpen(true);
                            }}
                            className="text-green-500"
                          >
                            <CheckIcon className="w-5 h-5" />
                          </motion.button>
                        </div>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEditStart("email", admin.email)}
                          className="text-blue-500"
                        >
                          <PencilIcon className="w-5 h-5" />
                        </motion.button>
                      )}
                    </div>
                    <AnimatePresence mode="wait">
                      {editField === "email" ? (
                        <motion.input
                          value={tempValue}
                          onChange={(e) => setTempValue(e.target.value)}
                          className="w-full border-b-2 border-blue-500 focus:outline-none"
                          autoFocus
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        />
                      ) : (
                        <motion.p
                          className="text-lg font-medium text-gray-800"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                          {admin.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                {/* </motion.div> */}
              </motion.div>

              <div className="p-6 bg-blue-50 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Password Management</h3>
                <button
                  onClick={() => {
                    setEditField('password');
                    setIsPasswordModalOpen(true);
                  }}
                  className="w-full p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  Change Password
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Password Modal */}
      <AnimatePresence>
        {isPasswordModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl w-96"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
            >
              <h2 className="text-xl font-bold mb-4">Security Verification</h2>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Current Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-[11px] text-[#1B1340]/60 hover:text-[#1B1340] transition-colors"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
              {editField === 'password' && (
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    onChange={(e) => setAdmin(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full p-2 border rounded mb-4"
                  />
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[11px] text-[#1B1340]/60 hover:text-[#1B1340] transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </motion.button>
                </div>
              )}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setIsPasswordModalOpen(false);
                    setEditField(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editField === 'password') {
                      handlePasswordUpdate(admin.password);
                    } else {
                      console.log(`Updating ${editField} with : ${tempValue}`);
                      handleUpdate(editField, tempValue, password); // Pass password here
                    }
                    setIsPasswordModalOpen(false);
                    setPassword('');
                  }}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileSection;
