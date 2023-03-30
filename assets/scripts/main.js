const temperature = document.querySelector('h2');
console.log(temperature);

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=51.5085&lon=-0.1257&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        console.log(data.wind);
        // data.weather.forEach(elt => {
        //     console.log(elt);
        // });
    })

