var indexCard = 0

function geoFindMe() {

    document.querySelector('#main_city').innerHTML = '';

    function nosuccess() {

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=d94765103f2d3e31a0239fea4c47c1f8`)
            .then(response => response.json())
            .then(function (data) {
                console.log(data);
                document.querySelector('#main_city').innerHTML = data.name;
                document.querySelector('#main-city-wind').innerHTML = data.weather[0].main + ", " + data.wind.speed + "m/s, degree: " + data.wind.deg;
                document.querySelector('#main-city-cloudy').innerHTML = data.weather[0].description;
                document.querySelector('#main-city-pressure').innerHTML = data.main.pressure + " hpa";
                document.querySelector('#main-city-humidity').innerHTML = data.main.humidity + "%";
                document.querySelector('#main-city-coordinate').innerHTML = "[" + data.coord.lon + ", " + data.coord.lat + "]";
                document.querySelector('#main-city-temperature').innerHTML = Math.round(data.main.temp - 273) + "C" + `&deg`;
                document.querySelector('#main-city-smile').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;

            })

            .catch(err => alert("Wrong city name!" + err));

    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.assert(latitude, "  ", longitude)


        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=d94765103f2d3e31a0239fea4c47c1f8`)
            .then(response => response.json())
            .then(function (data) {
                console.log(data);
                document.querySelector('#main_city').innerHTML = data.name;
                document.querySelector('#main-city-wind').innerHTML = data.weather[0].main + ", " + data.wind.speed + "m/s, degree: " + data.wind.deg;
                document.querySelector('#main-city-cloudy').innerHTML = data.weather[0].description;
                document.querySelector('#main-city-pressure').innerHTML = data.main.pressure + " hpa";
                document.querySelector('#main-city-humidity').innerHTML = data.main.humidity + "%";
                document.querySelector('#main-city-coordinate').innerHTML = "[" + data.coord.lon + ", " + data.coord.lat + "]";
                document.querySelector('#main-city-temperature').innerHTML = Math.round(data.main.temp - 273) + "C" + `&deg`;
                document.querySelector('#main-city-smile').innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;

            })

            .catch(err => alert("Wrong city name!" + err));
    }

    function error() {
        console.assert('Unable to retrieve your location');
    }

    if (!navigator.geolocation) {
        console.assert('Geolocation is not supported by your browser');
    } else {
        document.querySelector('#main_city').innerHTML = 'Locating…';
        navigator.geolocation.getCurrentPosition(success, nosuccess);
    }

}


// Функционал добавления города
function addCity() {

    var CITY = {
        name: null,
        wind: null,
        cloudy: null,
        pressure: null,
        humidity: null,
        coordinate: null,
        temperature: null,
        img: null
    }

    var inputSity = document.getElementById('input_city').value
    var ul = document.getElementById("double");
    var template = document.getElementById('tmpl')


    var clone = template.content.cloneNode(true)
    var inCard = indexCard
    indexCard++;
    clone.querySelector("li").id = inCard;



    clone.getElementById("delete-card").onclick = function () {
        elem = document.getElementById(inCard);
        elem.parentNode.removeChild(elem);
        localStorage.removeItem(inCard)
    };


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputSity}&appid=d94765103f2d3e31a0239fea4c47c1f8`)
        .then(response => response.json())
        .then(function (data) {
            console.log(data);

            CITY.name = data.name;
            CITY.wind = data.weather[0].main + ", " + data.wind.speed + "m/s, degree: " + data.wind.deg;
            CITY.cloudy = data.weather[0].description;
            CITY.pressure = data.main.pressure + " hpa";
            CITY.humidity = data.main.humidity + "%";
            CITY.coordinate = "[" + data.coord.lon + ", " + data.coord.lat + "]";
            CITY.temperature = Math.round(data.main.temp - 273) + "C" + `&deg`;
            CITY.img = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;

            clone.querySelector(`#card-city`).innerHTML = CITY.name
            clone.querySelector(`#card-wind`).innerHTML = CITY.wind;
            clone.querySelector(`#card-cloudy`).innerHTML = CITY.cloudy;
            clone.querySelector(`#card-pressure`).innerHTML = CITY.pressure;
            clone.querySelector(`#card-humidity`).innerHTML = CITY.humidity;
            clone.querySelector(`#card-coordinate`).innerHTML = CITY.coordinate;
            clone.querySelector(`#card-temperature`).innerHTML = CITY.temperature;
            clone.querySelector(`#card-smile`).innerHTML = CITY.img;

            localStorage.getItem(inCard)
            localStorage.setItem(inCard, inputSity)
            ul.appendChild(clone)
        })

        .catch(err => console.log("Wrong city name!" + err))

}

function updateCards(){

    var CITY = {
        name: null,
        wind: null,
        cloudy: null,
        pressure: null,
        humidity: null,
        coordinate: null,
        temperature: null,
        img: null
    }


    var maxindex = 0

    for(let i=0; i < localStorage.length; i++) {
        var ul = document.getElementById("double");
        var key = localStorage.key(i);


        if (parseInt(key) > maxindex){
            maxindex = parseInt(key)
        }
        var inputSity = localStorage.getItem(key)
        console.log(inputSity)
        var template = document.getElementById('tmpl')



        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputSity}&appid=d94765103f2d3e31a0239fea4c47c1f8`)
            .then(response => response.json())
            .then(function (data) {
                console.log(data);


                var clone = template.content.cloneNode(true)

                clone.querySelector("li").id = parseInt(key);

                clone.getElementById("delete-card").onclick = function () {
                    elem = document.getElementById(parseInt(key));
                    elem.parentNode.removeChild(elem);
                    localStorage.removeItem(parseInt(key))
                };


                CITY.name = data.name;
                CITY.wind = data.weather[0].main + ", " + data.wind.speed + "m/s, degree: " + data.wind.deg;
                CITY.cloudy = data.weather[0].description;
                CITY.pressure = data.main.pressure + " hpa";
                CITY.humidity = data.main.humidity + "%";
                CITY.coordinate = "[" + data.coord.lon + ", " + data.coord.lat + "]";
                CITY.temperature = Math.round(data.main.temp - 273) + "C" + `&deg`;
                CITY.img = `<img src="https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;

                clone.querySelector(`#card-city`).innerHTML = CITY.name
                clone.querySelector(`#card-wind`).innerHTML = CITY.wind;
                clone.querySelector(`#card-cloudy`).innerHTML = CITY.cloudy;
                clone.querySelector(`#card-pressure`).innerHTML = CITY.pressure;
                clone.querySelector(`#card-humidity`).innerHTML = CITY.humidity;
                clone.querySelector(`#card-coordinate`).innerHTML = CITY.coordinate;
                clone.querySelector(`#card-temperature`).innerHTML = CITY.temperature;
                clone.querySelector(`#card-smile`).innerHTML = CITY.img;

                ul.appendChild(clone)

            })

            .catch(err => console.log("Wrong city name!" + err))

    }

    indexCard = maxindex+1;
}


document.querySelector('#add-city').addEventListener('click', addCity);
document.querySelector('#find-me').addEventListener('click', geoFindMe);
document.querySelector('#find-me-mobile').addEventListener('click', geoFindMe);

updateCards()
geoFindMe()




