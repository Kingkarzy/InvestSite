/* eslint-disable no-unused-vars */
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
  const user = useSelector((state) => state.user);
  // const [amount, setAmount] = useState(0);

  const [count, setCount] = useState(0);
  // const handleChange = (e) => {
  //   setAmount(e.target.value);
  // };

  const [days, setDays] = useState(0);
  const cb = (duration) => {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getTime() + duration * 24 * 60 * 60 * 1000
    );
    const timeDifference = futureDate - currentDate.getTime();
    const daysDifference = Math.ceil(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    setDays(daysDifference);
    console.log(daysDifference);
  };
  if (count === 0) {
    // cb(duration);

    setCount(1);
  }
  const handlesubmit = (e) => {
    e.preventDefault();
    cb(duration);

    if (price > user.balance) {
      return alert('Current Balance Not Enough For This Plan');
    }
    const data = JSON.stringify({
      userId: user._id,
      planType: heading,
      amount: price,
      duration: days,
      gain: percent,
    });

    console.log(data);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3001/api/dashboard/plan',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      data: data,
    };

    axios
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
      {/* <input
        type='number'
        min={price}
        max='4999'
        name='iamount'
        placeholder={price}
        className='block w-9/12 h-9 py-1 px-3 text-sm text-gray-600 bg-white border border-solid border-gray-300'
        onChange={handleChange}
      /> */}
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
