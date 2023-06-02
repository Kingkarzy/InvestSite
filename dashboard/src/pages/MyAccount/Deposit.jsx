import { AddRounded } from '@mui/icons-material';
import { PrimaryButton } from '../../components/Button';
function Deposit() {
  return (
    <div className=''>
      <div className='black-gradient flex p-5 justify-end'>
        <h1 className='h1 '>Deposit</h1>
      </div>
      <div className='w-fit my-6'>
        <PrimaryButton className=''>
          <AddRounded /> New Deposit
        </PrimaryButton>
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
