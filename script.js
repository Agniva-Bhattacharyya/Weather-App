const API_KEY = "e99af70cc80c47f7806134615250107"; //weather api key

const temperatureField = document.getElementById("temperature");
const locationField = document.getElementById("location");
const conditionField = document.getElementById("description");
const dateTimeField = document.getElementById("datetime");
const iconField = document.getElementById("weather_icon");
const searchField = document.getElementById("search_area");
const form = document.getElementById("weatherForm");

form.addEventListener("submit", searchForLocation);

let defaultCity = "Kolkata";
fetchWeather(defaultCity);

async function fetchWeather(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("City not found");
    }

    const data = await res.json();

    const locationName = `${data.location.name}, ${data.location.region}`;
    const time = formatDateTime(data.location.localtime);
    const temp = `${data.current.temp_c}°C`;
    const condition = data.current.condition.text;
    const icon = "https:" + data.current.condition.icon;

    updateWeather(temp, locationName, time, condition, icon);
  } catch (error) {
    alert("City not found. Please try again.");
    console.error(error);
  }
}

function updateWeather(temp, location, time, condition, icon) {
  temperatureField.textContent = temp;
  locationField.textContent = location;
  dateTimeField.textContent = time;
  conditionField.textContent = condition;
  iconField.src = icon;
  iconField.alt = condition;
}

function searchForLocation(event) {
  event.preventDefault();
  const city = searchField.value.trim();
  if (city) fetchWeather(city);
  form.reset();
}

function formatDateTime(dateTimeStr) {
  const [date, time] = dateTimeStr.split(" ");
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateObj = new Date(dateTimeStr);
  const dayName = days[dateObj.getDay()];
  return `${time} — ${dayName} ${date}`;
}
