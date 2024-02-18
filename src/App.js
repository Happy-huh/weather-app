import { useState } from "react";
import "./App.css";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherResponse });
        setForecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);
  console.log(forecast);

  return (
    <div className="container">
      {currentWeather ? (
        currentWeather.main.temp <= 3 ? (
          <img
            alt="weather"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "140vh",
              zIndex: -1,
            }}
            src={"snowy_background.jpg"}
          />
        ) : currentWeather.main.temp < 10 ? (
          <img
            alt="weather"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "140vh",
              zIndex: -1,
            }}
            src={"Autumn.jpg"}
          />
        ) : currentWeather.main.temp < 30 ? (
          <img
            alt="weather"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "140vh",
              zIndex: -1,
            }}
            src={"spring.jpg"}
          />
        ) : (
          <img
            alt="weather"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100vw",
              height: "140vh",
              zIndex: -1,
            }}
            src={"summ.jpg"}
          />
        )
      ) : (
        <img
          alt="weather"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "140vh",
            zIndex: -1,
          }}
          src={"back.jpeg"}
        />
      )}

      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
