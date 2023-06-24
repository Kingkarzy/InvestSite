export const Load = () => {
  return (
    <div className='items-center justify-center flex w-full my-6 font-semibold text-3xl'>
      Loading<span className='dot-1'>.</span>
      <span className='dot-2'>.</span>
      <span className='dot-3'>.</span>
    </div>
  );
};

export const LoadSmall = () => {
  return (
    <div className='items-center justify-center flex w-full font-medium text-base'>
      Loading<span className='dot-1'>.</span>
      <span className='dot-2'>.</span>
      <span className='dot-3'>.</span>
    </div>
  );
};
