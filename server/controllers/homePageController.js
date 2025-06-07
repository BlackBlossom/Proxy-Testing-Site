// server/controllers/homePageController.js
const HomePage = require('../models/HomePage');

// Get the home page (returns the latest entry)
exports.getHomePage = async (req, res) => {
    try {
        const homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            return res.status(404).json({ message: "Home page not found" });
        }
        res.status(200).json(homePage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update the entire home page (replace all fields)
exports.updateHomePage = async (req, res) => {
    try {
        // Find the latest home page or create a new one if none exists
        let homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            homePage = new HomePage(req.body);
        } else {
            homePage.hero = req.body.hero;
            homePage.features = req.body.features;
            homePage.faqs = req.body.faqs;
            homePage.testimonials = req.body.testimonials;
        }
        await homePage.save();
        res.status(200).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update only the hero section
exports.updateHero = async (req, res) => {
    try {
        let homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            homePage = new HomePage({ hero: req.body });
        } else {
            homePage.hero = req.body;
        }
        await homePage.save();
        res.status(200).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add a feature (append to features array)
exports.addFeature = async (req, res) => {
    try {
        let homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            homePage = new HomePage({ features: [req.body] });
        } else {
            homePage.features.push(req.body);
        }
        await homePage.save();
        res.status(201).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a specific feature by index
exports.updateFeature = async (req, res) => {
    try {
        const { index } = req.params;
        const homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            return res.status(404).json({ message: "Home page not found" });
        }
        if (index < 0 || index >= homePage.features.length) {
            return res.status(400).json({ message: "Invalid feature index" });
        }
        homePage.features[index] = req.body;
        await homePage.save();
        res.status(200).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a specific feature by index
exports.deleteFeature = async (req, res) => {
    try {
        const { index } = req.params;
        const homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            return res.status(404).json({ message: "Home page not found" });
        }
        if (index < 0 || index >= homePage.features.length) {
            return res.status(400).json({ message: "Invalid feature index" });
        }
        homePage.features.splice(index, 1);
        await homePage.save();
        res.status(200).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add a FAQ (append to faq array)
exports.addFAQ = async (req, res) => {
    try {
        let homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            homePage = new HomePage({ faqs: [req.body] });
        } else {
            homePage.faqs.push(req.body);
        }
        await homePage.save();
        res.status(201).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a specific FAQ by index
exports.updateFAQ = async (req, res) => {
    try {
        const { index } = req.params;
        const homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            return res.status(404).json({ message: "Home page not found" });
        }
        if (index < 0 || index >= homePage.faqs.length) {
            return res.status(400).json({ message: "Invalid FAQ index" });
        }
        homePage.faqs[index] = req.body;
        await homePage.save();
        res.status(200).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a specific FAQ by index
exports.deleteFAQ = async (req, res) => {
    try {
        const { index } = req.params;
        const homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            return res.status(404).json({ message: "Home page not found" });
        }
        if (index < 0 || index >= homePage.faqs.length) {
            return res.status(400).json({ message: "Invalid FAQ index" });
        }
        homePage.faqs.splice(index, 1);
        await homePage.save();
        res.status(200).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add a testimonial (append to testimonials array)
exports.addTestimonial = async (req, res) => {
    try {
        let homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            homePage = new HomePage({ testimonials: [req.body] });
        } else {
            homePage.testimonials.push(req.body);
        }
        await homePage.save();
        res.status(201).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a specific testimonial by index
exports.updateTestimonial = async (req, res) => {
    try {
        const { index } = req.params;
        const homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            return res.status(404).json({ message: "Home page not found" });
        }
        if (index < 0 || index >= homePage.testimonials.length) {
            return res.status(400).json({ message: "Invalid testimonial index" });
        }
        homePage.testimonials[index] = req.body;
        await homePage.save();
        res.status(200).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a specific testimonial by index
exports.deleteTestimonial = async (req, res) => {
    try {
        const { index } = req.params;
        const homePage = await HomePage.findOne().sort({ updatedAt: -1 });
        if (!homePage) {
            return res.status(404).json({ message: "Home page not found" });
        }
        if (index < 0 || index >= homePage.testimonials.length) {
            return res.status(400).json({ message: "Invalid testimonial index" });
        }
        homePage.testimonials.splice(index, 1);
        await homePage.save();
        res.status(200).json(homePage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
