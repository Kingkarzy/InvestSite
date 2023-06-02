import PriceCard from "../../components/PricingCard";
function Trade() {
  return (
    <div className="items-center justify-evenly my-5">
      <div className="black-gradient flex p-4 justify-evenly">
        <h1 className="h2">Available Packages</h1>
      </div>
      <div className="flex justify-center bg-blue-300 py-2 mb-5">
        <p className="text-blue-900 ">
          &#9888;
          {" You do not have a package at the moment"}
        </p>
      </div>
      <div className="flex flex-wrap gap-5">
        <PriceCard
          heading={"Bronze"}
          price="$1000"
          percent="25% daily"
          duration="Duration: 5 days"
          refer="2% referral bonus"
          content={`Capital accessible after investment elapses.`}
          // bgColor='#4182AB'
          width="17rem"
          height={400}
        />
        <PriceCard
          heading={"Silver"}
          price="$5000"
          percent="35% daily"
          duration="Duration: 7 days"
          refer="2% referral bonus"
          content={`Capital accessible after investment elapses.`}
          // bgColor='#4182AB'
          width="17rem"
          height={400}
        />
        <PriceCard
          heading={"Gold"}
          price="$10000"
          percent="40% daily"
          duration="Duration: 10 days"
          refer="5% referral bonus"
          content={`Capital accessible after investment elapses.`}
          // bgColor='#4182AB'
          width="17rem"
          height={400}
        />
        <PriceCard
          heading={"Diamond"}
          price="$25000"
          percent="50% daily"
          duration="Duration: 14 days"
          refer="5% referral bonus"
          content={`Capital accessible after investment elapses.`}
          // bgColor='#4182AB'
          width="17rem"
          height={400}
        />
        <PriceCard
          heading={"Emerald"}
          price="$50000"
          percent="55% daily"
          duration="Duration: 20 days"
          refer="8% referral bonus"
          content={`Capital accessible after investment elapses.`}
          // bgColor='#4182AB'
          width="17rem"
          height={400}
        />
        <PriceCard
          heading={"Ruby"}
          price="$100000"
          percent="75% daily"
          duration="Duration: 25days"
          refer="8% referral bonus"
          content={`Capital accessible after investment elapses.`}
          // bgColor='#4182AB'
          width="17rem"
          height={400}
        />
      </div>
    </div>
  );
}

export default Trade;
