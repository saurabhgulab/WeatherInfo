// Api weather key: 1f9f3e25426c2291cba4541e8d8942ac

const express= require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.listen(3000,function(){
  console.log("Server is Running!");
});

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html")

  })
app.post("/",function(req,res){
  const apikey = "1f9f3e25426c2291cba4541e8d8942ac";
  const query = req.body.cityName;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" +apikey+ "&units=" +unit;
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<h1>The temp in "+query+" is: " + temp +" degrees. </h1>");
      res.write("<p>The weather is currently: "+ weatherDescription + ".<p>");
      res.write("<img src=" +imageURL+ ">");
      res.send();
})

})
})
