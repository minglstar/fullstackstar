const express = require("express");
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello World!<h1>');
});

app.get('/contact', (req, res) => {
  res.send('Contact me at: dreamingliu1101@gmail.com');
});

app.get('/about', (req, res) => {
  res.send('My name is Ming Liu. I like swimming.');
});

app.get('/hobbies', (req, res) => {
  res.send('<ul><li>code</li><li>tea</li></ul>');
});

app.listen(3000, function(){
  console.log('Server started on port 3000.');
});
