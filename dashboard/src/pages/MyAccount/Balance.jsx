import { useSelector } from "react-redux";
import { useEffect } from "react";
import balanceImg from "../../assets/images/money.png";
import NewCard from "../../components/NewCard";

function Balance() {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    user;
  });
  return (
    <div className="w-3/4 bg-purple-200 mx-auto p-3 rounded-xl" >
        <div className="w-full bg-green-200 flex justify-center py-5">
          <NewCard
            className="w-full"
            logo={<img src={balanceImg} alt="balance" className="w-36" />}
            heading={"ACCOUNT BALANCE"}
            value={`$${user.balance}`}
            checkout={"Invest in your dream"}
          />{" "}
        </div>
    </div>
  );
}

export default Balance;
