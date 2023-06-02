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
      <div className='bg-white flex flex-col px-5 py-7 w-full lg:w-8/12 shadow-3xl'>
        <p className='font-normal text-sm md:text-base'>
          Don’t have time to trade or learn how to trade? <br />
          We can help you to manage your account in the financial
          MARKET with a simple subscription model.
        </p>
        <p className='text-green-700 font font-light text-sm md:text-base'>
          Terms and Conditions apply
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
