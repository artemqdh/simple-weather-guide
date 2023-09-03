let Render = () =>
{
    const currentLocation = new Map();
    currentLocation.set("currentLatitude", 50.36);
    currentLocation.set("currentLongitude", 36.36);

    // DONT DO IT, PLEASE!!! USE .ENV FILE!!!!!!!!!!
    const apiKey = "";

    if(!apiKey)
    {
        alert("PUT YOUR API KEY!");
    }

    const requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${currentLocation.get("currentLatitude")}&lon=${currentLocation.get("currentLongitude")}&appid=${apiKey}`;

    let requestToWeatherAPI = new XMLHttpRequest();
    requestToWeatherAPI.open("GET", requestURL);
    requestToWeatherAPI.send();
    
    let dataFromWeatherAPI = null;

    requestToWeatherAPI.onload = function(){
        if (requestToWeatherAPI.status != 200) 
        {
            console.log(`Ошибка ${requestToWeatherAPI.status}: ${requestToWeatherAPI.statusText}`);
        }
        else
        {
            console.log(`Готово, получили ${requestToWeatherAPI.response}`);
            dataFromWeatherAPI = JSON.parse(requestToWeatherAPI.response);

            let weaterContainer = document.getElementById('container');
            let simpleResponse = document.createElement('h1');
            simpleResponse.innerText = `Погда - ${dataFromWeatherAPI.weather[0].main}, 
            Температура (цельсия) - ${Math.floor(dataFromWeatherAPI.main.temp - 273.15)}`;
            weaterContainer.appendChild(simpleResponse);
        }
    };
}