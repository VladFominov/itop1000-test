type ExchangeRates = {
  currencyCodeA: number;
  rateBuy: number;
  rateSell: number;
  rateCross: number;
};
type Props = {
  currencyData: ExchangeRates[];
};

const ExchangeForm = ({ currencyData }: Props) => {
  const currencyName: { [key: number]: string } = {
    840: "USD",
    978: "EUR",
  };

  return (
    <div>
      <table className="m-auto ">
        <thead className="h-8  border-b border-solid ">
          <tr className=" p-4 border-solid border-1 border-transparent">
            <td className="h-2 w-20 text-center  text-xl text-white ">
              Валюта
            </td>
            <td className="h-2 w-20 text-center  text-xl text-white">
              Купівля
            </td>
            <td className="h-2 w-20 text-center  text-xl text-white">Продаж</td>
          </tr>
        </thead>
        <tbody>
          {currencyData.map(
            ({ currencyCodeA, rateBuy, rateSell, rateCross }) => {
              return (
                <tr key={currencyCodeA}>
                  <th className="">
                    <span className="text-[#00FF33]">
                      {currencyName[currencyCodeA]}
                    </span>
                  </th>
                  <td className="h-2 w-20 text-center ">
                    <span className="text-[#FFD700]">
                      {rateBuy ? rateBuy.toFixed(2) : "-"}
                    </span>
                  </td>
                  <td className="h-2 w-20 text-center">
                    <span className="text-[#FFD700]">
                      {rateSell ? rateSell.toFixed(2) : rateCross.toFixed(2)}
                    </span>
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExchangeForm;
