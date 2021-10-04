const { json } = require("express")

const serachElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(serachElement)
searchBox.addListener('places_changed', () => {
    const place = searchBox.getPlaces()[0]
    if (place == null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.lng()
    fetch('/weather', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude
            // latitude: "25.746415",
            // longitude: "82.683703"
        })
    }).then(res => res.json()).then(data => {
        // console.log(data);
        setWeatherData(data, place.formatted_address)
    })
})


// fetch('/weather').then(data => console.log(data))

const statusElement = document.querySelector('[data-status]')
const locationElement = document.querySelector('[data-location]')
const windElement = document.querySelector('[data-wind]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const imgElement = document.querySelector('[data-image]');

function setWeatherData(data, place) {
    locationElement.textContent = place
    statusElement.textContent = data.weather[0].description
    windElement.textContent = data.wind_speed
    temperatureElement.textContent = data.temp
    precipitationElement.textContent = data.clouds
    imgElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
}