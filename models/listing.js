const mongoose = require('mongoose');
const listingSchema = new mongoose.Schema({
    title:{
        type: String, required: true
    } ,
    description: String,
    image: {
        filename: { type: String },
        url: { 
            type: String,
            set: (v) => v === '' ? 'http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcQztlRxfSQBem5fBKS6Hs_bQoKrO8mm7Y9WGIVPw0olLk3nYg6UPssVFOYctGsRy2DP-MSfMGAvQCOYofnWRDs' : v
        }
    }, 
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;