import PriceCard from "../../components/PricingCard";
function Plans() {
  return (
    <div className="items-center justify-center">
      <h1 className="mb-10 text-4xl text-center font-semibold text-black">
        Investment Plans
      </h1>
      <p className="mb-10 px-5 font-light text-center text-gray-400">
        No matter the size of your pocket, there is always a Plan for you.
        Explore our investment plans today!
      </p>
      <div className="w-[90%] grid grid-cols-1 sm:w-full sm:  md:grid-cols-2 lg:grid-cols-3 justify-between gap-5 mx-auto ">
        <PriceCard
          heading={"Bronze"}
          price="$1000"
          percent="25% daily"
          duration="Duration: 5 days"
          refer="2% referral bonus"
          content={`Capital accessible after investment elapses.`}
          // bgColor='#4182AB'
          width="20rem"
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
          width="20rem"
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
          width="20rem"
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
          width="20rem"
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
          width="20rem"
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
          width="20rem"
          height={400}
        />
      </div>
    </div>
  );
}

export default Plans;
