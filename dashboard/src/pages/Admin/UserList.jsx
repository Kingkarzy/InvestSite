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
          'http://localhost:3001/api/users/',
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
  }, []);

  const handleDelete = (id) => {
    setResult(result.filter((item) => item.id === id));
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
            {/* <img
              className='w-8 h-8 rounded-[50%] object-cover mr-2'
              src={params.row.avatar}
              alt=''
            /> */}
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
    },
    {
      field: 'transaction',
      headerName: 'Transaction Volume',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/user/' + params.row.id}>
              <button className='border-none rounded-lg px-2 py-1 bg-[#3bb077] text-white cursor-pointer mr-5'>
                Edit
              </button>
            </Link>
            <DeleteOutline
              className='fill-red-600 cursor-pointer'
              onClick={() => handleDelete(params.row.id)}
            />
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
