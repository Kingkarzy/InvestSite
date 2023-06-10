import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PriceCard from './PricingCard';

function Trade() {
  // FUNCTION TO RETRIEVE TIME TILL PLAN COMPLETION
  /* const cb = (futureDate) => {
    const currentDate = new Date();
    const timeDifference = futureDate - currentDate.getTime();
    const daysDifference = Math.ceil(
      timeDifference / (1000 * 60 * 60 * 24)
    );
    if (daysDifference == 0) {
      return 0;
    }
    return daysDifference;
  }; */

  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/dashboard/${user._id}/plans`,
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
    <div className='flex flex-col gap-10 lg:px-10 h-[80vh] overflow-y-scroll'>
      <div className='black-gradient flex flex-col p-4 items-start'>
        <h1 className='h1'>Current Plans</h1>
      </div>
      {result.map((item) => (
        <div key={item._id}>
          <h1>{item.planType}</h1>
          <h1>{item.amount}</h1>
          <h2>{item.duration} days</h2>
        </div>
      ))}

      <div className='black-gradient flex flex-col p-4 items-end'>
        <h1 className='h1'>Investment Plans</h1>
      </div>
      <div className='items-center justify-center'>
        <p className='mb-10 px-5 font-light text-center text-white'>
          No matter the size of your pocket, there is always a Plan
          for you. Explore our investment plans today!
        </p>
        <div className='w-[90%] grid grid-cols-1 sm:w-full md:grid-cols-2 lg:grid-cols-3 justify-between gap-5 mx-0 md:mx-auto'>
          <PriceCard
            heading={'Bronze'}
            price={1000}
            percent={25}
            duration={5}
            refer='2% referral bonus'
            content={`Capital accessible after investment elapses.`}
            // bgColor='#4182AB'
            width='18rem'
            height={400}
          />
          <PriceCard
            heading={'Silver'}
            price={5000}
            percent={35}
            duration={7}
            refer='2% referral bonus'
            content={`Capital accessible after investment elapses.`}
            // bgColor='#4182AB'
            width='18rem'
            height={400}
          />
          <PriceCard
            heading={'Gold'}
            price={10000}
            percent={40}
            duration={10}
            refer='5% referral bonus'
            content={`Capital accessible after investment elapses.`}
            // bgColor='#4182AB'
            width='18rem'
            height={400}
          />
          <PriceCard
            heading={'Diamond'}
            price={25000}
            percent={50}
            duration={14}
            refer='5% referral bonus'
            content={`Capital accessible after investment elapses.`}
            // bgColor='#4182AB'
            width='18rem'
            height={400}
          />
          <PriceCard
            heading={'Emerald'}
            price={50000}
            percent={55}
            duration={20}
            refer='8% referral bonus'
            content={`Capital accessible after investment elapses.`}
            // bgColor='#4182AB'
            width='18rem'
            height={400}
          />
          <PriceCard
            heading={'Ruby'}
            price={100000}
            percent={75}
            duration={25}
            refer='8% referral bonus'
            content={`Capital accessible after investment elapses.`}
            // bgColor='#4182AB'
            width='18rem'
            height={400}
          />
        </div>
      </div>
    </div>
  );
}

export default Trade;
