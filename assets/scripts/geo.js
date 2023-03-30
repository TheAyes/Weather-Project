const limit = "100";

const getGeoData = async (city, stateCode, countryCode) => {
	const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=${limit}&appid=${apiKey}`);
	const data = await response.json().then(data => data[0]);

	return {
		name: data.name,
		state: data.state,
		country: data.country,
		latitude: data.lat,
		longitude: data.lon
	}
}

