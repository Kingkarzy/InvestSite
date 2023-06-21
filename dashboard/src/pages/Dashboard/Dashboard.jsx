import { CryptoCurrencyMarket } from 'react-ts-tradingview-widgets';
import { Timeline } from 'react-ts-tradingview-widgets';
import Card from './Card';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';

import depositImg from '../../assets/images/deposit.png';
import withdrawImg from '../../assets/images/withdrawal.png';
import profitImg from '../../assets/images/profit.png';
import planImg from '../../assets/images/planning.png';
import bonusImg from '../../assets/images/gift.png';
import balanceImg from '../../assets/images/money.png';

import Donut from '../../utils/donut';
import LineChart from '../../utils/lineChart';

const baseUrl = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
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
  return (
    <div className='items-center overflow-y-scroll h-[80vh]'>
      <h1 className='mb-10 text-4xl text-center font-semibold blue-text-gradient '>
        Dashboard
      </h1>
      <div className='flex flex-wrap gap-3 justify-center items-center'>
        <Card
          logo={
            <img
              src={depositImg}
              alt='deposit'
              className='w-12'
            />
          }
          heading={'DEPOSITS'}
          value={`$${result.deposited > 0 ? result.deposited : 0}`}
        />
        <Card
          logo={
            <img
              src={profitImg}
              alt='profit'
              className='w-12'
            />
          }
          heading={'PROFIT'}
          value={`$${result.profit > 0 ? result.profit : 0}`}
        />
        <Card
          logo={
            <img
              src={bonusImg}
              alt='bonus'
              className='w-12'
            />
          }
          heading={'BONUS'}
          value={'$0.00'}
        />
        <Card
          logo={
            <img
              src={balanceImg}
              alt='balance'
              className='w-12'
            />
          }
          heading={'BALANCE'}
          value={`$${result.balance > 0 ? result.balance : 0}`}
        />
        <Card
          logo={
            <img
              src={planImg}
              alt='plan'
              className='w-12'
            />
          }
          heading={'PLAN'}
          value={result.plan}
        />
        <Card
          logo={
            <img
              src={withdrawImg}
              alt='withdraw'
              className='w-12'
            />
          }
          heading={'WITHDRAWN'}
          value={`$${result.withdrawn > 0 ? result.withdrawn : 0}`}
        />
      </div>
      <div className='w-[80%] bg-white gap-5 justify-evenly flex flex-wrap mx-auto my-5 p-5'>
        <Donut />
        <div>
          <LineChart />
        </div>
      </div>
      <div className='container p-10 lg:w-[90%] flex items-center mx-auto flex-col sm:p-3 gap-2'>
        <div className='w-11/12 mx-auto '>
          <Timeline
            colorTheme='dark'
            feedMode='market'
            market='crypto'
            height={400}
            width='100%'
          ></Timeline>
        </div>
        <div className='w-11/12 mx-auto '>
          <CryptoCurrencyMarket
            className=''
            colorTheme='dark'
            width='100%'
            height={400}
          ></CryptoCurrencyMarket>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
