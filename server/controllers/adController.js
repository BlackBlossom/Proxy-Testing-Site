const AdConfig = require('../models/AdConfig');

// Get all ads (optional: filter by status)
exports.getAllAds = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};
    if (status === 'active') {
      filter.isActive = true;
    } else if (status === 'inactive') {
      filter.isActive = false;
    }
    const ads = await AdConfig.find(filter).sort({ createdAt: -1 });
    res.status(200).json(ads);
} catch (err) {
    res.status(500).json({ error: err.message });
}
};

// Get ads by placement (optional: filter by status)
exports.getAdsByPlacement = async (req, res) => {
    try {
        const { status } = req.query;

        let filter = { placement: req.params.placement };
        if (status === 'active') {
            filter.isActive = true;
        } else if (status === 'inactive') {
            filter.isActive = false;
        }
        const ads = await AdConfig.find(filter).sort({ createdAt: -1 });
        res.set('Cache-Control', 'public, max-age=30');
        res.status(200).json(ads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new ad
exports.createAd = async (req, res) => {
  try {
    const { adType, adName, adCode, placement, popupTiming, mobileOnly } = req.body;

    // Validate placement-specific fields
    if (placement === 'popup_ad' && !popupTiming) {
      return res.status(400).json({ error: "Popup timing required for popup ads" });
    }
    if (placement === 'inline_mobile' && typeof mobileOnly !== 'boolean') {
      return res.status(400).json({ error: "MobileOnly flag required for inline mobile ads" });
    }

    const newAd = new AdConfig({
      adType,
      adName,
      adCode,
      placement,
      ...(placement === 'popup_ad' && { popupTiming }),
      ...(placement === 'inline_mobile' && { mobileOnly }),
      isActive: true // Default to active
    });

    await newAd.save();
    res.status(201).json(newAd);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update ad (status or any other field)
exports.updateAd = async (req, res) => {
  try {
    const updateData = req.body;
    const ad = await AdConfig.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    if (!ad) return res.status(404).json({ error: 'Ad not found' });
    res.json(ad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete ad
exports.deleteAd = async (req, res) => {
  try {
    const ad = await AdConfig.findByIdAndDelete(req.params.id);
    if (!ad) return res.status(404).json({ error: 'Ad not found' });
    res.json({ message: 'Ad deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
