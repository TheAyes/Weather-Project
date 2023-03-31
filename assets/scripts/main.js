const fetchWeatherData = (value) => {
	let targetValue;

	if (value === "" || value === null ||value === undefined){
		targetValue = "40210"
	}
	else {
		targetValue = value
	}

	getGeoData(targetValue, "DE").then(geoData => {
		console.log(geoData)
		// Fetch the weather data for the given latitude and longitude using the OpenWeatherMap API
		fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=metric&appid=${apiKey}`)
			.then(response => response.json())
			.then(weatherData => {
				// Select the HTML container element where the weather information will be displayed
				const container = document.querySelector('#container');

				// Update the container's inner HTML with the relevant weather information and geographical location
				container.innerHTML = `
					<article class="weather-info">
						<h1 class="both-col">Weather in ${geoData.name}, ${geoData.country}</h1>
						<img class="left-col" src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="image of ${weatherData.weather[0].description}">
						<h3 class="right-col">${weatherData.main.temp}°C</h3>
						<p class="both-col">${weatherData.weather[0].description}</p>
						<div>
							<p class="left-col">last updated: ${new Date().toLocaleTimeString("de-DE")}, ${new Date().toLocaleDateString("de-DE")}</p>
							<a class="right-col" id ="data" href="#">wrong data?</a>
						</div>
					</article>
				`;

				// Create an array of TableElement instances representing the different weather attributes to be displayed
				const tableElements = [
					{
						key: "Local Time",
						value: `${new Date().toLocaleTimeString("de-DE")}`
					},
					{
						key: "Wind",
						value: `${weatherData.wind.speed} ${weatherData.wind.deg} ${weatherData.wind.gust}`
					},
					{
						key: "Cloudiness",
						value: `${weatherData.weather[0].description}`
					},
					{
						key: "Pressure",
						value: `${weatherData.main.pressure} hpa`
					},
					{
						key: "Humidity",
						value: `${weatherData.main.humidity}%`
					},
					{
						key: "Sunrise",
						value: `${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}`
					},
					{
						key: "Sunset",
						value: `${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}`
					},
					{
						key: "Geo Coords",
						value: `[${weatherData.coord.lat.toFixed(2)}, ${weatherData.coord.lon.toFixed(2)}]`
					}
				]

				// Iterate over the array of TableElements and add each one to the container's inner HTML
				const tableContainer = document.createElement("article");
				tableContainer.classList.add("weatherTable");
				tableElements.forEach(item => {
					tableContainer.innerHTML += `
						<div>
							<p class="left-col">${item.key}</p>
							<p class="right-col">${item.value}</p>
						</div>
					`;
				})
				container.appendChild(tableContainer)
			})
	})
}

const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click" , event => {
	fetchWeatherData(document.querySelector("#zipField").value);
})

fetchWeatherData()