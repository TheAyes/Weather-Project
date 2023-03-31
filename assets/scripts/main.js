const fetchWeatherData = (value) => {
	let targetValue;
	console.log("fetched")

	if (value === "" || value === null || value === undefined) {
		targetValue = "40210"
	}
	else {
		targetValue = value
	}

	// Fetch the weather data for the given latitude and longitude using the OpenWeatherMap API
	fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${targetValue},DE&units=metric&appid=${apiKey}`)
		.then(response => response.json())
		.then(weatherData => {
			// Select the HTML container element where the weather information will be displayed
			const container = document.querySelector('#container');

			// Update the container's inner HTML with the relevant weather information and geographical location
			container.innerHTML = `
				<form action="#" onsubmit="return false">
					<label for="zipField">Enter your Zip Code</label>
					<input id="zipField" type="number" required>
					<button id="searchButton" value="search">search</button>
				</form>
				<article class="weather-info">
					<h1 class="both-col">Weather in ${weatherData.name}, ${weatherData.sys.country}</h1>
					<div>
						<img class="left-col" src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png" alt="image of ${weatherData.weather[0].description}">
						<h3 class="right-col">${weatherData.main.temp}°C</h3>
					</div>
					<p class="both-col">${weatherData.weather[0].description}</p>
					<div>
						<p class="left-col">last updated: ${new Date().toLocaleTimeString("de-DE")}, ${new Date().toLocaleDateString("de-DE")}</p>
						<a class="right-col" id ="data" href="#">wrong data?</a>
					</div>
				</article>
			`;

			const searchButton = document.querySelector("#searchButton");
			searchButton.addEventListener("click", event => {
				fetchWeatherData(document.querySelector("#zipField").value);
			})

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
					value: `${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString().slice(0, 5)} `

				},
				{
					key: "Sunset",
					value: `${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString().slice(0, 5)} `
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
			container.appendChild(tableContainer);
		})
}



fetchWeatherData()