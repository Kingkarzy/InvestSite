import {
  ArrowLeftOutlined,
  ArrowOutwardOutlined,
  ArrowRightOutlined,
  GitHub,
} from '@mui/icons-material';
import { useState } from 'react';
import { portfolio } from '../data';

const Carousel = () => {
  const [slideIndex, setSlideIndex] = useState(
    Math.floor(portfolio.length / 2)
  );

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(
        slideIndex > 0 ? slideIndex - 1 : portfolio.length - 1
      );
    } else {
      setSlideIndex(
        slideIndex < portfolio.length - 1 ? slideIndex + 1 : 0
      );
    }
  };

  return (
    <div className='relative overflow-hidden w-full h-full lg:h-full'>
      <div
        className='flex transform'
        style={{
          transform: `translateX(${slideIndex * -100}vw)`,
          transition: 'all 2.25s ease',
        }}
      >
        {portfolio.map((item) => (
          <div
            key={item.id}
            className={`flex-shrink-0 w-full h-90vh`}
          >
            <div className='flex flex-1 justify-center items-center'>
              <div className='flex-1 justify-center flex items-center '>
                <div className='p-10 lg:p-10 flex items-center justify-center flex-col w-full md:w-11/12 lg:w-7/12'>
                  <img
                    src={item.image}
                    className=' w-full h-full'
                  />
                  <div className='w-full h-full p-4 flex flex-col md:flex-row  md:gap-4 items-center justify-between  bg-stone-100 dark:bg-gray-800 shadow-3xl'>
                    <div>
                      <h1 className='text-xl font-bold'>
                        {item.title}
                      </h1>
                      <p className='text-sm font-light'>
                        {item.desc}
                      </p>
                    </div>
                    <div className='flex justify-center items-center gap-2'>
                      <a
                        href={item.github}
                        target='blank'
                        className='flex items-center justify-center px-3 bg-white dark:bg-purple-950 rounded-full h-10 w-10 py-3 text-xl bg-transparent border border-black cursor-pointer'
                      >
                        <GitHub />
                      </a>
                      <a
                        href={item.demo}
                        target='blank'
                        className='flex items-center justify-center px-3 bg-white dark:bg-purple-950 rounded-full h-10 w-10 py-3 text-xl bg-transparent border border-black cursor-pointer'
                      >
                        <ArrowOutwardOutlined />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className='absolute top-0 bottom-0 left-0 md:left-2 flex items-center cursor-pointer opacity-90 z-2'
        onClick={() => handleClick('left')}
      >
        <ArrowLeftOutlined
          style={{ fontSize: '50px', color: '#242424' }}
        />
      </div>
      <div
        className='absolute top-0 bottom-0 right-0 md:right-2 flex items-center cursor-pointer opacity-90 z-2'
        onClick={() => handleClick('right')}
      >
        <ArrowRightOutlined
          style={{ fontSize: '50px', color: '#242424' }}
        />
      </div>
    </div>
  );
};

export default Carousel;
