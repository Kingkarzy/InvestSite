import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PriceCard from './PricingCard';
import { plans } from '../../utils/data';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Trade() {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/plan/${user._id}`,
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
  }, [user._id, user.token]);

  return (
    <div className='flex flex-col gap-10 lg:px-10 h-[82vh] overflow-y-scroll'>
      <div className='background-indigo-gradient flex flex-col p-4 items-start'>
        <h1 className='h1'>Current Plans</h1>
      </div>
      {result.map((item) => (
        <div key={item._id}>
          <h1>{item.planType}</h1>
          <h1>{item.amount}</h1>
          <h2>{item.duration} days</h2>
        </div>
      ))}

      <div className='background-gradient flex flex-col p-4 items-end'>
        <h1 className='h1'>Investment Plans</h1>
      </div>
      <div className='items-center justify-center'>
        <p className='mb-10 px-5 font-light text-sm text-center text-black'>
          No matter the size of your pocket, there is always a Plan
          for you. Explore our investment plans today!
        </p>
        <div className='w-[90%] grid grid-cols-1 sm:w-full md:grid-cols-2 lg:grid-cols-3 justify-between gap-5 mx-0 md:mx-auto mb-3'>
          {plans.map((item) => (
            <PriceCard
              key={item.id}
              heading={item.heading}
              price={item.price}
              percent={item.percent}
              duration={item.duration}
              refer='2% referral bonus'
              content={`Capital accessible after investment elapses.`}
              // bgColor='#4182AB'
              width='18rem'
              height={400}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Trade;
