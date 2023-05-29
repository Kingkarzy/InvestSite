import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from '@mui/icons-material';
import React, { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollToNextSection = () => {
    // const nextSection = document.getElementById('next-section');
    // nextSection.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
    // window.scrollTo({ bottom: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.pageYOffset >=
        document.documentElement.scrollHeight;
      setIsAtBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {isAtBottom ? (
        <button
          onClick={scrollToTop}
          className='fixed rounded-full h-12 w-12 flex bottom-5 right-5 justify-center items-center z-[998] dark:bg-[#e0e0e0] dark:text-[#1a1a1a] focus:outline-none'
        >
          <ArrowUpwardOutlined />
        </button>
      ) : (
        <button
          onClick={scrollToNextSection}
          className='fixed rounded-full h-12 w-12 flex bottom-5 right-5 justify-center items-center z-[998] dark:bg-[#e0e0e0] dark:text-[#1a1a1a] focus:outline-none'
        >
          <ArrowDownwardOutlined />
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
