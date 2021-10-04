if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const axios = require('axios')
const express = require('express');
const fs = require('fs');
const { get } = require('http');
const app = express();

app.use(express.json());
app.use(express.static('public'));


// test mode
// const url = `https://api.openweathermap.org/data/2.5/onecall?lat=25.746415&lon=82.683703&exclude={part}&appid=${OPENWEATHER_API_KEY}&units=metric`
// let a;
// axios({
//     url: url,
//     responseType: 'json'
// }).then(function handleAPI(data) {
//     const imgId = data.data.current.weather[0].icon;
//     const imageURL = `http://openweathermap.org/img/wn/${imgId}@2x.png`
//     a = imgId;
//     // app.get('/', (req, res) => {
//     //     console.log(imageURL);
//     //     res.send(imageURL)
//     // })
//     // console.log(data.data.current)
//     // console.log(imgId)
// })

// // console.log(a);
// app.get('/', (req, res) => {
//     console.log("Himanshu");
//     res.send(imageURL)
// })

// test mode ends

app.post('/weather', (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&exclude={part}&appid=${OPENWEATHER_API_KEY}`
    axios({
        url: url,
        responseType: 'json'
    }).then(data => res.json(data.data.current))
})

app.listen(3000, () => {
    console.log('Server Started');
})