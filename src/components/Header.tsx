import { useState, useEffect, useCallback } from "react";

import ExchangeForm from "./ExchangeForm";
import API from "../services/api";

interface ExchangeRate {
  currencyCodeA: number;
  rateBuy: number;
  rateSell: number;
  rateCross: number;
}
const Header = () => {
  const [currencyData, setCurrencyData] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAndSetData = useCallback(async () => {
    try {
      const data = await API.getExchangeRate();

      const dataSliced = data.slice(0, 2);

      setCurrencyData(dataSliced);
      localStorage.setItem("currency", JSON.stringify(dataSliced));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAndSetData();
    const intervalId = setInterval(fetchAndSetData, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [fetchAndSetData]);

  const currentTime = new Date();

  return (
    <header className="bg-[#585858] h-32">
      <div className=" p-2">
        <div className="text-[#f5deb3]">
          Курс валют в Україні на: {currentTime.toLocaleString()}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="">
            <ExchangeForm currencyData={currencyData} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
