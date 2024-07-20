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
      const response = await axios.get(
        "https://api.frankfurter.app/currencies"
      );
      // const data = await response.json();
      setCurrencies(Object.keys(response.data));
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    fetchCurrency();
  }, []);
  console.log(currencies);
  async function convertCurrency() {
    if (!amount) return;
    setConverting(true);

    try {
      const response = await axios.get(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await(response.json)

      setConverted(response.data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error(error);
    } finally {
      setConverting(false);
    }
  }

  //currencies - >https://api.frankfurter.app/currencies
  //currencies - >https://api.frankfurter.app/latest?amount=1&from=USD$to=INR
  //h-80 w-80 border-solid border-8
  return (
    <div className="flex justify-center pt-12">
      <div className="h-96 w-9/12 bg-amber-200 rounded-lg shadow-lg">
        <div>
          <h1 className="font-bold text-2xl">Currency Converter</h1>
          <div>
            <Dropdown
              currencies={currencies}
              title="From"
              currency={fromCurrency}
              setCurrency={setfromCurrency}
            />
            {/* swap Currency */}
            <Dropdown
              currencies={currencies}
              title="To"
              currency={toCurrency}
              setCurrency={settoCurrency}
            />
          </div>
        </div>

        <div className="flex justify-start pl-4 pt-32 rounded-lg">
          <div>
            <label htmlFor="amount">Amount : </label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="number"
            />
          </div>
          <div>
            <div>
              <button
                onClick={convertCurrency}
                className={converting ? "animate-pulse" : ""}
              >
                Convert :
              </button>
            </div>
          </div>
        </div>
        {converted && (
          <div className="mb-4 text-lg font-medium text-right text-green">
            Converted Amount : {converted}
          </div>
        )}
      </div>
    </div>
  );
};
