//### CONSTANTS
const REGEX = new RegExp('^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}');
const KEY = "a9dd28374d5794594515019dd6830dc5"
const URL_API = "https://api.openweathermap.org/data/2.5/weather?"
const UNIT = "metric"

let lat = null;
let lon = null;

let messageLat = "Insira a Latitude:";
let messageLon = "Insira a Longitude:";

//-22.683354
//-44.311306

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
    const infos = response;
    console.log("FOI");
    console.log(infos);
}

// Show error message
function error(response) {
    const erro = response;
    console.log("ERRO!!");
    console.log(erro);
}