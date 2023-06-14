import {
  CreditCard,
  Groups,
  Login,
  Money,
  PersonAdd,
  TrendingUp,
} from '@mui/icons-material';
import Card from '../../components/Card';
import {Link } from "react-router-dom"
const Features = () => {
  return (
    <div className="flex justify-center items-center flex-col ">
      <h1 className="mb-10 text-4xl font-semibold text-black">Features</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-around gap-5">
        <Link to="/register">
          <Card
            logo={<PersonAdd />}
            heading={"Register"}
            content={`Join our global network`}
            // bgColor='#4182AB'
            width="15rem"
            height="13rem"
          />
        </Link>
        <Link to="/login">
          {" "}
          <Card
            logo={<Login />}
            heading={"Login"}
            content={`Enjoy high profits regularly.`}
            // bgColor='#4182AB'
            width="15rem"
            height="13rem"
          />
        </Link>

        <Card
          logo={<Money />}
          heading={"Deposits"}
          content={`Make Seemless Deposits`}
          // bgColor='#4182AB'
          width="15rem"
          height="13rem"
        />
        <Card
          logo={<CreditCard />}
          heading={"Withdrawal"}
          content={`Make Easy Withdrawals`}
          // bgColor='#4182AB'
          width="15rem"
          height="13rem"
        />
        <Link to="/packages">
          <Card
            logo={<TrendingUp />}
            heading={"Investments"}
            content={`Good Quality Investments`}
            // bgColor='#4182AB'
            width="15rem"
            height="13rem"
          />
        </Link>
        <Card
          logo={<Groups />}
          heading={"Referrals"}
          content={`Earn amazing 8%-5%-2% referrals.`}
          // bgColor='#4182AB'
          width="15rem"
          height="13rem"
        />
      </div>
    </div>
  );
};

export default Features;
