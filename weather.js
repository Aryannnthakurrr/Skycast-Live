var inputvalue = document.querySelector('#cityinput');
var btn = document.querySelector('#add');
var city = document.querySelector('#cityoutput');
var descrip = document.querySelector('#description');
var temp = document.querySelector('#temp');
var wind = document.querySelector('#wind');
var apik = "37750ea5499d12ad6ec05be9bf0e0f0e";

function convertion(val) {
    return (val - 273).toFixed(3);
}

// Create a function for the weather lookup logic to avoid code duplication
function getWeather() {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + inputvalue.value + '&appid=' + apik)
        .then(res => res.json())
        .then(data => {
            var nameval = data['name'];
            var description = data['weather'][0]['description'];
            var temperature = data['main']['temp'];
            var windspeed = data['wind']['speed'];

            city.innerHTML = `Weather Of : <span>${nameval}</span>`;
            temp.innerHTML = `Temperature: <span>${convertion(temperature)} C</span>`;
            descrip.innerHTML = `Sky condition: <span>${description}</span>`;
            wind.innerHTML = `Wind Speed: <span>${windspeed} km/h</span>`;
        })
        .catch(err => alert('Error: ' + err.message + '. Please check the city name or try again later.'));
}

// Add click event listener
btn.addEventListener('click', getWeather);

// Add keypress event listener for Enter key
inputvalue.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        getWeather();
    }
});
