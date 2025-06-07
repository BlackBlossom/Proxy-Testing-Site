// server/models/HomePage.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const HeroSectionSchema = new Schema({
    title:       { type: String, required: true, trim: true },
    subtitle:    { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    ctaText:     { type: String, required: true, trim: true },
    ctaLink:     { type: String, required: true, trim: true }
});

const FeatureSchema = new Schema({
    icon:  { type: String, required: false, trim: true },
    title: { type: String, required: true, trim: true },
    desc:  { type: String, required: true, trim: true },
});

const FAQSchema = new Schema({
    question: { type: String, required: true, trim: true },
    answer:   { type: String, required: true, trim: true },
});

const TestimonialSchema = new Schema({
    name:  { type: String, required: true, trim: true },
    role:  { type: String, required: true, trim: true },
    quote: { type: String, required: true, trim: true }
});

const HomePageSchema = new Schema({
    hero: HeroSectionSchema,
    features: [FeatureSchema],
    faqs: [FAQSchema],
    testimonials: [TestimonialSchema]
}
, {
    timestamps: true // adds createdAt & updatedAt fields
});

module.exports = mongoose.model('HomePage', HomePageSchema);
