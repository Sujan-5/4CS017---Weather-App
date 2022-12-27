// Check browser cache first, use if there and less than 10 seconds old
if (
  localStorage.when != null &&
  parseInt(localStorage.when) + 10000 > Date.now()
) {
  let freshness =
    Math.round((Date.now() - localStorage.when) / 1000) + ' second(s)';

  document.getElementById('mycity').innerHTML = localStorage.city;
  document.getElementById('description').innerHTML = localStorage.description;
  document.getElementById('temperature').innerHTML =
    localStorage.temperature + '°C';
  document.getElementById('humidity').innerHTML =
    'Humidity: ' + localStorage.humidity + '%';
  document.getElementById('pressure').innerHTML =
    'Pressure: ' + localStorage.pressure + ' hpa';
  document.getElementById('wind').innerHTML =
    'wind speed: ' + localStorage.wind + ' km/h';
  document.getElementById('time').innerHTML = localStorage.time;
  document.getElementById('icon').src =
    'https://openweathermap.org/img/wn/' + localStorage.icon + '.png';
  document.getElementById('LastUpdated').innerHTML = 'Update: ' + freshness;

  // No local cache, access network
} else {
  // Fetch weather data from API for given city
  fetch('http://localhost/prototype3/filename.php?city=Ilford')
    // Convert response string to json object
    .then((response) => response.json())
    .then((response) => {
      //fetching response from table and showing into html
      document.getElementById('mycity').innerHTML =
        response.city + ', ' + response.country;
      document.getElementById('description').innerHTML =
        response.weather_description;
      document.getElementById('temperature').innerHTML =
        response.weather_temperature + '°C';
      document.getElementById('humidity').innerHTML =
        'Humidity: ' + response.weather_humidity + '%';
      document.getElementById('pressure').innerHTML =
        'Pressure: ' + response.weather_pressure + ' hpa';
      document.getElementById('wind').innerHTML =
        'wind speed: ' + response.weather_wind + ' km/h';
      document.getElementById('time').innerHTML = response.weather_when;
      document.getElementById('icon').src =
        'https://openweathermap.org/img/wn/' + response.weather_icon + '.png'; //weather icon changes according to weather change

      // Save new response to browser, with new timestamp
      localStorage.description = response.weather_description;
      localStorage.temperature = response.weather_temperature;
      localStorage.icon = response.weather_icon;
      localStorage.wind = response.weather_wind;
      localStorage.pressure = response.weather_pressure;
      localStorage.time = response.weather_when;
      localStorage.humidity = response.weather_humidity;
      localStorage.when = Date.now(); // milliseconds since January 1 1970
      localStorage.city = response.city + ', ' + response.country;
    })

    .catch((err) => {
      // Display errors in console
      console.log(err);
    });
}
