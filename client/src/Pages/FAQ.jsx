/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { faq } from '../data';
import { Add, Remove } from '@mui/icons-material';

const FAQ = () => {
  const [faqData, setFaqData] = useState(
    faq.map((person) => ({
      ...person,
      click: false,
      showSummary: false,
    }))
  );

  const handleButtonClick = (id) => {
    setFaqData((prevFaqData) =>
      prevFaqData.map((person) =>
        person.id === id
          ? {
              ...person,
              click: !person.click,
              showSummary: !person.showSummary,
            }
          : person
      )
    );
  };
  return (
    <div>
      {/* HEADING */}
      <div className='bg-[#f9f9f9] bg-center z-20 w-full h-96 top relative py-36 flex flex-col object-contain justify-center items-center'>
        <h1 className='text-5xl font-bold text-black my-8 text-center ml-0'>
          Frequently Asked Questions (FAQs)
        </h1>
      </div>
      {/* BODY */}
      <div className='px-4 py-24 bg-image bg-left bg-no-repeat bg-fixed bg-cover'>
        <div className='w-full lg:px-40'>
          {faqData.map(
            ({ id, heading, summary, click, showSummary }) => {
              return (
                <article
                  key={id}
                  className='bg-white border-b-[0.025rem] border-solid border-gray-300'
                >
                  <div
                    className='cursor-pointer items-center flex flex-row justify-between py-6 px-10'
                    onClick={() => handleButtonClick(id)}
                  >
                    <h4 className='pr-1 text-gray-900 text-2xl font-medium'>
                      {heading}
                    </h4>
                    {click ? (
                      <Remove sx={{ color: 'black' }} />
                    ) : (
                      <Add sx={{ color: 'black' }} />
                    )}
                  </div>
                  {showSummary && (
                    <div className='flex flex-col md:flex-row mt-8 mb-8 px-10 bg-white w-full items-center'>
                      <div className='mt-0 sm:mt-6 md:mt-0 bg-white'>
                        <p className='text-xs text-justify mb-1'>
                          {summary}
                        </p>
                      </div>
                    </div>
                  )}
                </article>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
