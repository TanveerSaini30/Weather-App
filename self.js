const temprature = document.querySelector(".temp");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const initialVal = document.querySelector(".city");
const inputVal = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const icon = document.querySelector(".weather img");

async function weather(city) {
  const api = `https://wttr.in/${city}?format=j1`;

  try {
    const fetchedApi = await fetch(api);
    const data = await fetchedApi.json();

    console.log(data);
    console.log(
      data.nearest_area[0].areaName[0].value,
      data.nearest_area[0].country[0].value
    );

    temprature.innerHTML = data.current_condition[0].temp_C + "°c";
    humidity.innerHTML = data.current_condition[0].humidity + "%";
    wind.innerHTML = data.current_condition[0].windspeedKmph + " Kmph";
    initialVal.innerHTML = data.nearest_area[0].areaName[0].value;

    const condition =
      data.current_condition[0].weatherDesc[0].value.toLowerCase();

    console.log(condition);

    if (condition == "haze") {
      icon.src = "images/haze.png";
    } else if (condition == "clear") {
      icon.src = "images/clear.png";
    } else if (condition == "clouds" || condition == "partly cloudy") {
      icon.src = "images/clouds.png";
    } else if (condition == "clear" || condition == "sunny") {
      icon.src = "images/clear.png";
    } else if (
      condition == "light drizzle" ||
      condition == "light rain shower" ||
      condition == "outcast" ||
      condition == "patchy rain nearby"
    ) {
      icon.src = "images/drizzle.png";
    } else if (condition == "mist") {
      icon.src = "images/mist.png";
    } else if (
      condition == "rain" ||
      condition == "rainy" ||
      condition == "moderate or heavy rain shower" ||
      condition == "light rain with thunderstorm"
    ) {
      icon.src = "images/rain.png";
    } else if (condition == "snow") {
      icon.src = "images/snow.png";
    } else {
      icon.src = "images/confused.png";
    }
    inputVal.value = "";
  } catch (error) {
    console.error("errorrrr: ", error);
  }
}

searchBtn.addEventListener("click", () => {
  weather(inputVal.value);
});

inputVal.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) weather(inputVal.value);
});

searchBtn.style.display = "none";
searchBtn.disabled = true;

inputVal.addEventListener("input", () => {
  if (inputVal.value.trim() === "") {
    // Hide and disable search button when input is empty
    searchBtn.style.display = "none";
    searchBtn.disabled = true;
  } else {
    // Show and enable search button when input has text
    searchBtn.style.display = "block";
    searchBtn.disabled = false;
  }
});
