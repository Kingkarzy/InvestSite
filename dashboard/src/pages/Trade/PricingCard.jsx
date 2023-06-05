/* eslint-disable no-unused-vars */
import { useState } from 'react';

/* eslint-disable react/prop-types */
const PriceCard = ({
  heading,
  price,
  percent,
  duration,
  refer,
  content,
  width,
  height,
}) => {
  const [amount, setAmount] = useState(0);
  const handleChange = (e) => {
    setAmount(e.target.value);
  };
  const handlesubmit = () => {};
  return (
    <div
      className='text-black flex flex-col justify-center items-center border-solid bg-white shadow-xl p-5 mx-auto  transition-all rounded-xl'
      style={{
        width: width,
        height: height,
      }}
    >
      <span className='flex font-semibold scale-[2] mb-5 text-dark dark:text-black'>
        {heading}
      </span>
      <h1 className='text-5xl lg:text-5xl font-bold text-center text-dark mb-5'>
        {price}
      </h1>
      <p className='mb-3'>{percent}</p>
      <p className='mb-3'>{duration}</p>
      <p className='mb-3'>{refer}</p>
      <p className='text-sm mb-5 font-light text-center text-dark'>
        {content}
      </p>
      <input
        type='number'
        min={price}
        max='4999'
        name='iamount'
        placeholder={price}
        className='block w-9/12 h-9 py-1 px-3 text-sm text-gray-600 bg-white border border-solid border-gray-300'
        onChange={handleChange}
      />
      <button
        onClick={handlesubmit}
        className='bg-indigo-600 mt-6 px-0 py-1 rounded-md w-5/12 text-white hover:scale-110'
      >
        Join Plan
      </button>
    </div>
  );
};

export default PriceCard;
