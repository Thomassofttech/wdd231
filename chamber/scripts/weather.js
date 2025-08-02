const tempElement = document.getElementById("temperature") .textContent = "29.5°C";
const descElement = document.getElementById("description") .textContent = "partly cloudy";
const forecastContainer = document.getElementById("forecast");

// Replace with your OpenWeatherMap API key
const apiKey = "67da38c7d077448902572547968c788f"; 
const abujaLat = 9.05785;
const abujaLon = 7.49508;
const units = "metric";

// // Fetch current weather
// async function getWeather() {
//   const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${abujaLat}&lon=${abujaLon}&appid=${apiKey}&units=${units}`;
//   const response = await fetch(url);
//   const data = await response.json();

//   // Current weather
//   const current = data.list[0];
//   tempElement.textContent = `${current.main.temp.toFixed(1)}°C`;
//   descElement.textContent = current.weather[0].description;

//   // Forecast (next 3 days at 12:00 PM)
//   forecastContainer.innerHTML = "<h4>3-Day Forecast</h4>";
//   const forecastDays = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
//   forecastDays.forEach(day => {
//     const date = new Date(day.dt_txt);
//     forecastContainer.innerHTML += `
//       <p>${date.toDateString()}: ${day.main.temp.toFixed(1)}°C</p>
//     `;
//   });
// }

// getWeather();

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${abujaLat}&lon=${abujaLon}&appid=${apiKey}&units=${units}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    // Current weather
    const current = data.list[0];
    tempElement.textContent = `${current.main.temp.toFixed(1)}°C`;
    descElement.textContent = current.weather[0].description;

    // Forecast (next 3 days at 12:00 PM)
    forecastContainer.innerHTML = "<h4>3-Day Forecast</h4>";
    const forecastDays = data.list
      .filter(item => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    forecastDays.forEach(day => {
      const date = new Date(day.dt_txt);
      forecastContainer.innerHTML += `
        <p>${date.toDateString()}: ${day.main.temp.toFixed(1)}°C</p>
      `;
    });

  } catch (error) {
    console.error("Weather fetch failed:", error.message);
    forecastContainer.innerHTML = `<p>⚠️ Unable to load weather data.</p>`;
  }
}

