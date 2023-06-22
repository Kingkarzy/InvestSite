import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import { setLogin } from '../../state/index';
// import { Modal } from '@mui/material';
import Loading from '../../components/Loading';
const baseUrl = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorss, setError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const login = async (values) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/login`,
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
        setIsLoading(false);
        navigate('/');
      }
    } catch (err) {
      setError(!errorss);
      setIsLoading(false);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleOpen();
    login({
      username,
      password,
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  if (isLoading) {
    return (
      <Loading
        handleClose={handleClose}
        open={open}
      />
    );
  }

  return (
    <div className='w-screen h-screen flex items-center justify-center background-gradient bg-cover'>
      <div className='m-8 lg:m-0 p-6 lg:p-16 w-10/12 md:w-7/12 lg:w-5/12 bg-white shadow-2xl rounded-t-3xl rounded-br-3xl'>
        <h1 className='text-center text-2xl font-semibold'>LOGIN</h1>
        <form className='flex flex-wrap flex-col justify-center mt-5'>
          <input
            className='flex-1 min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm'
            type='text'
            placeholder='Username'
            required
            onChange={(e) =>
              setUsername(e.target.value.toLowerCase())
            }
          />
          <div className='relative flex-1 mr-2 pr-2'>
            <input
              className='flex-1 min-w-[40%] w-full m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm md:text-base pr-[2.5rem]'
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type='button'
              name='togglePassword'
              onClick={handleTogglePassword}
              className='absolute right-0 top-1/2 transform -translate-y-1/2 mr-2'
            >
              {showPassword ? (
                <VisibilityOff sx={{ fontSize: '1.2rem' }} />
              ) : (
                <Visibility sx={{ fontSize: '1.2rem' }} />
              )}
            </button>
          </div>
          <div className='flex flex-col w-full items-center mt-5 px-2'>
            <button
              className='w-full px-4 text-lg py-2 bg-[#2d21d3] text-white hover:scale-105 rounded-t-xl rounded-br-xl'
              onClick={handleClick}
            >
              LOGIN
            </button>
            {errorss && (
              <span className='text-red-400 text-sm lg:text-base'>
                Something went wrong...
              </span>
            )}
            <a
              className='m-3 text-xs underline cursor-pointer'
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
