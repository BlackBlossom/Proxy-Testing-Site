// server/seedHome.js
require('dotenv').config();
const mongoose = require('mongoose');
const HomePage = require('./models/HomePage');

const homeData = {
    hero: {
        title: "Test Your Proxies.",
        subtitle: "Fast. Secure. Reliable.",
        description: "Experience real-time insights on connectivity, latency, and proxy location for seamless performance.",
        ctaText: "Start Testing",
        ctaLink: "/test"
    },
    features: [
        { icon: "📊", title: "Batch Proxy Checks", desc: "Test multiple proxies simultaneously and save valuable time. Our tool handles large lists efficiently, so you get results quickly." },
        { icon: "⚡", title: "Real-Time Results", desc: "Visual feedback shows active and non-working proxies instantly. Color-coded results make it easy to identify healthy proxies." },
        { icon: "🔒", title: "Secure & Private", desc: "We don't store any proxy data. All tests are performed locally for maximum privacy and security." },
        { icon: "🌍", title: "Location Detection", desc: "Identify the country and city of each proxy server. This helps you select proxies from specific regions." },
        { icon: "🖥️", title: "Easy-to-Use Interface", desc: "No technical skills needed. Just paste your proxies, hit test, and get results in seconds." },
        { icon: "📋", title: "Detailed Reporting", desc: "Get comprehensive reports for each proxy, including latency, status, and location details." }
    ],
    faqs: [
        { question: "How does the proxy tester work?", answer: "Our tool checks connectivity, latency, and anonymity by sending test requests through each proxy and analyzing the results in real time." },
        { question: "Is my proxy data secure?", answer: "Yes, we do not store any proxy data. All tests are performed on your device and results are displayed only to you." },
        { question: "Can I test multiple proxies at once?", answer: "Absolutely! You can paste multiple proxies (one per line) and test them all simultaneously." },
        { question: "What proxy formats are supported?", answer: "We support HTTP, HTTPS, and SOCKS proxies. You can use formats like 'ip:port', 'http://ip:port', or 'socks://ip:port'." },
        { question: "How fast are the results?", answer: "Results are generated in seconds, thanks to our optimized parallel testing engine." },
        { question: "Do you provide proxy location information?", answer: "Yes, for every working proxy, we display its country and city based on the IP address." }
    ],
    testimonials: [
        { name: "Alex K.", role: "Web Developer", quote: "This tool saved me hours of manual testing. It's fast, reliable, and super easy to use!" },
        { name: "Samira R.", role: "Security Analyst", quote: "The anonymity checks are a game-changer. I trust this tool for all my proxy audits." },
        { name: "Jordan T.", role: "Network Engineer", quote: "The batch processing and location detection are top-notch. Highly recommended!" }
    ]
};


async function seedHome() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🔌 MongoDB connected");

        // Create or update the home page document
        const doc = await HomePage.findOneAndUpdate(
            {},
            homeData,
            {
                upsert: true,
                new: true,
                setDefaultsOnInsert: true
            }
        );

        console.log("✅ HomePage seeded successfully!");
        // console.log(doc);
        process.exit(0);
    } catch (err) {
        console.error("❌ SeedHome error:", err);
        process.exit(1);
    }
}

seedHome();
