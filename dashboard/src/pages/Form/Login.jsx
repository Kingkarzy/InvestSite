import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setLogin } from '../../state/index';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorss, setError] = useState(false);
  //   const [errMessage, setErrMessage] = useState('');

  const login = async (values) => {
    try {
      const response = await axios.post(
        'https://server.goobull.com/api/auth/login',
        values
      );
      const loggedIn = response.data;

      if (loggedIn) {
        dispatch(
          setLogin({
            user: loggedIn,
            token: loggedIn.token,
          })
        );
        navigate('/');
      }
    } catch (err) {
      setError(!errorss);
      //   setErrMessage('Invalid Credentials')
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    login({
      username,
      password,
    });
  };
  return (
    <div className='w-screen h-screen flex items-center justify-center background-gradient bg-cover'>
      <div className='p-16  lg:w-2/4 bg-white shadow-2xl'>
        <h1 className='text-center text-2xl font-semibold'>
          LOGIN TO YOUR ACCOUNT
        </h1>
        <form className='flex flex-wrap flex-col justify-center mt-5'>
          <input
            className='flex-1 min-w-40% m-2 p-2 border border-solid border-gray-300 focus:border-blue-900'
            type='text'
            placeholder='Username'
            onChange={(e) =>
              setUsername(e.target.value.toLowerCase())
            }
          />
          <input
            className='flex-1 min-w-40% m-2 p-2 border border-solid border-gray-300 focus:border-blue-900'
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='flex flex-col w-full items-center mt-5'>
            {errorss && (
              <span className='text-red-400'>
                Something went wrong...
              </span>
            )}
            <button
              className='w-40% px-4 text-lg py-2 bg-teal-500 text-white hover:scale-105'
              onClick={handleClick}
            >
              LOGIN
            </button>
            <a
              className='m-1 text-xs underline cursor-pointer'
              href='/register'
            >
              No Existing Account? Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
