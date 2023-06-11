import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

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
  // IMPORT USER STATE
  const user = useSelector((state) => state.user);

  // SET STATES
  const [amount, setAmount] = useState(0);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const inputValue = parseInt(e.target.value);
    const max =
      heading === 'Bronze'
        ? 4999
        : heading === 'Silver'
        ? 9999
        : heading === 'Gold'
        ? 24999
        : heading === 'Diamond'
        ? 49999
        : 99999;
    if (inputValue > max) {
      setAmount(max);
    } else if (inputValue < price) {
      setAmount(price);
    } else {
      setAmount(inputValue);
    }
  };

  // HANDLE FORM SUBMISSION
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (amount == 0) {
      alert('Amount is required.');
      return;
    }
    if (price > user.balance) {
      return alert('Current Balance Not Enough For This Plan');
    }
    const data = JSON.stringify({
      userId: user._id,
      planType: heading,
      amount: amount,
      duration: duration,
      gain: percent,
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/api/plan',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      data: data,
    };

    await axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        alert(`Welcome to the ${heading} Plan`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        ${price}
      </h1>
      <p className='mb-3'>{percent}% daily</p>
      <p className='mb-3'>Duration: {duration} days</p>
      <p className='mb-3'>{refer}</p>
      <p className='text-sm mb-5 font-light text-center text-dark'>
        {content}
      </p>
      <input
        type='number'
        required
        min={price}
        max={`${
          heading == 'Bronze'
            ? 4999
            : heading == 'Silver'
            ? 9999
            : heading == 'Gold'
            ? 24999
            : heading == 'Diamond'
            ? 49999
            : 99999
        }`}
        name='amount'
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
