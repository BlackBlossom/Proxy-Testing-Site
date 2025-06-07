// server/seedTerms.js
require('dotenv').config();
const mongoose = require('mongoose');
const TermsSection = require('./models/TermsSection');

const sections = [
  { id: 1, title: "Usage Terms", text: "You agree not to misuse our service. This includes, but is not limited to, abusing the proxy checker to perform illegal or unethical activities. We reserve the right to block or ban users at our discretion." },
  { id: 2, title: "Accuracy", text: "While we strive to provide accurate proxy testing results, we cannot guarantee 100% reliability. Results may vary depending on your location, network, or the proxies themselves." },
  { id: 3, title: "Data Policy", text: "We do not store the proxy lists you test. All tests are processed client-side or temporarily cached without long-term retention." },
  { id: 4, title: "Third-party Links", text: "Our website may include links to third-party services. We are not responsible for their content or practices." },
  { id: 5, title: "Updates to Terms", text: "We reserve the right to update these terms at any time. Any changes will be posted on this page." }
];

async function seedTerms() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("🔌 MongoDB connected");

    await TermsSection.deleteMany({});
    console.log("🗑️ Cleared existing terms sections");

    await TermsSection.insertMany(sections);
    console.log("✅ Terms sections seeded");
    process.exit(0);
  } catch (err) {
    console.error("❌ SeedTerms error:", err);
    process.exit(1);
  }
}

seedTerms();
