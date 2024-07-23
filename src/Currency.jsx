import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import Dropdown from "./Dropdown";

export const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);

  const [fromCurrency, setfromCurrency] = useState("USD");
  const [toCurrency, settoCurrency] = useState("INR");
  const [converted, setConverted] = useState(null);
  const [converting, setConverting] = useState(false);

  async function fetchCurrency() {
    try {
      const response = await axios.get("https://api.frankfurter.app/currencies");
      console.log(response.data)
      setCurrencies(Object.keys(response.data));
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCurrency();
  }, []);

  function swap() {
    const temp = fromCurrency;
    setfromCurrency(toCurrency);
    settoCurrency(temp);
  }

  async function convertCurrency() {
    if (!amount) return;
    setConverting(true);

    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      setConverted(response.data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error(error);
    } finally {
      setConverting(false);
    }
  }

  return (
    <div className="flex justify-center pt-12">
      <div className="h-auto w-full md:w-9/12 bg-amber-200 rounded-lg shadow-lg p-4 md:p-8">
        <div>
          <h1 className="font-bold text-2xl mb-4 text-center md:text-left">Currency Converter</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <Dropdown
              currencies={currencies}
              title="From"
              currency={fromCurrency}
              setCurrency={setfromCurrency}
            />
            <button
              onClick={swap}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg flex justify-center items-center px-4 py-2 my-4 md:my-0 mx-0 md:mx-4 focus:border-rose-600 cursor-pointer"
            >
              Swap
            </button>
            <Dropdown
              currencies={currencies}
              title="To"
              currency={toCurrency}
              setCurrency={settoCurrency}
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <label htmlFor="amount" className="mr-2">Amount:</label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
              id="amount"
              className="p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            onClick={convertCurrency}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-4 py-2 mt-4 md:mt-0 focus:border-rose-600 cursor-pointer"
          >
            Convert
          </button>
        </div>
        {converted && (
          <div className="mt-4 text-lg font-medium text-center md:text-right text-black">
            Converted Amount: {converted}
          </div>
        )}
      </div>
    </div>
  );
};
