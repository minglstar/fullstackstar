//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

var items = ["Buy Food",
  "Cook Food",
  "Eat Food"
];

app.set('view engine', 'ejs');

// remember this line
app.use(bodyParser.urlencoded({
  extended: true
}));

// use public folder as the static resouces
app.use(express.static("public"));

app.get("/", function(req, res) {
  let day = date.getDate();
  res.render('list', {
    kindOfDay: day,
    items: items
  });
});

app.post("/", (req, res) => {
  var item = req.body.newItem;
  console.log(item);
  items.push(item);
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
