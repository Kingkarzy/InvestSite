/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

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
        const usersWithIds = response.data.users.map(
          (user, index) => ({
            ...user,
            id: user._id, // Assign the `_id` field as the `id` property
          })
        );
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

  const handlesubmit = (userId) => {
    let config = {
      method: 'patch',
      maxBodyLength: Infinity,
      url: `https://server.goobull.com/api/admin/users/approve/${userId}`,
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

  const columns = [
    { field: '_id', headerName: 'ID', width: 90 },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => {
        return (
          <div className='flex items-center'>
            {params.row.username}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'isApproved',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.isApproved ? (
              <h1 className='text-green-500'> Approved</h1>
            ) : (
              <h1 className='text-red-600'>Not Approved</h1>
            )}
          </div>
        );
      },
    },
    {
      field: 'balance',
      headerName: 'Transaction Volume',
      width: 160,
      renderCell: (params) => {
        return (
          <div className='flex items-center'>
            {params.row.balance}
          </div>
        );
      },
    }, 
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <button
              onClick={() => handlesubmit(params.row.id)}
              className={`border-none rounded-lg px-2 py-1 ${
                params.row.isApproved
                  ? 'bg-gray-100  text-black'
                  : 'bg-green-400  text-white'
              } cursor-pointer mr-5`}
            >
              {params.row.isApproved
                ? 'Restrict User'
                : 'Approve User'}
            </button>
            {/* <DeleteOutline
              className='fill-red-600 cursor-pointer'
              onClick={() => handleDelete(params.row.id)}
            /> */}
          </>
        );
      },
    },
  ];
  if (result === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex-[4] gap-12'>
      {result.length != 0 && (
        <DataGrid
          rows={result}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      )}
    </div>
  );
};
export default UserList;
