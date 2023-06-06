import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorss, setError] = useState(false);

  const register = async (dispatch, values) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/auth/register',
        values
      );
      const savedUser = response.data;
      if (savedUser) {
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
      setError(!errorss);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    register(dispatch, {
      username,
      email,
      password,
      firstName,
      lastName,
    });
  };
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#9b51e0] bg-cover'>
      <div className='p-16  lg:w-2/4 bg-white shadow-2xl'>
        <h1 className='text-center text-2xl font-semibold'>
          CREATE AN ACCOUNT
        </h1>
        <form className='flex flex-wrap flex-col justify-center mt-5'>
          <input
            className='flex-1 min-w-40% m-2 p-2 border border-solid border-gray-300 focus:border-blue-900'
            type='text'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='flex-1 min-w-40% m-2 p-2 border border-solid border-gray-300 focus:border-blue-900'
            type='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='flex-1 min-w-40% m-2 p-2 border border-solid border-gray-300 focus:border-blue-900'
            type='text'
            placeholder='First Name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className='flex-1 min-w-40% m-2 p-2 border border-solid border-gray-300 focus:border-blue-900'
            type='text'
            placeholder='Last Name'
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            className='flex-1 min-w-40% m-2 p-2 border border-solid border-gray-300 focus:border-blue-900'
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className='flex-1 min-w-40% m-2 p-2 border border-solid border-gray-300 focus:border-blue-900'
            type='password'
            placeholder='Confirm Password'
          />
          <p className='text-xs m-4'>
            By creating an account, I consent to the processing of my
            personal data in accordance with the <b>PRIVACY POLICY</b>
          </p>
          <div className='flex flex-col w-full items-center'>
            {errorss && (
              <span className='text-red-400'>
                Something went wrong...
              </span>
            )}
            <button
              className='w-40% px-4 text-lg py-2 bg-teal-500 text-white hover:scale-105'
              onClick={handleClick}
            >
              REGISTER
            </button>
            <a
              className='m-1 text-xs underline cursor-pointer'
              href='/login'
            >
              Existing Account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
