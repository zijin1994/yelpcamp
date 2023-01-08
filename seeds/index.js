const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
const axios = require("axios");
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  // useNewUrlParser: true,
  // useeCreateIndex: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
  5;
});

// async function seedImg() {
//   try {
//     const resp = await axios.get("https://api.unsplash.com/photos/random", {
//       headers: { Accept: "application/json", "Accept-Encoding": "identity" },
//       params: {
//         client_id: "c3WBk1vRizryQ_b5iR19i5EJitcJSf4V2s0OteMtr94",
//         collections: 1114848,
//       },
//     });
//     return resp.data.urls.small;
//   } catch (err) {
//     console.error(err);
//   }
// }

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "63a3d1dc7950b9d3e3632398",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam ex quidem reprehenderit, nobis, aspernatur tempore sint saepe cupiditate itaque quasi quibusdam mollitia dolore, iste iure in enim. Quaerat, quisquam reprehenderit.",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dkbaqfoim/image/upload/v1672189821/YelpCamp/vgkusgfeav7etepxtjq8.jpg",
          filename: "YelpCamp/vgkusgfeav7etepxtjq8",
        },
        {
          url: "https://res.cloudinary.com/dkbaqfoim/image/upload/v1672189821/YelpCamp/hyedfvedcwjxnzy595h7.webp",
          filename: "YelpCamp/hyedfvedcwjxnzy595h7",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
