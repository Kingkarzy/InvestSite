import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
import { Timeline } from "react-ts-tradingview-widgets";
function Chart() {
  return (
    <div className="items-center">
      <h1 className="mb-10 text-4xl text-center font-semibold text-black">
        Market News
      </h1>
      <div className="container p-10 lg:w-[90%] flex items-center mx-auto sm:flex-col sm:p-3 lg:flex-row gap-2">
        <div className="w-1/2 mx-auto ">
          <Timeline
            colorTheme="dark"
            feedMode="market"
            market="crypto"
            height={400}
            width="100%"
          ></Timeline>
        </div>
        <div className="w-1/2 mx-auto ">
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
