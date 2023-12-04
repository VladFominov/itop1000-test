import axios from "axios";

const getExchangeRate = async () => {
  const { data } = await axios.get("https://api.monobank.ua/bank/currency");

  return data;
};

const API = {
  getExchangeRate,
};

export default API;
