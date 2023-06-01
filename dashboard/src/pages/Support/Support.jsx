function Support() {
  return (
    <div className='flex flex-col gap-10 px-10 h-[75vh] overflow-y-scroll'>
      <div className='flex flex-col flex-wrap gap-10 px-10'>
        <div className='text-center gap-5 flex-1'>
          <h1>Support</h1>
        </div>
        <div className='bg-white flex flex-1 flex-col px-5 py-7 w-8/12 shadow-3xl'>
          <p className='font-bold'>
            For inquiries, suggestions or complains. Mail us at:
          </p>
          <a
            href='mailto:support@lorem.com'
            className='text-green-700'
          >
            support@lorem.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Support;
