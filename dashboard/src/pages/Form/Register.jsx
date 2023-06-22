import { useState } from 'react';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import Loading from '../../components/Loading';
const baseUrl = import.meta.env.VITE_BASE_URL;

// EMAILJS KEYS
const emailjs_apikey = import.meta.env.VITE_EMAILJS_API_KEY;
const emailjs_templatekey = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
const emailjs_servicekey = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
emailjs.init(emailjs_apikey);

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

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    handleOpen();

    if (password !== confirmPassword) {
      setPasswordMatch(false);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    let data = JSON.stringify({
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    const emailParams = {
      to_name: username,
      to_email: email,
      message:
        'Your account has successfully been registered and is pending an approval.\nAn email confirming your accounts approval will be sent within 24 hours.',
      subject: `Welcome To Goobull Investments, ${firstName}`,
      from_email: 'no-reply@goobull.com',
    };

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/auth/register`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        emailjs
          .send(
            emailjs_servicekey,
            emailjs_templatekey,
            emailParams,
            emailjs_apikey
          )
          .then((response) => {
            console.log('Confirmation email sent:', response.text);
          })
          .catch((error) => {
            console.log('Error sending confirmation email:', error);
          });
        setIsLoading(false);
        navigate('/login');
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        setError(!errorss);
      });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            onChange={(e) =>
              setLastName(e.target.value.toUpperCase())
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
