let apiKey = "1aa1434561b544a4a33101356242003";
let button = document.querySelector(".searchButton");
let input = document.querySelector("#searchbar");
let h1 = document.querySelector("h1");
let avgTemp = document.querySelector(".avgtemp");
let daysContainer = document.querySelector(".daysContainer");
let chartContainer = document.querySelector(".chartContainer");
const ctx = document.getElementById("chart");
let myChart = new Chart(ctx);
Chart.defaults.backgroundColor = "rgba(255,255,255,0.5)";
Chart.defaults.borderColor = "rgba(255,255,255,0.2)";
Chart.defaults.color = "#FFF";
function loadData() {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${input.value}&days=5&aqi=no&alerts=no`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      h1.textContent = data.location.name;
      avgTemp.textContent = data.forecast.forecastday[0].day.avgtemp_c;
      //CHANGING PICTURES BASED ON Weather
      if (
        data.forecast.forecastday[0].day.condition.text.includes("Cloudy") ||
        data.forecast.forecastday[0].day.condition.text.includes("cloudy")
      ) {
        document.querySelector(".mainImg").src = "assets/img/Clouds.png";
      } else if (
        data.forecast.forecastday[0].day.condition.text.includes("rain") ||
        data.forecast.forecastday[0].day.condition.text.includes("Rain")
      ) {
        document.querySelector(".mainImg").src = "assets/img/Rain.png";
      } else {
        document.querySelector(".mainImg").src = "assets/img/Sun.png";
      }
      let child = daysContainer.firstChild;
      while (child) {
        let nextSibling = child.nextSibling;
        child.remove();
        child = nextSibling;
      }
      //CHART
      myChart.destroy();
      myChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            data.forecast.forecastday[0].hour[9].time.split(" ")[1],
            data.forecast.forecastday[0].hour[10].time.split(" ")[1],
            data.forecast.forecastday[0].hour[11].time.split(" ")[1],
            data.forecast.forecastday[0].hour[12].time.split(" ")[1],
            data.forecast.forecastday[0].hour[13].time.split(" ")[1],
            data.forecast.forecastday[0].hour[14].time.split(" ")[1],
            data.forecast.forecastday[0].hour[15].time.split(" ")[1],
            data.forecast.forecastday[0].hour[16].time.split(" ")[1],
            data.forecast.forecastday[0].hour[17].time.split(" ")[1],
          ],
          datasets: [
            {
              label: "",
              data: [
                data.forecast.forecastday[0].hour[9].temp_c,
                data.forecast.forecastday[0].hour[10].temp_c,
                data.forecast.forecastday[0].hour[11].temp_c,
                data.forecast.forecastday[0].hour[12].temp_c,
                data.forecast.forecastday[0].hour[13].temp_c,
                data.forecast.forecastday[0].hour[14].temp_c,
                data.forecast.forecastday[0].hour[15].temp_c,
                data.forecast.forecastday[0].hour[16].temp_c,
                data.forecast.forecastday[0].hour[17].temp_c,
              ],
              color: "rgba(255,255,255,1)",
              backgroundColor: "rgba(255,255,255,1)",
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });

      data.forecast.forecastday.forEach((elem) => {
        let img = document.createElement("img");
        img.classList.add("iconSmall");
        if (elem.day.condition.text.toLowerCase().includes("cloud")) {
          img.src = "assets/img/Clouds.png";
        } else if (elem.day.condition.text.toLowerCase().includes("rain")) {
          img.src = "assets/img/Rain.png";
        } else {
          img.src = "assets/img/Sun.png";
        }
        let div = document.createElement("div");
        div.classList.add("dayContainer");
        let title = document.createElement("h3");
        title.textContent = `${elem.date.split("-")[2]}/${
          elem.date.split("-")[1]
        }`;
        div.appendChild(img);
        div.appendChild(title);
        let mintemp = document.createElement("p");
        mintemp.textContent = `Min:${elem.day.mintemp_c}°C`;
        let maxTemp = document.createElement("p");
        maxTemp.textContent = `Max:${elem.day.maxtemp_c}°C`;

        div.appendChild(mintemp);
        div.appendChild(maxTemp);
        daysContainer.appendChild(div);
      });
    });
}
button.addEventListener("click", () => {
  loadData();
});

//CHART
const node = document.querySelector("#searchbar");
node.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    loadData();
  }
});
