import {
  ArrowDownwardOutlined,
  ArrowUpwardOutlined,
} from '@mui/icons-material';
import { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const scrollToNextSection = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
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
          className='fixed rounded-lg h-8 w-6 flex bottom-10 opacity-40 hover:opacity-100 left-5 justify-center items-center z-[998] dark:bg-[#e0e0e0] dark:text-[#1a1a1a] focus:outline-none'
        >
          <ArrowUpwardOutlined />
        </button>
      ) : (
        <button
          onClick={scrollToNextSection}
          className='fixed rounded-lg h-8 w-6 flex bottom-10 opacity-40 hover:opacity-100 left-5 justify-center items-center z-[998] dark:bg-[#e0e0e0] dark:text-[#1a1a1a] focus:outline-none'
        >
          <ArrowDownwardOutlined />
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
