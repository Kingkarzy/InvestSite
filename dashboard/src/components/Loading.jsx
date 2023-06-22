import { Modal } from '@mui/material';

// eslint-disable-next-line react/prop-types
const Loading = ({ handleClose, open }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className='items-center justify-center flex h-screen font-semibold text-3xl'>
        Loading<span className='dot-1'>.</span>
        <span className='dot-2'>.</span>
        <span className='dot-3'>.</span>
      </div>
    </Modal>
  );
};

export default Loading;
