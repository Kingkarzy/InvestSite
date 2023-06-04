import { Modal } from '@mui/material';
import { OutlineButton } from '../../components/Button';
import { PrimaryButton } from '../../components/Button';
import { useState } from 'react';

function Subscription() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className='flex flex-col gap-10 md:px-10 h-[75vh] overflow-x-hidden md:w-full overflow-y-scroll'>
      <div className='black-gradient flex flex-col p-4 items-end'>
        <h1 className='h1'>Subscription Trade</h1>
      </div>
      <div className='bg-white flex flex-col px-5 py-7 w-full lg:w-11/12 shadow-3xl'>
        <h2 className='font-semibold'>
          Apex Trading Services Account Manager
        </h2>
        <br />
        <p className='lg:w-2/3 font-light'>
          No time to trade or learn how to trade?
        </p>
        <p className='lg:w-2/3 font-light'>
          Our Account Management Service is The Best Profitable
          Trading Option for you.
        </p>
        <p className='lg:w-2/3 font-light'>
          We can help you to manage your account in the financial
          Market with a simple Subscription model.
        </p>
        <br />
        <h6 className='font-semibold'>Term and Conditions apply</h6>
        <p className='font-light'>
          Reach us @support@apexaitrading.com for more info.
        </p>
      </div>
      <div className='w-2/4 gap-5 flex'>
        <div>
          <PrimaryButton className='w-1/12'>
            Subscribe Now
          </PrimaryButton>
        </div>
        <div onClick={handleOpen}>
          <OutlineButton>Submit MT4 Details</OutlineButton>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <div></div>
      </Modal>
    </div>
  );
}

export default Subscription;
