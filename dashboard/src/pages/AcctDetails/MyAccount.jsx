import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PrimaryButton } from '../../components/Button';
import { Modal } from '@mui/material';

const baseUrl = import.meta.env.VITE_BASE_URL;

const MyAccount = () => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    handleOpen();
    try {
      setIsLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      };

      if (username !== '' && password !== '') {
        await axios.put(
          `${baseUrl}/api/users/${user._id}`,
          { username, password },
          config
        );
        setIsLoading(false);
        setMessage('Username and Password updated successfully');
      } else if (username === '' && password !== '') {
        await axios.put(
          `${baseUrl}/api/users/${user._id}`,
          { password },
          config
        );
        setIsLoading(false);
        setMessage('Password updated successfully');
      } else if (username !== '' && password === '') {
        await axios.put(
          `${baseUrl}/api/users/${user._id}`,
          { username },
          config
        );
        setIsLoading(false);
        setMessage('Username updated successfully');
      }
      console.log('User updated successfully');
      setUsername('');
      setPassword('');
    } catch (err) {
      console.log(err);
      setMessage('Erorr!!');
      setIsLoading(false);
    }
  };
  if (isLoading) {
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
  }

  return (
    <div>
      <div className='black-gradient flex p-5 justify-center'>
        <h1 className='h1 blue-text-gradient'>
          My Account Information
        </h1>
      </div>

      {/******* FORM TO EDIT USER *******/}
      <div className='flex p-10 items-center justify-center'>
        <form
          className='w-full lg:w-7/12 flex flex-col gap-5 bg-white p-10 flex-wrap justify-center items-center mt-5'
          onSubmit={handleUpdate}
        >
          <input
            className='flex-1 w-full min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm'
            type='text'
            placeholder='Enter new username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='flex-1 w-full min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm'
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {message !== '' && (
            <h1
              className={`${
                message === 'Erorr!!'
                  ? 'text-red-600'
                  : 'text-green-500'
              }`}
            >
              {message}
            </h1>
          )}
          <button
            type='submit'
            className='text-white md:w-7/12 flex items-center justify-center rounded-t-xl rounded-br-xl object-cover'
          >
            <PrimaryButton>Update User</PrimaryButton>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
