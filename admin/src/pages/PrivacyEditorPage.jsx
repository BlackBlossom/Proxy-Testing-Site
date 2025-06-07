import { useState, useEffect, useRef } from 'react';
import axios from '../lib/axios';
import { PencilSquareIcon, TrashIcon, CheckIcon, PlusCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
  hover: { scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)' }
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' },
  tap: { scale: 0.98 }
};

export default function PrivacyEditorPage() {
  const [sections, setSections] = useState([]);
  const [formData, setFormData] = useState({ id: '', title: '', text: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const { data } = await axios.get('/privacy');
        setSections(data);
      } catch (err) {
        setError('Failed to load sections');
      }
    };
    fetchSections();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (editIndex !== null) {
        // Update existing section
        await axios.put(`/content/privacy/${formData.id}`, formData);
        const updatedSections = [...sections];
        updatedSections[editIndex] = formData;
        setSections(updatedSections);
      } else {
        // Add new section
        const { data } = await axios.post('/content/privacy', formData);
        setSections([...sections, data]);
      }
      setIsModalOpen(false);
      setFormData({ id: '', title: '', text: '' });
      setEditIndex(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (section, index) => {
    setFormData(section);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/content/privacy/${sections[sectionToDelete].id}`);
      const updatedSections = sections.filter((_, i) => i !== sectionToDelete);
      setSections(updatedSections);
    } catch (err) {
      setError('Failed to delete section');
    } finally {
      setSectionToDelete(null);
      setShowConfirmation(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5FF] p-8 px-16">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl self-center font-bold text-[#1B1340] mt-6 mb-8"
      >
        Privacy Policy Manager
      </motion.h1>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 mb-6 flex self-center w-200 items-center gap-3 bg-[#F7F5FF] border-l-4 border-[#412D99] text-[#1B1340] rounded-lg"
          >
            <XCircleIcon className="w-5 h-5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between self-center w-200 mb-6">
        <h2 className="text-2xl font-semibold text-[#1B1340]">
          Privacy Policy Sections
        </h2>
        <motion.button
          onClick={() => {
            setFormData({ id: '', title: '', text: '' });
            setEditIndex(null);
            setIsModalOpen(true);
          }}
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="bg-gradient-to-r from-[#372580] to-[#412D99] text-white px-4 py-2 rounded-lg hover:from-[#412D99] hover:to-[#372580] flex items-center gap-2"
        >
          <PlusCircleIcon className="w-5 h-5" />
          Add New Section
        </motion.button>
      </div>

      <div className="flex flex-col gap-6 justify-center items-center w-200 mx-auto mb-8">
        {sections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="col-span-full p-8 w-full bg-white border border-[#D0D2E5] rounded-2xl shadow-sm text-center text-[#1B1340]"
          >
            <p className="text-lg font-medium">No privacy policy sections found.</p>
            <p className="mt-2 text-[#1B1340]/70">Create your first section above.</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white w-full p-4 rounded-2xl shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-medium text-[#1B1340]">
                    {section.id}. {section.title}
                  </h3>
                  <div className="flex gap-2">
                    <motion.button
                      onClick={() => handleEdit(section, index)}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="text-[#4B39EF] hover:text-[#372580]"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setSectionToDelete(index);
                        setShowConfirmation(true);
                      }}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="text-[#F2188C] hover:text-[#d3167a]"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
                <p className="text-sm text-[#1B1340]/80">
                  {section.text}
                </p>
                <p className="text-xs text-[#1B1340]/70 mt-2">
                  Last updated: {formatDate(section.updatedAt)}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Edit/Add Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl p-6 w-full max-w-xl"
            >
              <h3 className="text-xl font-semibold mb-4">
                {editIndex !== null ? 'Edit Section' : 'Add New Section'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#1B1340] tracking-wide">Section ID</label>
                    <input
                      type="number"
                      name="id"
                      value={formData.id}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#f5f7ff] border border-[#D0D2E5] rounded-lg focus:ring-2 focus:ring-[#412D99] focus:border-[#412D99] transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-[#1B1340] tracking-wide">Section Title</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-3 bg-[#f5f7ff] border border-[#D0D2E5] rounded-lg focus:ring-2 focus:ring-[#412D99] focus:border-[#412D99] transition-all"
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <label className="block text-sm font-medium text-[#1B1340] tracking-wide">Content</label>
                  <textarea
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    rows="5"
                    className="w-full p-3 bg-[#f5f7ff] border border-[#D0D2E5] rounded-lg focus:ring-2 focus:ring-[#412D99] focus:border-[#412D99] transition-all"
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 mt-6">
                  <motion.button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="px-5 py-2.5 text-[#1B1340] hover:bg-[#D0D2E5]/30 border border-[#D0D2E5] rounded-lg transition-colors font-medium flex items-center gap-2"
                  >
                    <XMarkIcon className="w-5 h-5" />
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    onClick={() => setIsModalOpen(false)}
                    disabled={loading}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="px-5 py-2.5 bg-gradient-to-r from-[#372580] to-[#412D99] hover:from-[#412D99] hover:to-[#372580] text-white rounded-lg transition-colors font-medium flex items-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <CheckIcon className="w-5 h-5" />
                    )}
                    {editIndex !== null ? 'Update Section' : 'Create Section'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-[#F7F5FF] border border-[#D0D2E5] rounded-2xl shadow-xl p-6 max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-[#1B1340]">Confirm Deletion</h3>
                <motion.button
                  onClick={() => setShowConfirmation(false)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-1 text-[#1B1340]/70 hover:text-[#1B1340] rounded-full"
                >
                  <XMarkIcon className="w-5 h-5" />
                </motion.button>
              </div>
              <p className="text-[#1B1340]/70 mb-6">
                Are you sure you want to delete this section? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <motion.button
                  onClick={() => setShowConfirmation(false)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 py-2 text-[#1B1340] hover:bg-[#D0D2E5]/30 border border-[#D0D2E5] rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="px-4 py-2 bg-[#F2188C] hover:bg-[#F2188C]/90 text-white rounded-lg transition-colors"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
