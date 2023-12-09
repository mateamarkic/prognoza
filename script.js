const apiKey = 'b4fc3949a80334e922d4ade2e414bf2a' 
const home = document.querySelector('.home')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('#temperature')
const weatherType = document.querySelector('#weatherType')
const cityName = document.querySelector('#cityName')
const feelsLike = document.querySelector('#feelsLike')
const humidity = document.querySelector('#humidity')
const form = document.querySelector('form')
const errorMessage = document.querySelector('.error')
const body = document.querySelector('body')

form.addEventListener('submit', function (event) {
  event.preventDefault()
  showWeather()
})

function showWeather() {
  const city = document.querySelector('#city').value
  home.style.display = 'none'
  weather.style.display = 'flex'
  fetchData(city)
  .then(data => {
    displayWeatherData(data)
    })
  .catch(error => {
    console.dir(error)
    showError()
  })
}

function fetchData(city) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`).then(
    response => {
      if (!response.ok) {
        throw new Error(`${response.status}`)
      }
      return response.json()
    }
  )
}

function displayWeatherData(data) {
  errorMessage.style.display = 'none'
  temperature.innerHTML = `${data.main.temp.toFixed(1)}°C`
  weatherType.innerHTML = data.weather[0].description
  cityName.innerHTML = `${city.value}`
  feelsLike.innerHTML = `${data.main.feels_like.toFixed(1)}°C`
  humidity.innerHTML = `${data.main.humidity}%`
  if (data.main.temp < 5) {
    body.style.backgroundImage = `url("slike/oblaci.jpg")`
  } else {
    body.style.backgroundImage = `url("slike/sunce.jpg")`
  }
}

function showError() {
  weather.style.display = 'none'
  errorMessage.style.display = 'flex'
}