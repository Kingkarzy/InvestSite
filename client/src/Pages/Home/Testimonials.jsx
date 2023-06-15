import { useState } from 'react';
import { testimonials } from '../../data';
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  FormatQuoteRounded,
} from '@mui/icons-material';
import { useMediaQuery } from '@mui/material';

const Testimonials = () => {
  const isNonMobileScreens = useMediaQuery('(min-width: 1024px)');
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === 'left') {
      setSlideIndex(
        slideIndex > 0 ? slideIndex - 1 : testimonials.length - 1
      );
    } else {
      setSlideIndex(
        slideIndex < testimonials.length - 1 ? slideIndex + 1 : 0
      );
    }
  };
  return (
    <div
      id='testimonials'
      className='flex w-full flex-col overflow-hidden justify-center items-center pb-8 text-black'
    >
      <div>
        <h1 className='text-4xl font-semibold -mb-9'>Testimonials</h1>
      </div>
      <div
        className='container flex md:mt-12 transform'
        style={{
          transform: isNonMobileScreens
            ? `translateX(${slideIndex * -100}%)` // for non-mobile screens
            : `translateX(${slideIndex * -100}%)`, // for mobile screens
          transition: 'all 1s ease',
        }}
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className='flex-shrink-0 w-full min-h-20vh'
          >
            <div className='flex-1 justify-center flex items-center '>
              <div className='p-12 flex items-center justify-center flex-col w-full max-w-full md:w-8/12'>
                <div className='p-8 flex flex-col bg-slate-100 justify-center shadow-3xl rounded'>
                  <FormatQuoteRounded
                    sx={{
                      fontSize: '6.5rem',
                      transform: 'rotate(180deg)',
                      '@media (max-width: 768px)': {
                        fontSize: '3rem',
                      },
                    }}
                  />
                  <div>
                    <p className='text-sm md:text-xl font-light mb-3 lg:mb-8'>
                      {item.review}
                    </p>
                    <div className='flex justify-between items-center'>
                      <div>
                        <h1 className='text-base md:text-lg font-semibold lg:font-bold'>
                          {item.name}
                        </h1>
                        <p className='text-sm font-light italic text-[#4182AB]'>
                          –{item.title}
                        </p>
                      </div>
                      <div className='flex justify-center items-center gap-2'>
                        <button
                          className='h-10 w-10 py-1 px-1 flex items-center justify-center rounded-full text-xl bg-transparent text-gray-500 hover:text-purple-950 dark:hover:text-yellow-450 hover:bg-transparent hover:dark:bg-[#242424] hover:border-none focus:outline-none transition-none cursor-pointer'
                          onClick={() => handleClick('left')}
                        >
                          <ArrowCircleLeftOutlined
                            style={{ fontSize: '30px' }}
                          />
                        </button>
                        <button
                          className='h-10 w-10 py-1 px-1 flex items-center justify-center rounded-full text-xl bg-transparent text-gray-500 hover:text-purple-950 dark:hover:text-yellow-450 hover:bg-transparent hover:dark:bg-[#242424] hover:border-none focus:outline-none transition-none cursor-pointer'
                          onClick={() => handleClick('right')}
                        >
                          <ArrowCircleRightOutlined
                            style={{ fontSize: '30px' }}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
