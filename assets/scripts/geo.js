const getGeoData = async (zip, countryCode) => {
	console.log(zip, countryCode)
	return fetch(`https://api.openweathermap.org/geo/1.0/zip?zip=${zip},${countryCode}&appid=${apiKey}`)
		.then(responseData => responseData.json())
}

