const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const icon = document.querySelector(".weather img");

const initialName = document.querySelector(".city ");
const temprature = document.querySelector(".temp ");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

const invalidMsg = document.querySelector(".error");

async function weather(city) {
  const api = `https://wttr.in/${city}?format=j1`;

  try {
    const fetchedData = await fetch(api);
    if (fetchedData.status == 404) {
      invalidMsg.style.display = "block";
      temprature.innerHTML = "_°c";
      humidity.innerHTML = "_%";
      wind.innerHTML = "- Kmph";
      icon.src = "images/confused.png";
      initialName.innerHTML = " ";
    } else {
      const data = await fetchedData.json();

      console.log(data);
      document.querySelector(".city").innerHTML =
        data.nearest_area[0].areaName[0].value;
      document.querySelector(".temp").innerHTML =
        Math.round(data.current_condition[0].temp_C) + "°c";
      document.querySelector(".humidity").innerHTML =
        data.current_condition[0].humidity + "%";
      document.querySelector(".wind").innerHTML =
        data.current_condition[0].windspeedKmph + " kmph";
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
    }
  } catch (error) {
    console.error("error in fetching", error);
  }
}

searchBtn.addEventListener("click", () => {
  weather(searchBox.value);
});

//for searching on enter key
searchBox.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) weather(searchBox.value);
});

//after loading
window.addEventListener("load", () => {
  weather(initialName.innerHTML.toLowerCase());
});
