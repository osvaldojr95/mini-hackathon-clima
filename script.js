//### CONSTANTS
const REGEX = new RegExp('^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}');
const KEY = "a9dd28374d5794594515019dd6830dc5"
const URL_API = "https://api.openweathermap.org/data/2.5/weather?"
const UNIT = "metric"

let lat = null;
let lon = null;

let messageLat = "Insira a Latitude:";
let messageLon = "Insira a Longitude:";

// get latitude and longitude from input elements
function getLatLonByElemts() {
    latElement = document.querySelector(".login-input.latitude");
    lonElement = document.querySelector(".login-input.longitude");

    if (latElement.value !== null) {
        lat = latElement.value;
    } else {
        lat = null;
        latElement.value = "";
        latElement.placeholder = "Insira a latitude!"
    }

    if (lonElement.value !== null) {
        lon = lonElement.value;
    } else {
        lon = null;
        lonElement.value = "";
        lonElement.placeholder = "Insira a longitude!"
    }

    if (lat !== null && lon !== null) {
        VerifyLatLon();
    } else {
        console.log("ERRO DE LATITUDE E LONGITUDE");
    }

}

// Insert latitude and longitude manually
function VerifyLatLon() {
    if (!REGEX.test(lat)) {
        lat = null;
        latElement = document.querySelector(".login-input.latitude");
        latElement.value = "";
        latElement.placeholder = "Insira a latitude!"
    }

    if (!REGEX.test(lon)) {
        lon = null;
        lonElement = document.querySelector(".login-input.longitude");
        lonElement.value = "";
        lonElement.placeholder = "Insira uma longitude válida!"
    }

    if (lat !== null && lon !== null) {
        getWeatherbyLatLon();
    }else{
        console.log("teste")
    }
}

// Seach weather by latitude and longitude
function getWeatherbyLatLon() {
    const link = URL_API + `lat=${lat}&lon=${lon}&appid=${KEY}&units=${UNIT}`;
    const promise = axios.get(link);

    // Success
    promise.then((response) => fillWeatherScreen(response.data));

    // Failed
    promise.catch((response) => error(response));
}

// Fill Weather Screen with information obtained
function fillWeatherScreen(response) {
    const tela1 = document.querySelector(".tela1");
    tela1.classList.add("hidden");

    const tela2 = document.querySelector(".tela2");
    tela2.classList.remove("hidden");

    const city = document.querySelector(".tela2 .city");
    city.innerHTML = response.name;

    const country = document.querySelector(".tela2 .country");
    country.innerHTML = response.sys.country;

    const temp = document.querySelector(".tela2 .temp");
    temp.innerHTML = Math.ceil(Number(response.main.temp)).toFixed(0)+'°C';

    const feels_like = document.querySelector(".tela2 .feels_like");
    feels_like.innerHTML =  Math.ceil(Number(response.main.feels_like)).toFixed(0)+'°C';
    
    const pressure = document.querySelector(".tela2 .pressure");
    pressure.innerHTML = response.main.pressure + 'hPa';

    const humidity = document.querySelector(".tela2 .humidity");
    humidity.innerHTML = response.main.humidity + '%';

    const temp_min = document.querySelector(".tela2 .temp_min");
    temp_min.innerHTML = Math.floor(Number(response.main.temp_min)).toFixed(0)+'°C';
    
    const temp_max = document.querySelector(".tela2 .temp_max");
    temp_max.innerHTML = Math.round(Number(response.main.temp_max)).toFixed(0)+'°C';

}

// Show error message
function error(response) {
    lon = null;
    lat = null;

    latElement = document.querySelector(".login-input.latitude");
    latElement.value = "";

    lonElement = document.querySelector(".login-input.longitude");
    lonElement.value = "";
    
    element = document.querySelector(".tela1 h3");
    element.innerHTML = "Não foi possível encontrar os dados para essa localização, por favor insira outra localização!";
}