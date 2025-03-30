const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    location: String,
    image: {
        // type: String,
        // set: (v) => v === " " ? "https://unsplash.com/photos/woman-in-white-dress-sits-near-white-wall-EpXr7Fj4vvk" : v,
        // default: "https://unsplash.com/photos/woman-in-white-dress-sits-near-white-wall-EpXr7Fj4vvk",
        type: String,
        set: (v) => {
            // Check if v is an object with a 'url' property
            if (v && typeof v === 'object' && v.url) {
                return v.url; // Extract and return the URL as a string
            }
            // If it's not an object or doesn't have a 'url' property, return the value as-is
            return v == null || v.trim() === ""
                ? "https://unsplash.com/photos/woman-in-white-dress-sits-near-white-wall-EpXr7Fj4vvk"
                : v;
     }, },
        country: String,
    });

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;