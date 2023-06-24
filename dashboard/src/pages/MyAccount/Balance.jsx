import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import balanceImg from '../../assets/images/money.png';
import NewCard from '../../components/NewCard';

const baseUrl = import.meta.env.VITE_BASE_URL;

function Balance() {
  const user = useSelector((state) => state.user);
  const userId = user._id;

  const [result, setResult] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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
        setResult(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [user.token, userId]);
  return (
    <div className="w-3/4 bg-purple-200 mx-auto p-3 rounded-xl">
      <div className="w-full bg-green-200 flex justify-center py-5">
        <NewCard
          className="w-full"
          logo={<img src={balanceImg} alt="balance" className="w-36" />}
          heading={"ACCOUNT BALANCE"}
          value={`$${result.balance > 0 ? result.balance.toFixed(2) : 0}`}
          checkout={"Invest in your dream"}
        />
      </div>
    </div>
  );
}

export default Balance;
