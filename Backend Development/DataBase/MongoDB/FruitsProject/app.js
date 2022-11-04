/*
const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb://localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    // Establish and verify connection
    await client.db("fruitsDB").command({ ping: 1 });
    console.log("Connected successfully to server");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
*/

// WARNING: : dirver are not recommended for using mongodb instead of mongoose
// if insist to use, check the docyument

// schema - model - collection
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitsDB");

// schema validation
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: [true, "Name missed!"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit ({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

const peopleSchema = new mongoose.Schema ({
  name: String,
  age: Number,
  favouriteFruit: fruitSchema
});

const People = mongoose.model("People", peopleSchema);

const xiaoli = new People ({
  name: "xiaoli",
  age: 22
});

// fruit.save();
// xiaoli.save();

const kivi = new Fruit ({
  name: "kivi",
  rating: 3,
  review: "qqWzuOjSFOuqPjFe4NOsMLafToQQwBSOEpS."
});

const orange = new Fruit ({
  name: "orange",
  rating: 4,
  review: "siA2SWTe09caDmVtYYzWEIbBS4zw."
});

const banana = new Fruit ({
  name: "banana",
  rating: 5,
  review: "pjy2bYhSsufwWlKwPc."
});

// Fruit.insertMany([kivi, orange, banana], function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully insertMany!");
//   }
// });

Fruit.find(function(err, fruits){
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach((item, i) => {
      console.log(item.name);
    });
  }
});

// Fruit.updateOne()
// Fruit.deleteOne()
// Fruit.deleteMany()

// Relationship
People.updateOne( {name: 'xiaoli'}, {favouriteFruit: banana}, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully update xiaoli's fav fruit!");
    }
});
