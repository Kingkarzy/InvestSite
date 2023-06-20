import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  DangerButton,
  DisabledButton,
} from '../../components/Button';
import emailjs from '@emailjs/browser';

const baseUrl = import.meta.env.VITE_BASE_URL;

const emailjs_apikey = import.meta.env.VITE_EMAILJS_API_KEY;
const emailjs_templatekey = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
const emailjs_servicekey = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
emailjs.init(emailjs_apikey);

const Withdrawals = () => {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/admin/withdrawals`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setResult(response.data.withdrawals);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user.token]);

  const handlesubmit = async (userId, withdrawalId, amount) => {
    let username;
    let email;
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
      username = response.data.username;
      email = response.data.email;
    } catch (error) {
      console.log(error);
    }
    const emailParams = {
      to_name: username,
      to_email: email,
      message: `Your withdrawal of $${amount} has been approved.`,
      subject: 'Withdrawal Approval',
      from_email: 'no-reply@goobull.com',
    };

    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/admin/withdrawals/${withdrawalId}/${userId}/users`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        emailjs
          .send(
            emailjs_servicekey,
            emailjs_templatekey,
            emailParams,
            emailjs_apikey
          )
          .then((response) => {
            console.log('Confirmation email sent:', response.text);
          })
          .catch((error) => {
            console.log('Error sending confirmation email:', error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='flex flex-col items-center w-fit lg:w-full'>
      <div className='background-gradient flex w-fit lg:w-full p-3 m-5 justify-start'>
        <h1 className='h1'>User Withdrawals</h1>
      </div>
      <div className='mb-10 w-full flex flex-col justify-center items-center'>
        <table className='table w-full mb-5 border border-solid border-gray-100'>
          <thead className='bg-white'>
            <tr>
              <th>ID</th>
              <th>Amount</th>
              <th>Payment mode</th>
              <th>Wallet</th>
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
                  <td className='text-center'>{item.wallet}</td>
                  <td className='text-center'>{item.status}</td>
                  <td className='text-center'>
                    {new Date(item.date).toLocaleDateString('en-GB')}
                  </td>
                  <td className='text-center'>
                    {item.status == 'pending' ? (
                      <button
                        className='rounded-full'
                        onClick={() =>
                          handlesubmit(
                            item.userId,
                            item._id,
                            item.amount
                          )
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
