const mongoose = require('mongoose');
const { Schema } = mongoose;

const TermsSectionSchema = new Schema(
  {
    // An optional numeric ID to maintain ordering or reference
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    // Title of this section (e.g., "Overview")
    title: {
      type: String,
      required: true,
      trim: true,
    },
    // The actual descriptive text for this section
    text: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt fields
  }
);

// Export the model. Collection name will be "terms" in MongoDB.
module.exports = mongoose.model('TermsSection', TermsSectionSchema);
