const mongoose = require('mongoose');
const review = require('./review');

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
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
});
listingSchema.post('findOneAndDelete', async function(doc) {
    if (doc) {
        await review.deleteMany({
        _id: {
            $in: doc.reviews
        }
        });
    }
    });

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;