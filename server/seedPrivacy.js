// server/seedPrivacy.js
require('dotenv').config();
const mongoose = require('mongoose');
const PrivacySection = require('./models/PrivacySection');

const sections = [
  { id: 1, title: "Overview", text: "Your privacy is important to us. ProxyTester does not store any logs or proxy data. All tests are run client-side for full transparency and control." },
  { id: 2, title: "Data Collection", text: "We do not collect or store any proxy addresses, IPs, or testing outcomes. Basic analytics may be used for performance optimization but never tied to individuals." },
  { id: 3, title: "Cookies", text: "This site only uses cookies for theme preference (dark/light). No third-party cookies or trackers are used." },
  { id: 4, title: "Security", text: "All communication with our platform is secured via HTTPS. Client-side tests ensure no data is transmitted to our servers." },
  { id: 5, title: "Changes to Policy", text: "We may update this policy from time to time. Changes will be reflected on this page with an updated date." },
  { id: 6, title: "Contact Us", text: "Have questions or concerns? Reach out to us at support@proxytester.com." }
];

async function seedPrivacy() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("🔌 MongoDB connected");

    await PrivacySection.deleteMany({});
    console.log("🗑️ Cleared existing privacy sections");

    await PrivacySection.insertMany(sections);
    console.log("✅ Privacy sections seeded");
    process.exit(0);
  } catch (err) {
    console.error("❌ SeedPrivacy error:", err);
    process.exit(1);
  }
}

seedPrivacy();
