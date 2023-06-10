import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Deposits = () => {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:3001/api/dashboard/deposits',
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
    };

    fetchData();
  }, []);
  return (
    <div className='flex justify-center items-center flex-col'>
      {result.length !== 0 &&
        result.map((item, index) => (
          <div
            key={index}
            className='mb-10 w-2/4 flex flex-col justify-center items-center'
          >
            <h1>{item.userId}</h1>
            <h1>{item.amount}</h1>
            <h1>{item.status}</h1>
            <img
              src={item.imageUrl}
              alt={item.picturePath}
            />
          </div>
        ))}
    </div>
  );
};

export default Deposits;
