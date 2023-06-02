import { CryptoCurrencyMarket } from 'react-ts-tradingview-widgets';
import { Timeline } from 'react-ts-tradingview-widgets';
import Card from './Card';
import { Lock } from '@mui/icons-material';

const Dashboard = () => {
  return (
    <div className='items-center'>
      <h1 className='mb-10 text-4xl text-center font-semibold text-black'>
        Dashboard
      </h1>
      <div className='flex flex-wrap gap-3 justify-center items-center'>
        <Card
          logo={
            <Lock className='p-1 rounded-full bg-white text-black' />
          }
          heading={'DEPOSITED'}
          value={'$0.00'}
        />
        <Card
          logo={
            <Lock className='p-1 rounded-full bg-white text-black' />
          }
          heading={'PROFIT'}
          value={'$0.00'}
        />
        <Card
          logo={
            <Lock className='p-1 rounded-full bg-white text-black' />
          }
          heading={'BONUS'}
          value={'$0.00'}
        />
        <Card
          logo={
            <Lock className='p-1 rounded-full bg-white text-black' />
          }
          heading={'BALANCE'}
          value={'$0.00'}
        />
        <Card
          logo={
            <Lock className='p-1 rounded-full bg-white text-black' />
          }
          heading={'PACKAGE'}
          value={'$0.00'}
        />
        <Card
          logo={
            <Lock className='p-1 rounded-full bg-white text-black' />
          }
          heading={'WITHDRAWN'}
          value={'$0.00'}
        />
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
