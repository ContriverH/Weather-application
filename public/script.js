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
        console.log(data);
        // setWeatherData(data, place.formatted_address)
    })
})