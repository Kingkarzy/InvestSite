import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { AddRounded } from '@mui/icons-material';
import { PrimaryButton } from '../../components/Button';
const baseUrl = import.meta.env.VITE_BASE_URL;

const Plans = () => {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);
  const [usernames, setUsernames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/admin/plans`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setResult(response.data.plansWithUsernames);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user.token]);

  useEffect(() => {
    const fetchUsernames = async () => {
      const usernamesMap = {};
      for (const item of result) {
        const username = await fetchUsername(item.userId);
        usernamesMap[item.userId] = username;
      }
      setUsernames(usernamesMap);
    };
    fetchUsernames();
  }, [result]);

  const fetchUsername = async (userId) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/admin/users/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      return response.data.username;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex justify-center w-full'>
      <div className='mb-10 w-full flex flex-col gap-5'>
        <div className='w-fit font-semibold text-white'>
          <PrimaryButton className=''>
            <AddRounded /> Create Plan
          </PrimaryButton>
        </div>
        <table className='table w-full mb-5 border border-solid border-gray-100'>
          <thead className='bg-white'>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Days Left</th>
              <th>Status</th>
              <th>Date started</th>
            </tr>
          </thead>
          <tbody>
            {result.length !== 0 &&
              result.map((item, index) => (
                <tr key={item._id}>
                  <td className='text-center'>{index + 1}</td>
                  <td className='text-center'>
                    {usernames[item.userId]}
                  </td>
                  <td className='text-center'>{item.planType}</td>
                  <td className='text-center'>{item.amount}</td>
                  <td className='text-center'>{item.duration}</td>
                  <td
                    className={`text-center ${
                      item.status === 'ongoing'
                        ? ''
                        : 'text-green-500'
                    }`}
                  >
                    {item.status}
                  </td>
                  <td className='text-center'>
                    {new Date(item.createdAt).toLocaleDateString(
                      'en-GB'
                    )}
                  </td>
                  <td className='text-center flex gap-3'>
                    <button
                      className='px-3 py-1 bg-yellow-500 rounded-sm text-white hover:scale-95'
                      onClick={() => {}}
                    >
                      Edit
                    </button>
                    <button
                      className='px-3 py-1 bg-red-600 rounded-sm text-white hover:scale-95'
                      onClick={() => {}}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Plans;
