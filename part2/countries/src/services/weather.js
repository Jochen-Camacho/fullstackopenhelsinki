const api_key = import.meta.env.VITE_SOME_KEY;
import axios from "axios";

const getWeather = (capital) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`;

  return axios.get(url);
};

const getIcon = (icon) => {
  return `http://openweathermap.org/img/w/${icon}.png`;
};

export default { getWeather, getIcon };
