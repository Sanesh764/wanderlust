const Listing = require("../models/listing");
const Review = require("../models/review");

// Create a New Review
module.exports.createReview = async (req, res) => {
  // Find the listing using the listing ID from URL
  let listing = await Listing.findById(req.params.id);

  // Create a new review using form data
  let newReview = new Review(req.body.review);

  // Assign the currently logged-in user as the review author
  newReview.author = req.user._id;

  // Add review reference to the listing's reviews array
  listing.reviews.push(newReview);

  // Save review document to database
  await newReview.save();

  // Save updated listing with new review reference
  await listing.save();

  console.log("New review saved");

  // Show success message
  req.flash("success", "New review created");

  // Redirect back to the listing details page
  res.redirect(`/listings/${listing._id}`);
};

// Delete an Existing Review
module.exports.destroyReview = async (req, res) => {
  // Extract listing ID and review ID from URL parameters
  let { id, reviewId } = req.params;

  // Remove review reference from listing's reviews array
  await Listing.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });

  // Delete the review document from Reviews collection
  await Review.findByIdAndDelete(reviewId);

  // Show success message
  req.flash("success", "Review deleted successfully");

  // Redirect back to the listing details page
  res.redirect(`/listings/${id}`);
};