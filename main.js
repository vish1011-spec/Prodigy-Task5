
document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '25f5865886dd1825dc4480002fa7a962';
    
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const locationInput = document.getElementById('location-input');
    const weatherInfoDiv = document.getElementById('weather-info');

    getWeatherBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            fetchWeather(location);
        } else {
            alert('Please enter a location.');
        }
    });

    function fetchWeather(location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error fetching weather data:', error));
    }

    function displayWeather(data) {
        if (data.cod === 200) {
            const weatherHtml = `
                <div class="weather-item"><strong>Location:</strong> ${data.name}, ${data.sys.country}</div>
                <div class="weather-item"><strong>Temperature:</strong> ${data.main.temp} °C</div>
                <div class="weather-item"><strong>Weather:</strong> ${data.weather[0].description}</div>
                <div class="weather-item"><strong>Humidity:</strong> ${data.main.humidity} %</div>
                <div class="weather-item"><strong>Wind Speed:</strong> ${data.wind.speed} m/s</div>
            `;
            weatherInfoDiv.innerHTML = weatherHtml;
        } else {
            weatherInfoDiv.innerHTML = `<div class="weather-item">Error: ${data.message}</div>`;
        }
    }
});