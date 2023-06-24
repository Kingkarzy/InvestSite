/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DeleteOutline } from '@mui/icons-material';
import { AddRounded } from '@mui/icons-material';
import { PrimaryButton } from '../../components/Button';
import EditIcon from '@mui/icons-material/Edit';
import emailjs from 'emailjs-com';
import Loading from '../../components/Loading';
import { Load } from '../../components/Load';

const baseUrl = import.meta.env.VITE_BASE_URL;

const refresh = () => window.location.reload(true);

const emailjs_apikey = import.meta.env.VITE_EMAILJS_API_KEY;
const emailjs_templatekey = import.meta.env.VITE_EMAILJS_TEMPLATE_KEY;
const emailjs_servicekey = import.meta.env.VITE_EMAILJS_SERVICE_KEY;
emailjs.init(emailjs_apikey);

const UserList = () => {
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
          `${baseUrl}/api/admin/users`,
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
        setIsTableLoading(false);
      } catch (error) {
        console.log(error);
        setIsTableLoading(false);
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
    setIsLoading(true);
    handleOpen();
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `${baseUrl}/api/admin/users/approve/${userId}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const emailParams = {
      to_name: username,
      to_email: email,
      subject: 'Account Approval',
      message: `Dear ${username}, your account has been activated successfully. Happy investing!`,
      from_email: 'no-reply@goobull.com',
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
      {isTableLoading ? (
        <Load />
      ) : (
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
                        <h1 className='text-green-700'>Approved</h1>
                      ) : (
                        <h1 className='text-red-600'>Not Approved</h1>
                      )}
                    </td>
                    <td className='text-left'>${item.balance}</td>
                    <td className='text-left'>
                      {item.isApproved ? (
                        <button
                          disabled
                          className='border-solid border border-transparent rounded-lg px-2 py-1 bg-gray-100 text-black cursor-default mr-5'
                        >
                          Approve User
                        </button>
                      ) : (
                        <button
                          onClick={(e) =>
                            handleSubmit(
                              item.id,
                              item.username,
                              item.email,
                              e
                            )
                          }
                          className={`rounded-lg px-2 py-1 ${
                            item.isApproved
                              ? 'bg-gray-100 text-black'
                              : 'bg-green-700 text-white border border-solid border-transparent transition-all hover:bg-transparent hover:border-green-700 hover:text-green-700'
                          } cursor-pointer mr-5`}
                        >
                          {item.isApproved
                            ? 'Restrict User'
                            : 'Approve User'}
                        </button>
                      )}
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
      )}
    </div>
  );
};

export default UserList;
