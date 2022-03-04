const KEY = "a9dd28374d5794594515019dd6830dc5"
const url_api = "api.openweathermap.org/data/2.5/weather?"

objeto = {
    lat: "-22.683354",
    lon: "-44.311306",
    appid: "a9dd28374d5794594515019dd6830dc5",
    units: "metric"
};

const link = url_api + `lat=${objeto.lat}&lon=${objeto.lon}&appid=${objeto.appid}&units=${objeto.units}`;
const promise = axios.get(link);

promise.then((response)=>{
    console.log(response);
})

promise.catch((response)=>{
    console.log(response);
})