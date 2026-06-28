const Joi = require("joi");
//ye server side validation error check karne ke liye use karte h ,like agar koi hopschoch say request
//send kar raha hai to usko bhi toh cheak karna h sab sahi formet me data hai ki nhi
//method 1 har field ko if else conditon ke help say cheak karo otherwise best use joi ka use karo
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().min(0).required(),
    // Image is optional because multer moves uploaded files to req.file
    image: Joi.object({
      url: Joi.string().allow("", null),
      filename: Joi.string().allow("", null)
    }).allow("", null).optional()
  }).required()
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required()
  }).required()
});
