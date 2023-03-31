// Get the geographical data for Düsseldorf with latitude 49 and longitude NW
getGeoData("49196", "DE").then(geoData => {
	console.log(geoData)
	// Fetch the weather data for the given latitude and longitude using the OpenWeatherMap API
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=metric&appid=${apiKey}`)
		.then(response => response.json())
		.then(data => {
			// Call the updateWeather function with the retrieved geographical and weather data
			updateWeather(geoData, data);
		})
})

// Update the weather information on the webpage with the given geographical and weather data
const updateWeather = (geoData, weatherData) => {
	// Select the HTML container element where the weather information will be displayed
	const container = document.querySelector('#container');

	// Update the container's inner HTML with the relevant weather information and geographical location
	container.innerHTML = `
		<article class="weather-info">
		<h1 class="both-col">Weather in ${geoData.name}, ${geoData.country}</h1>
			<img class="left-col" src="http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png" alt="image of ${weatherData.weather[0].description}">
			<h3 class="right-col">${weatherData.main.temp}°C</h3>
			<p class="both-col">${weatherData.weather[0].description}</p>
			<div>
			<p class="left-col">last updated: ${new Date().toLocaleTimeString("de-DE")}, ${new Date().toLocaleDateString("de-DE")}</p>
			<a class="right-col" id ="data" href="#">wrong data?</a>
			</div>
			
			
		</article>
	`;

	// Define a TableElement constructor function that takes in key-value pairs and sets them as properties
	function TableElement(key, value) {
		this.key = key;
		this.value = value;
	};

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
			value: `${weatherData.sys.sunrise}`
		},
		{
			key: "Sunset",
			value: `${weatherData.sys.sunset}`
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
}
