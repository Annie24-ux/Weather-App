function showWeatherChange(response) {
    let currentCity = document.querySelector(".current-city");
    let newCity = response.data.city;
  
    currentCity.innerHTML = newCity;
  
    let currentTemp = document.querySelector(".current-temperature-value");
    let newTemp = Math.round(response.data.temperature.current);
  
    currentTemp.innerHTML = newTemp;
  }
  
  function search(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    let cityElement = searchInputElement.value;
  
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${cityElement}&key=${apiKey}&units=metric`;
  
    axios.get(weatherUrl).then(showWeatherChange);
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    if (hours < 10) {
      hours = `0${hours}`;
    }
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  
    let formattedDay = days[day];
    return `${formattedDay} ${hours}:${minutes}`;
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
  
  let currentDateELement = document.querySelector("#current-date");
  let currentDate = new Date();
  
  currentDateELement.innerHTML = formatDate(currentDate);
  