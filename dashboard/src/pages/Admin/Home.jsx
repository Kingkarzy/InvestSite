import { useSelector } from "react-redux";
import Card from "../Dashboard/Card";
import PersonIcon from "@mui/icons-material/Person";
import { AttachMoney, TrendingUp } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const user = useSelector((state) => state.user);
  const [result, setResult] = useState([]);
  const [plansResult, setPlansResult] = useState([]);
  const [totalWithdrawAmount, setTotalAmount] = useState([]);
  const [totalDepositAmount, setTotalDepositAmount] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://server.goobull.com/api/admin/users",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const usersWithIds = response.data.users.map((user) => ({
          ...user,
          id: user._id, // Assign the `_id` field as the `id` property
        }));
        setResult(usersWithIds);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPlans = async () => {
      try {
        const response = await axios.get(
          "https://server.goobull.com/api/admin/plans",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setPlansResult(response.data.plansWithUsernames);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchWithdraw = async () => {
      try {
        const response = await axios.get(
          "https://server.goobull.com/api/admin/withdrawals",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const withdrawals = response.data.withdrawals;
        let totalAmount = 0;
        withdrawals.forEach((item) => {
          if (item.amount) {
            totalAmount += item.amount;
          }
        });

        setTotalAmount(totalAmount);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchDeposit = async () => {
      try {
        const response = await axios.get(
          "https://server.goobull.com/api/admin/deposits",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const deposit = response.data.deposits;
        let totalAmount = 0;
        deposit.forEach((item) => {
          if (item.amount) {
            totalAmount += item.amount;
          }
        });
        setTotalDepositAmount(totalAmount);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
    fetchPlans();
    fetchWithdraw();
    fetchDeposit();
  }, [user.token]);
  return (
    <div className="w-full font-semibold text-l">
      <div>
        <h1>
          Welcome! <span className=" capitalize">{user.username}</span> to the
          Admin Dashboard
        </h1>
      </div>
      <div className="flex flex-wrap gap-3 justify-start mt-5 text-center items-center">
        <Card
          logo={<PersonIcon fontSize="large" className="w-full" />}
          heading={"Total Users"}
          value={`${result.length}`}
        />
        <Card
          logo={<TrendingUp fontSize="large" className="w-full" />}
          heading={"All Plans"}
          value={`${plansResult.length}`}
        />
        <Card
          logo={<AttachMoney fontSize="large" className="w-full" />}
          heading={"Total Deposit"}
          value={`${totalDepositAmount}`}
        />
        <Card
          logo={<AttachMoney fontSize="large" className="w-full" />}
          heading={"Total Withdraw"}
          value={`${totalWithdrawAmount}`}
        />
      </div>
    </div>
  );
};
export default Home;
