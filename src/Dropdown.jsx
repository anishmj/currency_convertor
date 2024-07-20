import React from 'react'

export default function Dropdown({
    currencies,
    currency,
    setCurrency,
    fav,
    handlefav,
    title=""
}) {
    

  return (
    <div>
        <label htmlFor={title}>{title}</label>
        <div>
            <select className='p-2 rounded-md focus:outline-none focus:ring focus:ring-violet-300'>
                
                {currencies?.map((currency)=>{
                   return( <option value={currency} key={currency}>
                        {currency}
                    </option>
                   )
                })}
            </select>
        </div>
    </div>
  )
}
