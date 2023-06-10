/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const User = () => {
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

  return (
    <div className='flex-[4] gap-12'>
      {result.length != 0 && <h1></h1>}
    </div>
  );
};

export default User;
