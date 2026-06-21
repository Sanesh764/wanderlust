const { response } = require("express");
const Listing = require("../models/listing");

// Display all listings with search and category filters
module.exports.index = async (req, res) => {
  const { search, category } = req.query;
  let allListings;

  // Search functionality
  if (search) {
    // Search by title, location, country, or description (case-insensitive)
    let regex = new RegExp(search, "i");

    allListings = await Listing.find({
      $or: [
        { title: regex },
        { location: regex },
        { country: regex },
        { description: regex },
      ],
    });

  // Category filtering
  } else if (category) {
    let keywords = [category];

    // Add related keywords for smarter category matching
    if (category === "views")
      keywords.push("view", "mountain", "lake", "hill", "river", "nature");

    if (category === "pool")
      keywords.push("pool", "swimming", "jacuzzi");

    if (category === "cabin")
      keywords.push("cabin", "cottage", "wood", "chalet");

    if (category === "camping")
      keywords.push("camp", "tent", "camping", "outdoor");

    if (category === "arctic")
      keywords.push("snow", "ice", "cold", "winter", "glacier");

    if (category === "farm")
      keywords.push("farm", "farmhouse", "barn", "rural", "ranch");

    if (category === "beach")
      keywords.push("beach", "beachfront", "sea", "ocean", "coast", "waterfront");

    // Create search conditions for each keyword
    let orQueries = keywords
      .map((keyword) => {
        let regex = new RegExp(keyword, "i");

        return [
          { title: regex },
          { description: regex },
          { location: regex },
        ];
      })
      .flat();

    allListings = await Listing.find({ $or: orQueries });

  // Show all listings if no filter is applied
  } else {
    allListings = await Listing.find({});
  }

  // Render homepage with listings
  res.render("listings/index.ejs", { allListings, search });
};

// Render form to create a new listing
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show details of a single listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author", // Populate review author details
      },
    })
    .populate("owner"); // Populate listing owner details

  // Handle invalid listing ID
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  console.log(listing);

  // Render listing details page
  res.render("listings/show.ejs", { listing });
};

// Create a new listing
module.exports.createListing = async (req, res, next) => {
  // Get uploaded image information from Cloudinary/Multer
  let url = req.file.path;
  let filename = req.file.filename;

  // Create listing from form data
  const newListing = new Listing(req.body.listing);

  // Set current logged-in user as owner
  newListing.owner = req.user._id;

  // Save image details
  newListing.image = { url, filename };

  // Save listing to database
  await newListing.save();

  req.flash("success", "New Listing Created!");

  res.redirect("/listings");
};

// Render edit listing form
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id);

  // Check if listing exists
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  // Generate resized image URL for preview
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/w_250"
  );

  res.render("listings/edit.ejs", {
    listing,
    originalImageUrl,
  });
};

// Update an existing listing
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  // Update listing details
  let listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing }
  );

  // Update image if a new file is uploaded
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = { url, filename };

    await listing.save();
  }

  req.flash("success", "Listing Updated!");

  res.redirect(`/listings/${id}`);
};

// Delete a listing
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;

  // Delete listing from database
  let deletedListing = await Listing.findByIdAndDelete(id);

  console.log(deletedListing);

  req.flash("success", "Listing Deleted!");

  res.redirect("/listings");
};