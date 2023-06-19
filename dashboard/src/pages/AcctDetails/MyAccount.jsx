import { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { PrimaryButton } from '../../components/Button';

const MyAccount = () => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      };

      await axios.put(
        `/api/users/${user.id}`,
        { username, password },
        config
      );
      console.log('User updated successfully');
    } catch (err) {
      console.log(err);
    }
  };

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
          className='w-7/12 flex flex-col gap-5 bg-white p-10 flex-wrap justify-center items-center mt-5'
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
          <button
            type='submit'
            className='text-white w-7/12 flex items-center justify-center rounded-t-xl rounded-br-xl object-cover'
          >
            <PrimaryButton>Update User</PrimaryButton>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyAccount;
