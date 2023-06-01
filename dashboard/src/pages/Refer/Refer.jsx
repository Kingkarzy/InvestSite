import { Person } from '@mui/icons-material';

const Refer = () => {
  return (
    <div className='flex flex-col gap-10 px-10 h-[75vh] overflow-y-scroll'>
      <div className='text-center gap-5'>
        <h1>Referrals</h1>
        <p>Refer users to ApexAI</p>
      </div>
      <div className='bg-white flex flex-col px-5 py-7 w-8/12 shadow-3xl'>
        <p className='font-bold'>
          You can refer users by sharing your referral link:
        </p>
        <p className='text-green-700'>
          https://apexpaytrading.com//ref/1644
        </p>
      </div>
      <div>
        <h3 className='text-center mb-1 text-3xl'>
          <small>Your sponsor</small>
          <br />
          <Person />
          <br />
          <small>null</small>
        </h3>
      </div>
      <div className='shadow-3xl'>
        <table className='table w-full mb-5 border border-solid border-gray-100'>
          <thead className='bg-white border-b-4 border-solid border-b-gray-300'>
            <tr>
              <th>Client</th>
              <th>Client Plan</th>
              <th>Client Status</th>
              <th>Ref Level</th>
              <th>Date Registered</th>
            </tr>
          </thead>
          <tbody className='bg-white'></tbody>
        </table>
      </div>
    </div>
  );
};

export default Refer;
