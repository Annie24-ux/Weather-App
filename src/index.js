function searchSubmitHandler(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#form-input");
    citySearch(searchInput.value);
}


function refreshWeather(response){
    let temperatureElement = document.querySelector("#temperature");
    let temperature = Math.round(response.data.temperature.current);

    let cityElement = document.querySelector("#city");

    cityElement.innerHTML = response.data.city;

    temperatureElement.innerHTML = temperature;

    let descriptionElement = document.querySelector("#description");
    let description = response.data.condition.description;
    descriptionElement.innerHTML = ", " + description;


    let humidElement = document.querySelector("#humid");
    let humid = response.data.temperature.humidity;
    humidElement.innerHTML = `${humid} %`;

    let windElement = document.querySelector("#wind");
    let wind = response.data.wind.speed;
    windElement.innerHTML = `${wind}  km/h`;

    let timeElement = document.querySelector("#time");
    let weatherDate = new Date(response.data.time * 1000);
    timeElement.innerHTML = formatDate(weatherDate);

    let iconElement = document.querySelector("#weather-icon");
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;
  

    function formatDate(date){

        let weekDays = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let day = weekDays[date.getDay()];

        if(minutes < 10){
            minutes = `0${minutes}`;
        }

        if(hours < 10){
            hours = `0${hours}`;
        }

        return `${day} ${hours}:${minutes}`;




    }
}


function citySearch(city){
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let weatherUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    let forecastUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    console.log(weatherUrl);

    axios.get(weatherUrl).then(refreshWeather);

    axios.get(forecastUrl).then(displayDaysForecast);
}


function getFormattedDay(timestamp){
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let today = new Date(timestamp * 1000);
  return days[today.getDay()];
}



function displayDaysForecast(response) {
  
    let forecastHTML = "";
  
    response.data.daily.forEach(function(day, index) {

      if(index < 5){

        forecastHTML += `
        <div class="weather-card">
          <div class="weather-day">${getFormattedDay(day.time)}</div>
          <img src= "${day.condition.icon_url}" class="daily-icon">
          <div class="weather-values">
            <div class="weather-temp"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
            <div class="weather-temp">${Math.round(day.temperature.minimum)}°</div>
          </div>
          
        </div>`;

      }
      
    });
  
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
  }
  


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", searchSubmitHandler);

citySearch("Malelane");   
displayDaysForecast();
