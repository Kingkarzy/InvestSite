import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import { setLogin } from '../../state/index';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorss, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const response = await axios.post(
        'https://server.goobull.com/api/auth/register',
        {
          username,
          email,
          firstName,
          lastName,
          password,
        }
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
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className='w-screen h-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-[#e0e0e0] to-[#9b51e0] bg-cover'>
      <div className='m-8 lg:m-0 p-6 lg:p-16 w-10/12 md:w-7/12 lg:w-5/12 lg:landscape:w-5/12 landscape:w-full lg:landscape:scale-100 landscape:scale-50 bg-white shadow-2xl rounded-t-3xl rounded-br-3xl'>
        <h1 className='text-center text-2xl font-semibold'>
          CREATE AN ACCOUNT
        </h1>
        <form className='flex flex-wrap flex-col justify-center mt-5'>
          <input
            className='flex-1 min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm md:text-base'
            type='text'
            placeholder='Username'
            required
            onChange={(e) =>
              setUsername(e.target.value.toLowerCase())
            }
          />
          <input
            className='flex-1 min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm md:text-base'
            type='email'
            placeholder='Email'
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className='flex-1 min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm md:text-base'
            type='text'
            placeholder='First Name'
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className='flex-1 min-w-[40%] m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm md:text-base'
            type='text'
            placeholder='Last Name'
            required
            onChange={(e) => setLastName(e.target.value)}
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
          <div className='relative flex-1 mr-2 pr-2'>
            <input
              className='flex-1 min-w-[40%] w-full m-2 p-2 border border-solid border-gray-300 focus:border-blue-900 text-sm md:text-base pr-[2.5rem]'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder='Confirm Password'
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type='button'
              name='toggleConfirmPassword'
              onClick={handleToggleConfirmPassword}
              className='absolute right-0 top-1/2 transform -translate-y-1/2 mr-2'
            >
              {showConfirmPassword ? (
                <VisibilityOff sx={{ fontSize: '1.2rem' }} />
              ) : (
                <Visibility sx={{ fontSize: '1.2rem' }} />
              )}
            </button>
          </div>
          {!passwordMatch && (
            <span className='text-red-400 mx-2 text-sm lg:text-base'>
              Passwords do not match
            </span>
          )}
          <p className='text-xs m-4'>
            By creating an account, I consent to the processing of my
            personal data in accordance with the <b>PRIVACY POLICY</b>
          </p>
          <div className='flex flex-col w-full items-center px-2'>
            <button
              className='w-[100%] px-4 text-lg py-2 bg-[#2d21d3] text-white hover:scale-105 rounded-t-xl rounded-br-xl'
              onClick={handleRegister}
            >
              REGISTER
            </button>
            {errorss && (
              <span className='text-red-400 text-sm lg:text-base'>
                Something went wrong...
              </span>
            )}
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
