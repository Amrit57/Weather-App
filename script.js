const searchBtn = document.querySelector("#search")
const searchBar = document.querySelector('input');
const weatherIcon = document.querySelector('.icon')
const tempText = document.querySelector('.temp');
const humidityText = document.querySelector('.humidity')
const UVText = document.querySelector('.UV')
const windText = document.querySelector('.wind')
const cityName = document.querySelector('.city-name')
const localTime = document.querySelector('.time')
const conditionText = document.querySelector('.condition')


searchBtn.addEventListener('click', renderData)
document.addEventListener('keypress', (e) => {
    if (e.code == 'Enter') return renderData();
})


async function getJson() {


    const inputText = searchBar.value;
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=77d212bea90d4ea686424948231206&q=${inputText}`, { mode: "cors" })
    const jsonData = await response.json();
    console.log(jsonData)
    return jsonData;


}

function renderData() {

    getJson().then(jsonData => {
        const iconSrc = jsonData.current.condition.icon;
        const temp_C = jsonData.current.temp_c;
        const temp_F = jsonData.current.temp_f;
        const humidity = jsonData.current.humidity;
        const UV = jsonData.current.uv;
        const wind = jsonData.current.wind_kph;
        const city = jsonData.location.name;
        const country = jsonData.location.country
        const time = jsonData.location.localtime;
        const condition = jsonData.current.condition.text;

        cityName.textContent = `${city}, ${country}`;
        weatherIcon.src = iconSrc;
        tempText.innerHTML = `${temp_C}°C `;
        humidityText.textContent = `Humidity: ${humidity}%`;
        UVText.textContent = `UV Index:${UV}`;
        windText.textContent = `Wind: ${wind}km/h`;
        localTime.textContent = `${time}`;
        conditionText.textContent = `Condition: ${condition}`;
        clearInput()

    }).catch(error => {
        alert("No matching location/city found  ")
        clearInput()
    })

}

function clearInput() {
    searchBar.value = '';
}
