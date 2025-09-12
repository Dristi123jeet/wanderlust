const express= require('express')
const router = express.Router({mergeParams: true});
const wrapAsync= require("../utils/wrapAsync.js");
 const ExpressError = require("../utils/error.js");
const { listingSchema ,reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errmsg= error.details.map(el=>el.message).join(",");
     throw new ExpressError(errmsg, 400);
  } else {
    next();
  }
}

//review routes would go here
router.post("/",validateReview, wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  const review = new Review(req.body.review);
  listing.reviews.push(review);
  await review.save();
  await listing.save();
  req.flash("success", "New review created!");
  res.redirect(`/listings/${id}`);
}));
router.delete("/:reviewId", wrapAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Review deleted!");
  res.redirect(`/listings/${id}`);
}));

module.exports= router;