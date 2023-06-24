import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  DangerButton,
  DisabledButton,
} from '../../components/Button';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { Load } from '../../components/Load';
import Loading from '../../components/Loading';

const baseUrl = import.meta.env.VITE_BASE_URL;

const emailjs_apikey = import.meta.env.VITE_EMAILJS_API_KEY;
const emailjs_templatekey = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
const emailjs_servicekey = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
emailjs.init(emailjs_apikey);

const refresh = () => window.location.reload(true);

const Deposits = () => {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsTableLoading(true);
        const response = await axios.get(
          `${baseUrl}/api/admin/deposits`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setResult(response.data.deposits);
      } catch (error) {
        console.log(error);
      }
      setIsTableLoading(false);
    };

    fetchData();
  }, [user.token]);

  const handlesubmit = async (userId, depositId, amount) => {
    let username;
    let email;
    setIsLoading(true);
    handleOpen();
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
      message: `Your deposit of $${amount} has been approved.`,
      subject: 'Deposit Approval',
      from_email: 'no-reply@goobull.com',
    };

    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/admin/deposits/${depositId}/${userId}/users`,
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
        setIsLoading(false);
        refresh();
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        refresh();
      });
  };
  if (isLoading) {
    return (
      <Loading
        open={open}
        handleClose={handleClose}
      />
    );
  }
  return (
    <div className='flex flex-col items-center w-fit lg:w-full'>
      <div className='black-gradient flex w-fit lg:w-full p-3 m-5 justify-center'>
        <h1 className='h1 text-3xl blue-text-gradient'>
          User Deposits
        </h1>
      </div>
      <div className='mb-10 w-full flex flex-col justify-center items-center'>
        {isTableLoading ? (
          <Load />
        ) : (
          <table className='table w-full mb-5'>
            <thead className='bg-white'>
              <tr className='border-b border-solid border-b-gray-400'>
                <th>ID</th>
                <th>Amount</th>
                <th>Payment mode</th>
                <th>Status</th>
                <th>Image</th>
                <th>Date created</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {result.length !== 0 &&
                result.map((item, index) => (
                  <tr
                    key={item._id}
                    className='border-b border-solid border-b-gray-200'
                  >
                    <td className='text-center'>{index + 1}</td>
                    <td className='text-center'>{item.amount}</td>
                    <td className='text-center'>{item.mode}</td>
                    <td className='text-center'>{item.status}</td>
                    <td className='text-center'>
                      <Link
                        to={`${baseUrl}/assets/${item.picturePath}`}
                      >
                        {item.picturePath}
                      </Link>
                    </td>
                    <td className='text-center'>
                      {new Date(item.date).toLocaleDateString(
                        'en-GB'
                      )}
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
        )}
      </div>
    </div>
  );
};

export default Deposits;
