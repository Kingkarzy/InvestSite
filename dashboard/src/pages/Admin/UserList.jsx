/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { AddRounded } from '@mui/icons-material';
import { PrimaryButton } from '../../components/Button';
import EditIcon from '@mui/icons-material/Edit';
import emailjs from 'emailjs-com';

emailjs.init('KttVShQuK7ehuvHKB');

const UserList = () => {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://server.goobull.com/api/admin/users',
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const usersWithIds = response.data.users.map((user) => ({
          ...user,
          id: user._id,
        }));
        setResult(usersWithIds);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user.token]);

  const handleDelete = (id) => {
    setResult(result.filter((item) => item.id === id));
  };

  const handleEdit = (id) => {
    // const { title, description, price, amount, images, category, properties, _id } = req.body;
    // await Product.updateOne({ id }, { title, description, price, amount, images, category, properties });
    // res.json(true);
  };

  const handleSubmit = (userId, username, email, e) => {
    e.preventDefault();
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://server.goobull.com/api/admin/users/approve/${userId}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const emailParams = {
      to_name: username,
      to_email: email,
      message: `Dear ${username}, your account has been activated successfully.`,
      from_email: 'no-reply@goobull.com',
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        emailjs
          .send(
            'service_xo5bbu9',
            'template_agoq6hg',
            emailParams,
            'KttVShQuK7ehuvHKB'
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

  if (result === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col gap-5'>
      <div className='w-fit font-semibold text-white'>
        <PrimaryButton>
          <button
            className='w-full'
            onClick={() => {}}
          >
            <AddRounded /> Create User
          </button>
        </PrimaryButton>
      </div>
      <div className='flex-[4] gap-12'>
        {result.length !== 0 && (
          <table>
            <thead>
              <tr className='border-b border-solid border-b-gray-400'>
                <th className='text-left'>ID</th>
                <th className='text-left'>User</th>
                <th className='text-left'>Email</th>
                <th className='text-left'>Status</th>
                <th className='text-left'>Transaction Volume</th>
                <th className='text-left'>Approve User</th>
                <th className='text-left'>Edit User</th>
                <th className='text-left'>Delete User</th>
              </tr>
            </thead>
            <tbody>
              {result.map((item, index) => (
                <tr
                  key={item.id}
                  className='border-b border-solid border-b-gray-200'
                >
                  <td className='text-left'>{index + 1}</td>
                  <td className='text-left'>{item.username}</td>
                  <td className='text-left'>{item.email}</td>
                  <td className='text-left'>
                    {item.isApproved ? (
                      <h1 className='text-green-500'>Approved</h1>
                    ) : (
                      <h1 className='text-red-600'>Not Approved</h1>
                    )}
                  </td>
                  <td className='text-left'>${item.balance}</td>
                  <td className='text-left'>
                    <button
                      onClick={(e) =>
                        handleSubmit(
                          item.id,
                          item.username,
                          item.email,
                          e
                        )
                      }
                      className={`border-none rounded-lg px-2 py-1 ${
                        item.isApproved
                          ? 'bg-gray-100 text-black'
                          : 'bg-green-400 text-white'
                      } cursor-pointer mr-5`}
                    >
                      {item.isApproved
                        ? 'Restrict User'
                        : 'Approve User'}
                    </button>
                  </td>
                  <td>
                    <div className='flex cursor-pointer'>
                      <EditIcon
                        className='text-yellow-500 cursor-pointer'
                        onClick={() => handleEdit(item.id)}
                      />
                      Edit
                    </div>
                  </td>
                  <td>
                    <div className='flex cursor-pointer'>
                      <DeleteOutline
                        className='text-red-600 cursor-pointer'
                        onClick={() => handleDelete(item.id)}
                      />
                      Delete
                    </div>
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

export default UserList;
