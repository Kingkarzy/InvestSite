import { WaterfallChart } from '@mui/icons-material';

const Divider = () => {
  return (
    <div className='flex gap-3 my-10 justify-center items-center'>
      <div className='flex w-9/12 gap-3 items-center'>
        <div className='flex-grow h-[0.025rem] bg-gray-300'></div>
        <div className='p-1 bg-yellow-450 rounded-full'>
          <WaterfallChart
            sx={{
              fontSize: '2.5rem',
              borderRadius: '50px',
              backgroundColor: '#4182AB',
              color: 'white',
              padding: '0.5rem',
            }}
          />
        </div>
        <div className='flex-grow h-[0.025rem] bg-gray-300'></div>
      </div>
    </div>
  );
};

export default Divider;
