import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  DangerButton,
  DisabledButton,
} from '../../components/Button';

const Withdrawals = () => {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://server.goobull.com/api/admin/withdrawals',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setResult(response.data.withdrawals);
        // console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user.token]);

  const handlesubmit = (userId, withdrawalId) => {
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://server.goobull.com/api/admin/withdrawals/${withdrawalId}/${userId}/users`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='flex justify-center items-center'>
      <div className='mb-10 w-full flex flex-col justify-center items-center'>
        <table className='table w-full mb-5 border border-solid border-gray-100'>
          <thead className='bg-white'>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Payment mode</th>
              <th>Status</th>
              <th>Date created</th>
              <th>Approve</th>
            </tr>
          </thead>
          <tbody>
            {result.length !== 0 &&
              result.map((item, index) => (
                <tr key={item._id}>
                  <td className='text-center'>{index + 1}</td>
                  <td className='text-center'>{item.amount}</td>
                  <td className='text-center'>{item.mode}</td>
                  <td className='text-center'>{item.status}</td>
                  <td className='text-center'>
                    {new Date(item.date).toLocaleDateString('en-GB')}
                  </td>
                  <td className='text-center'>
                    {item.status == 'pending' ? (
                      <button
                        className='rounded-full'
                        onClick={() =>
                          handlesubmit(item.userId, item._id)
                        }
                      >
                        <DangerButton>Approve</DangerButton>
                      </button>
                    ) : (
                      <button
                        disabled
                        className='rounded-full '
                      >
                        <DisabledButton>Approve</DisabledButton>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Withdrawals;
