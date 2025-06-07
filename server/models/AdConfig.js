const mongoose = require('mongoose');

const adSchema = new mongoose.Schema({
  adType: { 
    type: String, 
    enum: ['GAM', 'AdSense'], 
    required: true 
  },
  adName: { 
    type: String, 
    required: true 
  },
  adCode: { 
    type: String, 
    required: true 
  },
  placement: {
    type: String,
    enum: [
      'home_top',
      'header_banner',
      'sidebar_right',
      'footer_banner',
      'article_top',
      'article_middle',
      'article_bottom',
      'popup_ad',
      'inline_mobile'
    ],
    required: true
  },
  popupTiming: { 
    type: Number 
  },
  mobileOnly: { 
    type: Boolean 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('AdConfig', adSchema);
