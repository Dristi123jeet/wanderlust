const mongoose = require('mongoose');
const listingSchema = new mongoose.Schema({
    title:{
        type: String, required: true
    } ,
    description: String,
  image: {
    filename: { type: String, default: 'listingimage' },
    url: {
            type: String,
            default: 'https://cdn.confident-group.com/wp-content/uploads/2025/01/09175739/villa-features-scaled.jpg',
            set: (v) => v === '' ? 'https://cdn.confident-group.com/wp-content/uploads/2025/01/09175739/villa-features-scaled.jpg' : v
        },
    },
    
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;