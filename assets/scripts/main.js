const weatherTable = document.querySelector('#weather-table');
let monate = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
];


weatherTable.innerHTML = `<table width="100%" border="1">
        <tr>
            <td>Local Time</td>
            <td id="localTime"></td>
        </tr>
        <tr>
            <td>Wind</td>
            <td id="windCity"></td>
        </tr>
        <tr>
            <td>Cloudiness</td>
            <td id="cloudCity"></td>
        </tr>
        <tr>
            <td>Pressure</td>
            <td id="pressureCity"></td>
        </tr>
        <tr>
            <td>Humidity</td>
            <td id="humidityCity"></td>
        </tr>
        <tr>
            <td>Sunrise</td>
            <td id="sunriseCity"></td>
        </tr>
        <tr>
            <td>Sunset</td>
            <td id="sunsetCity"></td>
        </tr>
        <tr>
            <td>Geo coords</td>
            <td id="geoCity"></td>
        </tr>`;


getGeoData("Düsseldorf", "NW", "49").then(data => {
    console.log(data);
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${data.lateral}&lon=${data.longitude}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const weatherImage = document.querySelector('#weatherImage');
            weatherImage.setAttribute('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`)

            const windCity = document.querySelector('#windCity');
            windCity.innerHTML = `${data.wind.speed} ${data.wind.deg} ${data.wind.gust}`;

            const cloudCity = document.querySelector('#cloudCity');
            cloudCity.innerHTML = `${data.weather[0].description}`;

            const pressureCity = document.querySelector('#pressureCity');
            pressureCity.innerHTML = `${data.main.pressure} hpa`

            const humidityCity = document.querySelector('#humidityCity');
            humidityCity.innerHTML = `${data.main.humidity} %`

            const sunriseCity = document.querySelector('#sunriseCity');
            sunriseCity.innerHTML = `${data.sys.sunrise}`
            // let timestamp = data.sys.sunrise;
            // let date2 = new Date(timestamp).getHour();
            // // console.log(date2.getTime())
            // // console.log(date2)
            // sunriseCity.innerHTML = `${date2}`

            const sunsetCity = document.querySelector('#sunsetCity');
            sunsetCity.innerHTML = `${data.sys.sunset}`

            const geoCity = document.querySelector('#geoCity');
            geoCity.innerHTML = `[${data.coord.lat.toFixed(2)}, ${data.coord.lon.toFixed(2)}]`;


            // BITTE NICHT LÖSCHEN; WIRD NOCH FÜR DIE UHR BENÖTIGT
        })
        .then(() => {
            // let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
            const temperature = document.querySelector('h2');
            const weatherDescription = document.querySelector('#weatherDescription');
            // const obtainedTime = document.querySelector();
            const localTimeCity = document.querySelector('#localTime');
            const date = new Date();
            // console.log(date);
            localTimeCity.innerHTML = `${date.getHours()}:${date.getMinutes()}, ${date.getDate()}. ${monate[date.getMonth()]} ${date.getFullYear()}`;
        })
})










        // data.forEach((elt) => {
        //     // console.log(elt);
        //     // console.log(elt.name);
        //     // console.log(elt.email);
        //     // console.log(elt.website);
        //     section.innerHTML +=
        //     <div>
        //     <p>${elt.name}</p>
        //     <p>${elt.email}</p>
        //     <p>${elt.website}</p>
        //     </div>`

        // })

