import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
import { Timeline } from "react-ts-tradingview-widgets";
function Chart() {
  return (
    <div className="items-center ">
      <h1 className="mb-10 text-4xl  text-center font-semibold text-black">
        Market News
      </h1>
      <div className="w-full lg:w-[90%] flex items-center mx-auto flex-wrap sm:p-3 gap-2">
        <div className="w-2/2 lg:w-1/3 mx-auto ">
          <Timeline
            colorTheme="dark"
            feedMode="market"
            market="crypto"
            height={400}
            width="100%"
          ></Timeline>
        </div>
        <div className="w-2/2 lg:w-1/3 mx-auto ">
          <CryptoCurrencyMarket
            className=""
            colorTheme="dark"
            width="100%"
            height={400}
          ></CryptoCurrencyMarket>
        </div>
      </div>
    </div>
  );
}

export default Chart;
