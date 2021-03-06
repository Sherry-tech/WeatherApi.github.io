const cityForm = document.querySelector("form");
const card  = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");


const updateUI = (data) => {

    console.log(data);
    // const cityDets = data.cityDets;
    // const weather = data.weather;

    //destructure properties
    const {cityDets, weather} = data;

    //update details template
    details.innerHTML = `
    
    <h5 class="my-3">${cityDets.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weather.Temperature.Metric.Value}</span>
    <span>&deg;C</span>

    `;

    //update the night & day image using ternary operator

    let timesrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timesrc);

    //update icon
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src',iconSrc);



    //remove the d-none class
    if(card.classList.contains("d-none"))
    {
        card.classList.remove("d-none");
    }

};


const updateCity = async (city) => {

    const cityDets = await getCity(city);
    const weather = await getWeather(cityDets.Key);

    //we will use Object Short Hand Notation the keyname and the value names are same that's why..
    return { cityDets, weather };

};


cityForm.addEventListener("submit", (e) => {
    e.preventDefault();

    //get city value
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update the ui with new city
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));
});