import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/apiCalls';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const dispatch = useDispatch();
  // const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    // login(dispatch, { username, password });
  };

  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-950 bg-cover'>
      <div className='p-16 lg:w-2/4 bg-white'>
        <h1 className='text-center text-2xl font-semibold'>
          SIGN IN
        </h1>
        <form className='flex flex-col items-center mt-2 justify-center'>
          <input
            className='flex-1 min-w-2/4 m-2 p-2 w-full border-b-2 border-solid border-b-gray-300 focus:border-b-blue-950'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className='flex-1 min-w-2/4 m-2 p-2 w-full border-b-2 border-solid border-b-gray-300 focus:border-b-blue-950'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className='w-5/12 p-4 bg-blue-950 text-white my-2'
            onClick={handleClick}
            // disabled={isFetching}
          >
            LOGIN
          </button>
          {/* {error && (
            <span className='text-red-500'>
              Something went wrong...
            </span>
          )} */}
          <a
            className='m-1 text-xs underline cursor-pointer'
            href='/'
          >
            Forgot Password?
          </a>
          <a
            className='m-1 text-xs underline cursor-pointer'
            href='/register'
          >
            Create A New Account
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
