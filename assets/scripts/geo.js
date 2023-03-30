const limit = "100";

const getGeoData = async (city, stateCode, countryCode) => {
	const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`);
	const data = await response.json().then(data => data[0]);
	console.log(data);
	return {
		name: data.name,
		state: data.state,
		country: data.country,
		lateral: data.lat,
		longitude: data.lon
	}
}
