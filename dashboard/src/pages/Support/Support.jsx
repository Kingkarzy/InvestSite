function Support() {
  return (
    <div className='flex flex-col gap-10 md:px-10 h-[75vh] overflow-y-scroll'>
      <div className='flex flex-col flex-wrap gap-10'>
        <div className='black-gradient flex flex-col p-4 items-end'>
          <h1 className='h1'>Support</h1>
        </div>
        <div className='bg-white flex flex-1 flex-col px-2 md:px-5 py-7 w-full md:w-8/12 shadow-3xl'>
          <p className='font-bold text-sm md:text-base'>
            For inquiries, suggestions or complains. Mail us at:
          </p>
          <a
            href='mailto:support@lorem.com'
            className='text-green-700 text-sm md:text-base'
          >
            support@lorem.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Support;
