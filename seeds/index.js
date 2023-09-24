const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')
const dbUrl = process.env.DB_URL;
mongoose.set('strictQuery', true);
//mongoose.connect('mongodb://localhost:27017/yelp-camp')
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
});
//connecting database and if fails or works it print message 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]
const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 30) + 10;
        const camp = new Campground({
            //your user id
            author: '6274971e85a11ef9cdd6dfb9',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${(sample(places))}`,
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam sed aspernatur amet praesentium! Voluptates architecto, enim quod quae explicabo id quisquam fugit eum dolore quam modi inventore omnis odit similique?',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [{
                    url: 'https://www.holidify.com/images/cmsuploads/compressed/adventure-camp-camping-699558_20190212181323.jpg',
                    filename: 'YelpCamp/xpioyznjn1s4ikubtrim',
                },
                {
                    url: 'https://www.holidify.com/images/cmsuploads/compressed/adventure-camp-camping-699558_20190212181323.jpg',
                    filename: 'YelpCamp/i6llkyrrpgh48letu73y',

                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
});