import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
const baseUrl = import.meta.env.VITE_BASE_URL;

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
}) => {
  // IMPORT USER STATE
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
        setResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user.token, userId]);

  // SET STATES
  const [amount, setAmount] = useState(0);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const inputValue = parseInt(e.target.value);
    const max =
      heading == 'Silver'
        ? 1000
        : heading == 'Gold'
        ? 4999
        : heading == 'Diamond'
        ? 50000
        : 999999;
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
    if (price > result.balance) {
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
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div
      className="text-black flex flex-col justify-center items-center border-solid bg-white shadow-xl p-5 mx-auto  transition-all rounded-xl"
      style={{
        width: width,
        height: height,
      }}
    >
      <span className="flex font-semibold scale-[2] mb-5 text-dark dark:text-black">
        {heading}
      </span>
      <div className="flex gap-2 ">
        <h1 className="text-5xl lg:text-5xl font-bold text-center text-dark mb-5">
          ${price}
        </h1>
        <span className="font-semibold text-black text-base mt-5">{range}</span>
      </div>

      <p className="mb-3">{percent}% daily</p>
      <p className="mb-3">Duration: {duration} days</p>
      <p className="mb-3">{refer}</p>
      <p className="text-sm mb-5 font-light text-center text-dark">{content}</p>
      <input
        type="number"
        required
        min={price}
        max={`${
          heading == "Silver"
            ? 1000
            : heading == "Gold"
            ? 4999
            : heading == "Diamond"
            ? 999999
            : "Not Valid"
        }`}
        name="amount"
        placeholder={price}
        className="block w-9/12 h-9 py-1 px-3 text-sm text-gray-600 bg-white border border-solid border-gray-300"
        onChange={handleChange}
      />
      <button
        onClick={handlesubmit}
        className="bg-indigo-600 mt-6 px-0 py-1 rounded-md w-5/12 text-white hover:scale-110"
      >
        Join Plan
      </button>
    </div>
  );
};

export default PriceCard;
