const { response } = require("express");
const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const { search, category } = req.query;
  let allListings;

  if (search) {
    // Search listings by title, location, country, or description (case-insensitive)
    let regex = new RegExp(search, 'i');
    allListings = await Listing.find({
      $or: [
        { title: regex },
        { location: regex },
        { country: regex },
        { description: regex }
      ]
    });
  } else if (category) {
    // Smart keyword matching for categories
    let keywords = [category];
    if (category === 'views') keywords.push('view', 'mountain', 'lake', 'hill', 'river', 'nature');
    if (category === 'pool') keywords.push('pool', 'swimming', 'jacuzzi');
    if (category === 'cabin') keywords.push('cabin', 'cottage', 'wood', 'chalet');
    if (category === 'camping') keywords.push('camp', 'tent', 'camping', 'outdoor');
    if (category === 'arctic') keywords.push('snow', 'ice', 'cold', 'winter', 'glacier');
    if (category === 'farm') keywords.push('farm', 'farmhouse', 'barn', 'rural', 'ranch');
    if (category === 'beach') keywords.push('beach', 'beachfront', 'sea', 'ocean', 'coast', 'waterfront');

    let orQueries = keywords.map(keyword => {
      let regex = new RegExp(keyword, 'i');
      return [
        { title: regex },
        { description: regex },
        { location: regex }
      ];
    }).flat();

    allListings = await Listing.find({ $or: orQueries });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings, search });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

//show listing
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {  // Fixed: "randerEditForm" → "renderEditForm"
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};