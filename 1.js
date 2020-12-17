// var form = document.forms.forma;
// form.addEventListener('submit', addCity());

// var input = document.getElementById("input_city");
//
// // Execute a function when the user releases a key on the keyboard
// input.addEventListener("keyup", function (event) {
//     if (event.keyCode === 13) {
//         addCity()
//     }
// });


var indexCard = 0


//опредяляет настоящую геолокацию и обновляет верхний экран
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

function logSubmit(event) {

    console.log("Я добавил тебе город - чекай ")
    var nameOfSity = event.srcElement.nameSity.value

    addCity(nameOfSity)


    event.srcElement.nameSity.value = ""


    event.preventDefault();
}

async function API(inputSity) {
    return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputSity}&appid=d94765103f2d3e31a0239fea4c47c1f8`)
}
function callCallAPI(ul,clone ,CITY, inCard, inputSity) {
    return API(inputSity)
        .then(resp => {
            if (!resp.ok || resp.status > 400) {
                elem = document.getElementById(inCard);
                elem.parentNode.removeChild(elem);
                localStorage.removeItem(inCard)
                alert("city is not found")
            }
            return resp.json();
        })
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

            console.log("kek")

            document.getElementById(inCard).querySelector(`#card-city`).innerHTML = CITY.name
            document.getElementById(inCard).querySelector(`#card-wind`).innerHTML = CITY.wind;
            document.getElementById(inCard).querySelector(`#card-cloudy`).innerHTML = CITY.cloudy;
            document.getElementById(inCard).querySelector(`#card-pressure`).innerHTML = CITY.pressure;
            document.getElementById(inCard).querySelector(`#card-humidity`).innerHTML = CITY.humidity;
            document.getElementById(inCard).querySelector(`#card-coordinate`).innerHTML = CITY.coordinate;
            document.getElementById(inCard).querySelector(`#card-temperature`).innerHTML = CITY.temperature;
            document.getElementById(inCard).querySelector(`#card-smile`).innerHTML = CITY.img;

            localStorage.getItem(inCard)
            localStorage.setItem(inCard, inputSity)

            ul.appendChild(clone)
        })
        .catch((e) => {
            elem = document.getElementById(inCard);
            elem.parentNode.removeChild(elem);
            localStorage.removeItem(inCard)
            alert("включи интернет")
            console.log(e)
        })
}
// Функционал добавления города
async function addCity(nameOfSity) {

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

    var inputSity = nameOfSity

    var ul = document.getElementById("double");
    var template = document.getElementById('tmpl')


    var clone = template.content.cloneNode(true)
    var inCard = indexCard
    indexCard++;
    console.log(inCard)
    clone.querySelector("li").id = inCard;


    clone.getElementById("delete-card").onclick = function () {
        elem = document.getElementById(inCard);
        elem.parentNode.removeChild(elem);
        localStorage.removeItem(inCard)
    };

    ul.appendChild(clone)

    await callCallAPI(ul, clone ,CITY, inCard, inputSity)

}

function updateCards() {

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

    for (let i = 0; i < localStorage.length; i++) {
        var ul = document.getElementById("double");
        var key = localStorage.key(i);


        if (parseInt(key) > maxindex) {
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
                    localStorage.removeItem(parseInt(key));
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

            .catch(
                err => console.log("Wrong city name!")
            )


    }

    indexCard = maxindex + 1;
}

document.addEventListener('submit', logSubmit);

document.querySelector('#find-me').addEventListener('click', geoFindMe);
document.querySelector('#find-me-mobile').addEventListener('click', geoFindMe);

updateCards()
geoFindMe()





