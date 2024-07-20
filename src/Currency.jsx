import React, { useEffect, useState } from "react";
import "./index.css";
import axios from "axios";
import Dropdown from "./Dropdown";
export const Currency = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);

  const [fromCurrency,setfromCurrency] = useState("USD");
  const [toCurrency,settoCurrency] = useState("INR");
  
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
  console.log(currencies)
  //currencies - >https://api.frankfurter.app/currencies
  //currencies - >https://api.frankfurter.app/latest?amount=1&from=USD$to=INR
  //h-80 w-80 border-solid border-8
  return (
    <div className="flex justify-center pt-12">
      <div className="h-96 w-9/12 bg-amber-200 rounded-lg shadow-lg">
        <div>
          <h1 className="font-bold text-2xl">Currency Converter</h1>
          <div>
          <Dropdown currencies={currencies} title = "From"/>
              {/* swap Currency */} 
          <Dropdown currencies={currencies} title="To"/>
        </div>
        </div>
       
        <div className="flex justify-start pl-4 pt-32 rounded-lg">
          <div>
            <label htmlFor="amount">Amount : </label>
            <input type="number" />
          </div>
          <div>
            <div>
                <button>
              <label htmlFor="convert">Convert : </label>
              <input type="number" />
              </button>
            </div>
          </div>
        </div>
        <div className="mb-4 text-lg font-medium text-right text-green">
          Converted Amount : 69$
        </div>
      </div>
    </div>
  );
};
