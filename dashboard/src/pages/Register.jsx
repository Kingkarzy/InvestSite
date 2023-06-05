const Register = () => {
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-gradient-to-b from-white to-[#9b51e0] bg-cover'>
      <div className='p-16  lg:w-2/4 bg-white shadow-2xl'>
        <h1 className='text-center text-2xl font-semibold'>
          CREATE AN ACCOUNT
        </h1>
        <form className='flex flex-wrap flex-col justify-center'>
          <input
            className='flex-1 min-w-40% m-2 p-2'
            type='text'
            placeholder='Name'
          />
          <input
            className='flex-1 min-w-40% m-2 p-2'
            type='text'
            placeholder='Last Name'
          />
          <input
            className='flex-1 min-w-40% m-2 p-2'
            type='text'
            placeholder='Username'
          />
          <input
            className='flex-1 min-w-40% m-2 p-2'
            type='email'
            placeholder='Email'
          />
          <input
            className='flex-1 min-w-40% m-2 p-2'
            type='password'
            placeholder='Password'
          />
          <input
            className='flex-1 min-w-40% m-2 p-2'
            type='password'
            placeholder='Confirm Password'
          />
          <p className='text-xs m-4'>
            By creating an account, I consent to the processing of my
            personal data in accordance with the
            <b>PRIVACY POLICY</b>
          </p>
          <div className='flex flex-col w-full items-center'>
            <button className='w-40% p-4 bg-teal-500 text-white'>
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
