const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const request = require('request');
const API_KEY = "c283f9ddfa69ccdab34c53d58db40861";


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index');
})

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
    request(url, (err,response,body) => {
        if(err){
            res.render('index', {weather: null, error:'Error, please try again'});
        } else {
            let weather = JSON.parse(body);
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            }else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index',{weather: weatherText, error: null})
            }
        }
    });
    
  })

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})