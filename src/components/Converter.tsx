import { useState, ChangeEvent, useEffect } from "react";
type ExchangeRates = {
  currencyCodeA: number;
  rateBuy: number;
  rateSell: number;
  rateCross: number;
};

type Props = {
  currencyData: ExchangeRates[];
};
const Converter = ({ currencyData }: Props) => {
  const [amount, setAmount] = useState<number | null>(null);
  const [currencyFrom, setCurrencyFrom] = useState<number>(980);
  const [currencyTo, setCurrencyTo] = useState<number>(840);
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);

  const currencyName: { [key: number]: string } = {
    980: "UAH",
    840: "USD",
    978: "EUR",
  };

  useEffect(() => {
    if (amount !== null && currencyData) {
      const rateFrom =
        currencyData.find((rate) => rate.currencyCodeA === currencyFrom)
          ?.rateBuy || 1;
      const rateTo =
        currencyData.find((rate) => rate.currencyCodeA === currencyTo)
          ?.rateSell || 1;

      const convertedValue = (amount * rateFrom) / rateTo;

      setConvertedAmount(convertedValue);
    }
  }, [amount, currencyData, currencyFrom, currencyTo]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newAmount = +e.target.value;
    setAmount(newAmount);
  };

  const handleCurrencyFromChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCurrencyFrom = +e.target.value;
    setCurrencyFrom(newCurrencyFrom);
  };

  const handleCurrencyToChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCurrencyTo = +e.target.value;
    setCurrencyTo(newCurrencyTo);
  };

  return (
    <div className="mt-4">
      <h1 className="mb-4 text-2xl">Конвертер валют:</h1>
      <div className="flex gap-4">
        <div>
          <label htmlFor="amount">
            <span className="mr-4 text-xl">В мене є:</span>
          </label>
          <input
            className="rounded mr-2 p-0.5"
            type="tel"
            id="amount"
            value={amount !== null ? amount : ""}
            onChange={handleAmountChange}
          />
          <select
            className="cursor-pointer bg-inherit"
            id="currencyFrom"
            value={currencyFrom}
            onChange={handleCurrencyFromChange}
          >
            {Object.entries(currencyName).map(([code, name]) => (
              <option key={code} value={Number(code)}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="convertedAmount">
            <span className="mr-4 text-xl">Я отримаю:</span>
          </label>
          <input
            className="rounded mr-2 p-0.5"
            type="text"
            id="convertedAmount"
            value={convertedAmount !== null ? convertedAmount.toFixed(2) : ""}
            readOnly
          />
          <select
            className="cursor-pointer bg-inherit	"
            id="currencyTo"
            value={currencyTo}
            onChange={handleCurrencyToChange}
          >
            {Object.entries(currencyName).map(([code, name]) => (
              <option key={code} value={Number(code)}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Converter;
