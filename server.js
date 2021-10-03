if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const axios = require('axios')
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// const url = `https://api.openweathermap.org/data/2.5/onecall?lat=25.746415&lon=82.683703&exclude={part}&appid=${OPENWEATHER_API_KEY}`
// axios({
//     url: url,
//     responseType: 'json'
// }).then(function hangle(data) {
//     console.log(data.data.current)
// }
// )

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