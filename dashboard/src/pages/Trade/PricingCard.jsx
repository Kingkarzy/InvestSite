import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;
const refresh = () => window.location.reload(true);

/* eslint-disable react/prop-types */
const PriceCard = ({
  heading,
  price,
  range,
  percent,
  duration,
  refer,
  content,
  width,
  height,
  setLoad,
}) => {
  // IMPORT USER STATE
  const user = useSelector((state) => state.user);
  const userId = user._id;

  // SET STATES
  const [amount, setAmount] = useState(0);

  // SET MAX & MIN VALUES
  const max =
    heading == 'Silver'
      ? 1000
      : heading == 'Gold'
      ? 4999
      : heading == 'Diamond'
      ? 50000
      : 999999;

  const min =
    heading === 'Silver' ? 100 : heading === 'Gold' ? 1001 : 5000;

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const inputValue = parseInt(e.target.value);
    if (inputValue > max) {
      // alert('Amount Exceeds The Approved Limit');
      // setAmount(max);
      setAmount(inputValue);
    } else if (inputValue < min) {
      // alert('Amount Is Below The Approved Limit');
      // setAmount(price);
      setAmount(inputValue);
    } else {
      setAmount(inputValue);
    }
  };

  // HANDLE FORM SUBMISSION
  const handlesubmit = async (e) => {
    setLoad(true);
    e.preventDefault();
    let balance = 0;
    try {
      const response = await axios.get(
        `${baseUrl}/api/admin/users/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      balance = response.data.balance;
    } catch (error) {
      console.log(error);
    }

    if (amount === 0) {
      alert('Amount is required.');
      setLoad(false);
      return;
    } else if (amount > max) {
      alert('Amount Exceeds The Approved Limit');
      setLoad(false);
      return;
    } else if (amount < min) {
      alert('Amount Is Below The Approved Limit');
      setLoad(false);
      return;
    }

    if (amount > balance) {
      setLoad(false);
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
      url: `${baseUrl}/api/plan`,
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
        setLoad(false);
        refresh();
      })
      .catch((error) => {
        console.log(error);
        setLoad(false);
        alert('An error occured...');
        refresh();
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
      <div className='flex gap-2 '>
        <h1 className='text-5xl lg:text-5xl font-bold text-center text-dark mb-5'>
          ${price}
        </h1>
        <span className='font-semibold text-black text-base mt-5'>
          {range}
        </span>
      </div>

      <p className='mb-3'>{percent}% daily</p>
      <p className='mb-3'>Duration: {duration} days</p>
      <p className='mb-3'>{refer}</p>
      <p className='text-sm mb-5 font-light text-center text-dark'>
        {content}
      </p>
      <input
        type='number'
        required
        min={
          heading === 'Silver'
            ? 100
            : heading === 'Gold'
            ? 1001
            : 5000
        }
        max={`${
          heading == 'Silver'
            ? 1000
            : heading == 'Gold'
            ? 4999
            : heading == 'Diamond'
            ? 999999
            : 'Not Valid'
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
