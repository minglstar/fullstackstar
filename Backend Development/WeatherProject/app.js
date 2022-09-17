const express = require('express');
const https = require('https');

const app = express();


app.get('/', (req, res) => {

  const url = "https://api.openweathermap.org/data/2.5/weather?q=Canberra,au&APPID=030dea82f0bdb2eaaf45d1b3d0b31c8f#";

  https.get(url, (response) => {
    console.log('statusCode', response.statusCode);

    response.on('data', (d) => {
      const weatherdata = JSON.parse(d);
      const temp = weatherdata.main.temp;
      const desc = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
      // only one res.send but multiple res.write
      res.write("<p>The weather is currently " + desc + "</p>");
      res.write("<h1>The temperature in Canberra is " + temp + "</h1>");
      res.write("<img src=" + imageURL + ">");
     });
  });

});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
