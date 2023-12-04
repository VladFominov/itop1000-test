import { useState, useEffect } from "react";

import Converter from "./Converter";

interface ExchangeRate {
  currencyCodeA: number;
  rateBuy: number;
  rateSell: number;
  rateCross: number;
}

const Main = () => {
  const [currencyData, setCurrencyData] = useState<ExchangeRate[]>([]);

  useEffect(() => {
    const cachedData = localStorage.getItem("currency");

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const dataSliced = parsedData.slice(0, 2);
      setCurrencyData(dataSliced);
    } else {
      alert("No data, pls, reload the page");
    }
  }, []);

  return (
    <main className=" p-2">
      <Converter currencyData={currencyData} />
    </main>
  );
};

export default Main;
