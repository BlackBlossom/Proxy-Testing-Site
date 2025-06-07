import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PencilSquareIcon, TrashIcon, PlusCircleIcon, ChevronRightIcon, XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import axios from '../lib/axios';

const sidebarItems = [
  { id: 'hero', label: 'Hero Section' },
  { id: 'features', label: 'Features' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'websiteDetails', label: 'Website Details' }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' },
  tap: { scale: 0.98 }
};

export default function HomeEditorPage() {
  const [homeData, setHomeData] = useState(null);
  const [websiteDetails, setWebsiteDetails] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [editIndex, setEditIndex] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [index, setIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch home data and website details
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const { data } = await axios.get('/home');
        setHomeData(data);
      } catch (err) {
        console.error('Error fetching home data:', err);
      }
    };
    const fetchWebsiteDetails = async () => {
      try {
        const { data } = await axios.get('/basic');
        setWebsiteDetails(data);
      } catch (err) {
        console.error('Error fetching website details:', err);
        setWebsiteDetails({
          name: '',
          logoUrl: '',
          desc: ''
        });
      }
    };
    fetchHomeData();
    fetchWebsiteDetails();
  }, []);

  // Handle edit/save/delete for home sections
  const handleEdit = (section, data = {}, index = null) => {
    setFormData(data);
    setEditIndex(index);
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (activeSection === 'websiteDetails') {
        // Website Details: PUT /api/admin/content/basic
        await axios.put('/content/basic', {
          name: formData.name,
          logoUrl: formData.logoUrl,
          desc: formData.desc
        });
        setWebsiteDetails({
          name: formData.name,
          logoUrl: formData.logoUrl,
          desc: formData.desc
        });
        setIsModalOpen(false);
        setLoading(false);
        return;
      }
      // Other sections
      const updatedHomeData = { ...homeData };
      if (editIndex !== null) {
        updatedHomeData[activeSection] = updatedHomeData[activeSection].map((item, i) =>
          i === editIndex ? formData : item
        );
      } else {
        if (activeSection === 'hero') {
          updatedHomeData.hero = formData;
        } else {
          updatedHomeData[activeSection] = [
            ...(updatedHomeData[activeSection] || []),
            formData
          ];
        }
      }
      await axios.put('/home', updatedHomeData);
      setHomeData(updatedHomeData);
      setIsModalOpen(false);
    } catch (err) {
      console.error('Update error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (index) => {
    try {
      const updatedHomeData = { ...homeData };
      updatedHomeData[activeSection] = updatedHomeData[activeSection].filter((_, i) => i !== index);
      await axios.put('/home', updatedHomeData);
      setHomeData(updatedHomeData);
    } catch (err) {
      console.error('Delete error:', err);
    } finally {
      setIndex(null);
      setShowConfirmation(false);
    }
  };

  const [previewUrl, setPreviewUrl] = useState(formData.logoUrl || '');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  // Handler: when the admin picks a file, upload it via Axios, then store the returned URL in formData.logoUrl
  const handleLogoFileChange = async (e) => {
    const file = e.target.files[0];
    setUploadError('');
    if (!file) return;

    // Only allow images + SVG
    if (!file.type.match('image.*') && file.type !== 'image/svg+xml') {
      setUploadError('Please select a valid image (png, jpg, gif, svg).');
      return;
    }

    // 1) Show a local preview immediately
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);

    // 2) Upload to backend
    const form = new FormData();
    form.append('image', file);

    try {
      setIsUploading(true);

      const response = await axios.post(
        '/upload-image',
        form,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      // Expect: { imageUrl: "/public/uploads/xxxxx.svg" }
      const { imageUrl } = response.data;
      const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
      const fullUrl = `${BACKEND_URL}${imageUrl}`;

      // 3) Update parent formData with the hosted URL
      setFormData((prev) => ({ ...prev, logoUrl: fullUrl }));
      setPreviewUrl(fullUrl);
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.message || err.message || 'Upload failed';
      setUploadError(msg);
      setPreviewUrl('');
      setFormData((prev) => ({ ...prev, logoUrl: '' }));
    } finally {
      setIsUploading(false);
    }
  };

  // Loading state
  if (!homeData || (activeSection === 'websiteDetails' && websiteDetails === null)) {
    return (
      <div className="ml-64 h-screen bg-[#F7F5FF] flex items-center justify-center">
        <div className="animate-pulse text-[#412D99]">Loading...</div>
      </div>
    );
  }

  // Get default fields for the current section
  const getDefaultFields = () => {
    switch (activeSection) {
      case 'hero':
        return { title: '', subtitle: '', description: '', ctaText: '', ctaLink: '' };
      case 'features':
        return { icon: '', title: '', desc: '' };
      case 'faqs':
        return { question: '', answer: '' };
      case 'testimonials':
        return { name: '', role: '', quote: '' };
      case 'websiteDetails':
        return { name: '', logoUrl: '', desc: '' };
      default:
        return {};
    }
  };

  return (
    <div className="ml-10 flex min-h-screen bg-[#F7F5FF]">
      {/* Vertical Sidebar */}
      <div className="hidden md:block w-64 bg-[#1B1340] p-4 space-y-2 min-h-screen">
        <h2 className="text-xl font-bold text-[#D0D2E5] mb-6">Home Page Sections</h2>
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full p-3 text-left rounded-xl flex items-center justify-between
              ${activeSection === item.id 
                ? 'bg-[#4B39EF] text-white' 
                : 'text-[#D0D2E5] hover:bg-[#372580]'
              }`}
          >
            <span>{item.label}</span>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-[#1B1340] mb-8"
        >
          {sidebarItems.find(item => item.id === activeSection)?.label}
        </motion.h1>

        <AnimatePresence mode='wait'>
          {/* Website Details Section */}
          {activeSection === 'websiteDetails' && (
            <motion.div
              key="websiteDetails"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#1B1340]">Website Details</h3>
                <button
                  onClick={() => {
                    setFormData({
                      ...(websiteDetails || { name: '', logoUrl: '', desc: '' })
                    });
                    setEditIndex(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-[#372580] to-[#412D99] text-white px-4 py-2 rounded-lg hover:from-[#412D99] hover:to-[#372580] flex items-center gap-2"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                  Edit Website Details
                </button>
              </div>
              <div className="space-y-4 text-[#1B1340]/90">
                <p className="text-lg font-bold">{websiteDetails?.name}</p>
                {websiteDetails?.logoUrl && (
                  <img
                    src={websiteDetails.logoUrl}
                    alt="Website Logo"
                    className="h-16 w-auto object-contain"
                  />
                )}
                <p className="text-sm">{websiteDetails?.desc}</p>
              </div>
            </motion.div>
          )}

          {/* Hero Section */}
          {activeSection === 'hero' && (
            <motion.div
              key="hero"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#1B1340]">Hero Content</h3>
                <button
                  onClick={() => handleEdit('hero', homeData.hero)}
                  className="bg-gradient-to-r from-[#372580] to-[#412D99] text-white px-4 py-2 rounded-lg hover:from-[#412D99] hover:to-[#372580] flex items-center gap-2"
                >
                  <PencilSquareIcon className="w-5 h-5" />
                  Edit Hero
                </button>
              </div>
              <div className="space-y-4 text-[#1B1340]/90">
                <p className="text-2xl font-bold">{homeData.hero.title}</p>
                <p className="text-xl text-[#4B39EF]">{homeData.hero.subtitle}</p>
                <p className="text-lg">{homeData.hero.description}</p>
                <div className="mt-4">
                  <button className="text-white px-6 py-2 rounded-lg bg-[#372580]">
                    {homeData.hero.ctaText}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Features, FAQs, Testimonials */}
          {['features', 'faqs', 'testimonials'].includes(activeSection) && (
            <motion.div
              key={activeSection}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#1B1340]">
                  {sidebarItems.find(s => s.id === activeSection)?.label}
                </h3>
                <button
                  onClick={() => {
                    setFormData(getDefaultFields());
                    setEditIndex(null);
                    setIsModalOpen(true);
                  }}
                  className="bg-gradient-to-r from-[#372580] to-[#412D99] text-white px-4 py-2 rounded-lg hover:from-[#412D99] hover:to-[#372580] flex items-center gap-2"
                >
                  <PlusCircleIcon className="w-5 h-5" />
                  Add New
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {homeData[activeSection].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-4 rounded-xl shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-[#1B1340]">
                        {item.title || item.question || item.name}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(activeSection, item, index)}
                          className="text-[#4B39EF] hover:text-[#372580]"
                        >
                          <PencilSquareIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => {
                            setIndex(index);
                            setShowConfirmation(true);
                          }}
                          className="text-[#F2188C] hover:text-[#d3167a]"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[#1B1340]/80">
                      {item.desc || item.answer || item.quote}
                    </p>
                    {activeSection === 'features' && (
                      <span className="text-2xl mt-2 block">{item.icon}</span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit/Add Modal */}
        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white rounded-2xl p-6 w-full max-w-xl"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {editIndex !== null
                    ? activeSection === 'websiteDetails'
                      ? 'Edit Website Details'
                      : activeSection === 'hero'? 'Edit Hero Section' : 'Edit ' + activeSection.slice(0, -1)
                    : activeSection === 'websiteDetails'
                      ? 'Edit Website Details'
                      : activeSection === 'hero'? 'Edit Hero Section' : 'Add ' + activeSection.slice(0, -1)}
                </h3>
                <form onSubmit={handleSave} className="space-y-4">
                  {activeSection === 'websiteDetails' ? (
                    <>
                      {/* Website Name */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#1B1340] tracking-wide">
                          Website Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full p-3 bg-white border border-[#D0D2E5] rounded-xl focus:ring-2 focus:ring-[#412D99] focus:border-[#412D99] transition-all"
                          required
                        />
                      </div>

                      {/* Logo Upload */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#1B1340] tracking-wide">
                          Upload Logo (SVG or PNG/JPG/GIF)
                        </label>
                        <input
                          type="file"
                          accept="image/*, .svg"
                          onChange={handleLogoFileChange}
                          className="block text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-full file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-[#412D99] file:text-white
                                    hover:file:bg-[#3E5879] transition"
                        />

                        {isUploading && (
                          <p className="text-xs text-gray-600">Uploading…</p>
                        )}
                        {uploadError && (
                          <p className="text-xs text-red-600">Error: {uploadError}</p>
                        )}

                        {/* Preview of the uploaded logo */}
                        {previewUrl && (
                          <img
                            src={previewUrl}
                            alt="Logo Preview"
                            className="mt-2 h-20 w-auto object-contain border"
                          />
                        )}
                      </div>

                      {/* Logo URL (manually editable) */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#1B1340] tracking-wide">
                          Logo URL
                        </label>
                        <input
                          type="text"
                          name="logoUrl"
                          value={formData.logoUrl || ''}
                          onChange={(e) => {
                            const url = e.target.value;
                            setFormData({ ...formData, logoUrl: url });
                            setPreviewUrl(url);
                          }}
                          className="w-full p-3 bg-white border border-[#D0D2E5] rounded-xl focus:ring-2 focus:ring-[#412D99] focus:border-[#412D99] transition-all"
                        />
                      </div>

                      {/* Description */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-[#1B1340] tracking-wide">
                          Description
                        </label>
                        <textarea
                          name="desc"
                          value={formData.desc || ''}
                          onChange={(e) =>
                            setFormData({ ...formData, desc: e.target.value })
                          }
                          rows="3"
                          className="w-full p-3 bg-white border border-[#D0D2E5] rounded-xl focus:ring-2 focus:ring-[#412D99] focus:border-[#412D99] transition-all"
                          required
                        />
                      </div>
                    </>
                  ) : (
                    Object.keys(getDefaultFields()).map((key) => (
                      <div key={key}>
                        <label className="block text-sm font-medium text-[#1B1340] mb-1">
                          { key === 'desc' ? 'Description' : key.charAt(0).toUpperCase() + key.slice(1)}
                        </label>
                        <input
                          type="text"
                          value={formData[key] || ''}
                          onChange={e => setFormData(prev => ({
                            ...prev,
                            [key]: e.target.value
                          }))}
                          className="w-full p-2 border border-[#D0D2E5] rounded-lg focus:ring-2 focus:ring-[#4B39EF]"
                        />
                      </div>
                    ))
                  )}
                  <div className="flex gap-4 mt-6">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-2 border border-[#D0D2E5] rounded-lg hover:bg-[#D0D2E5]/30"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 px-4 py-2 bg-[#362d8e] text-white rounded-lg hover:bg-[#372580] flex justify-center items-center gap-2"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <CheckIcon className="w-5 h-5" />
                      )}
                      Save Changes
                    </button>
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
                    onClick={() => handleDelete(index)}
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
    </div>
  );
}
