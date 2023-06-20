import {
  FacebookOutlined,
  Telegram,
  // LinkedIn,
  Twitter,
  WhatsApp,
} from '@mui/icons-material';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';

const emailjs_apikey = import.meta.env.VITE_EMAILJS_API_KEY;
const emailjs_templatekey = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
const emailjs_servicekey = import.meta.env.VITE_EMAILJS_SERVICE_KEY;

emailjs.init(emailjs_apikey);

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm(
      emailjs_servicekey,
      emailjs_templatekey,
      form.current,
      emailjs_apikey
    );
    e.target.reset();
  };
  return (
    <div
      id='contact'
      className='flex flex-col md:flex-row justify-center items-center pt-12 pb-20 md:py-24 px-6 md:px-20 lg:px-32 gap-12 overflow-hidden'
    >
      <div className='flex flex-col justify-center items-start gap-3'>
        <h1 className='font-bold text-3xl mt-4'>Send a message.</h1>
        <p className='mb-5 text-xl font-normal text-left'>
          We always open to hearing your questions
        </p>
        <div className='flex justify-start items-center gap-12 w-full'>
          <div className='flex flex-col'>
            <p className='text-sm font-light'>Mail us at</p>
            <p className='text-base font-normal'>
              support@goobull.com
            </p>
          </div>
          <div className='flex flex-col'>
            <p className='text-sm font-light'>Talk to us on</p>
            <div className='flex text-yellow-450 gap-2 items-center'>
              <a
                href='https://facebook.com/'
                target='blank'
                className='dark:text-yellow-450 text-purple-950'
              >
                <FacebookOutlined />
              </a>
              <a
                href='https://twitter.com/'
                target='blank'
                className='dark:text-yellow-450 text-purple-950'
              >
                <Twitter />
              </a>
              <a
                href='whatsapp.com/'
                target='blank'
                className='dark:text-yellow-400 text-purple-950'
              >
                <WhatsApp />
              </a>
              <a
                href='https://telegram.com/'
                target='blank'
                className='dark:text-yellow-450 text-purple-950'
              >
                <Telegram />
              </a>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-center'>
          <h2 className='text-black text-sm font-light mt-5'>
            Location{' '}
          </h2>
          <h2> Puistotie 12, Helsinki 00100, Finland</h2>
        </div>
      </div>
      <div>
        <form
          ref={form}
          onSubmit={sendEmail}
          className='flex items-center justify-center py-8 md:px-10 black-gradient flex-wrap gap-2 md:gap-5'
        >
          <input
            type='text'
            name='name'
            placeholder='Your Full Name'
            className='w-[85%] bg-transparent text-white text-sm mb-4 border-solid border-b-2 border-[#E0E0E0] focus:outline-none focus:border-b-2 focus:border-purple-950 p-2 rounded-sm'
            required
          />
          <input
            type='email'
            name='email'
            placeholder='Your Email'
            className='w-[85%] bg-transparent text-white text-sm mb-4 border-solid border-b-2 border-[#E0E0E0] focus:outline-none focus:border-b-2 focus:border-purple-950 p-2 rounded-sm'
            required
          />
          <textarea
            name='message'
            rows='4'
            placeholder='Your Message'
            className='w-[85%] bg-transparent text-white text-sm mb-4 border-solid border-b-2 border-[#E0E0E0] focus:outline-none focus:border-b-2 focus:border-purple-950 p-2 rounded-sm'
            required
          ></textarea>
          <div className='w-[85%] flex justify-end items-center'>
            <button
              type='submit'
              className='bg-[#e0e0e0] dark:bg-white dark:text-black dark:hover:text-white'
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
