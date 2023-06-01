import { AddRounded } from '@mui/icons-material';

function Deposit() {
  return (
    <div className=''>
      <div>
        <h1 className='text-4xl text-center font-semibold'>
          Deposit
        </h1>
      </div>
      <div className='my-6'>
        <button className='bg-gray-100 p-1'>
          <AddRounded /> New Deposit
        </button>
      </div>
      <div>
        <table className='table w-full mb-5 border border-solid border-gray-100'>
          <thead className='bg-white'>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Payment mode</th>
              <th>Status</th>
              <th>Date created</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}

export default Deposit;
