const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data=initData.data.map((obj)=>({...obj,owner:"697cd062d48edf2927a69b2d"}));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();

// const mongoose = require("mongoose");
// const initData = require("./data.js");
// const Listing = require("../models/listing.js");

// const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

// main()
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// async function main() {
//   await mongoose.connect(MONGO_URL);
// }

// const initDB = async () => {
//   await Listing.deleteMany({});//agr pahale say koi deta hai to delete kar do
  
//   // Transform the data to match the Listing model schema
//   const transformedData = initData.data.map(listing => ({
//     ...listing,
//     image: listing.image.url // Extract just the URL from the image object
//   }));
  
//   await Listing.insertMany(transformedData);//new data insert karo
//   console.log("data was initialized");
// };

// initDB();
