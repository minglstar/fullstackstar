//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];
mongoose.connect("mongodb://localhost:27017/todolistDB");

// const itemsSchema = {
//   name: String,
// };
const itemsSchema = new mongoose.Schema({
  name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const item_a = new Item({
  name: "Chicken Breast"
});

const item_b = new Item({
  name: "Spring Water"
});

const item_c = new Item({
  name: "Eggs"
});

const defaultItems = [item_a, item_b, item_c];

// const queryItems = await Item.find({});

app.get("/", function(req, res) {

  Item.find({}, function(err, foundItems) {
    if (err) {
      console.log(err);
    } else {
      console.log(foundItems);
      if (foundItems.length == 0) {
        Item.insertMany(defaultItems, function(err, docs) {
            console.log(docs);
            if (err) {
              console.log(err);
            } else {
              console.log("Successfully insert default items to mongo db");
            }
        });
      } else {
        res.render("list", {
          listTitle: "Today",
          newListItems: foundItems
        });
      }
    }
  });
});

app.post("/", function(req, res) {

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newListItems: workItems
  });
});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
