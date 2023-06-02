import { useEffect } from "react";
import { UseBox } from "../../components/Box";
import embedTradingViewWidget from "../../utils/helpers";
import TradingViewWidget from "../../utils/TradingViewWidget";
import TickerWidget from "../../utils/tickerWidget";
const Dashboard = () => {
  useEffect(embedTradingViewWidget, []);
  return (
    <div className="">
      {/* TradingView Widget */}
      <div className="tradingview-widget-container">
        <div className="tradingview-widget-container__widget"></div>
      </div>

      <div>
        <div className="flex flex-row flex-wrap gap-1 lg:justify-between my-5">
          <UseBox icon="0" name="Balance" amount={"$" + 0 + ".00"} />

          <UseBox icon="0" name="Withdraw" amount={"$" + 0 + ".00"} />

          <UseBox icon="0" name="Profit" amount={"$"} />

          <UseBox icon="0" name="Bonus" amount={"$" + 0 + ".00"} />

          <UseBox icon="0" name="Bonus" amount={"$" + 0 + ".00"} />

          <UseBox icon="0" name="Bonus" amount={"$" + 0 + ".00"} />
        </div>
        <div className="">
          
          <div className="">
            {/* <TickerWidget /> */}
            <TradingViewWidget />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
