import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import PriceCard from './PricingCard';
import { plans } from '../../utils/data';
import Load from '../../components/Load';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Trade() {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user._id, user.token]);

  return (
    <div className='flex flex-col gap-10 lg:px-10 h-[82vh] overflow-y-scroll'>
      <div className='background-indigo-gradient flex flex-col p-4 items-start'>
        <h1 className='h1'>Current Plans</h1>
      </div>
      <div className='flex flex-wrap gap-5 w-full justify-between items-center'>
        {isLoading ? (
          <Load />
        ) : (
          result.map((item, index) => (
            <div
              key={index}
              className={`flex flex-1 flex-col min-w-fit max-w-fit p-2 md:p-4 justify-start items-center rounded-t-xl rounded-br-xl shadow-3xl ${
                item.planType === 'Bronze'
                  ? 'bg-[#CD7F32]'
                  : item.planType === 'Silver'
                  ? 'bg-[#C0C0C0]'
                  : item.planType === 'Gold'
                  ? 'bg-[#FFD700]'
                  : item.planType === 'Emerald'
                  ? 'bg-[#50C878]'
                  : item.planType === 'Ruby'
                  ? // ? 'bg-[#9b111e]'
                    'bg-[#E0115F]'
                  : item.planType === 'Diamond'
                  ? 'bg-[#b9f2ff]'
                  : 'bg-white'
              }`}
            >
              <h1 className='text-base'>
                <strong>Plan:&nbsp;</strong>
                {item.planType}
              </h1>
              <h1 className='text-base'>
                <strong>Amount:&nbsp;</strong>
                {item.amount}
              </h1>
              <h2 className='text-base'>
                <strong>Days Left:&nbsp;</strong>
                {item.duration} days
              </h2>
              <h2 className='text-base'>
                <strong>Status:&nbsp;</strong>
                {item.duration > 0 ? 'Ongoing' : 'Completed'}
              </h2>
              <h1 className='mt-2 text-sm font-medium italic'>
                #{index + 1}
              </h1>
            </div>
          ))
        )}
      </div>

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
              range={item.range}
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
