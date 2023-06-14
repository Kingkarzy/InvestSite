import { useEffect } from "react";
import ScrollAnimation from "react-animate-on-scroll";
import Divider from "../../components/Divider";
import Features from "./Features";
import Header from "./Header";
import Testimonials from "./Testimonials";
import Chart from "./Chart";
import Plans from "./Plans";
import Why from "./Why";
import MobileApps from "./MobileApps";
import btc from "../../assets/images/btc.svg";
import doge from "../../assets/images/doge.svg";
import usdt from "../../assets/images/usdt.svg";
import eth from "../../assets/images/eth.svg";
import fx from "../../assets/images/fx.svg";

function embedTradingViewWidget() {
  window.onload = function () {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = `
    {
      "symbols": [
        {
          "proName": "BITSTAMP:BTCUSD",
          "title": "Bitcoin"
        },
        {
          "proName": "BITSTAMP:ETHUSD",
          "title": "Ethereum"
        },
        {
          "description": "TESLA",
          "proName": "NASDAQ:TSLA"
        },
        {
          "description": "Doge",
          "proName": "BINANCE:DOGEUSD"
        },
        {
          "description": "APPLE",
          "proName": "NASDAQ:AAPL"
        },
        {
          "description": "NVIDIA",
          "proName": "NASDAQ:NVDA"
        }
      ],
      "showSymbolLogo": true,
      "colorTheme": "light",
      "isTransparent": false,
      "displayMode": "adaptive",
      "locale": "en"
    }`;

    const container = document.querySelector(
      ".tradingview-widget-container__widget"
    );
    container.appendChild(script);
  };

  return undefined;
}

const Home = () => {
  useEffect(embedTradingViewWidget, []);
  return (
    <>
      {/* TradingView Widget */}
      <div className="tradingview-widget-container fixed left-0 right-0 top-[4.95rem] z-[99]">
        <div className="tradingview-widget-container__widget"></div>
      </div>
      <div className="flex flex-col scroll-smooth">
        <Header />
        <Divider />
        <Features />
        <Divider />
        <Why />
        <Divider />
        <ScrollAnimation
          animateIn="animate__fadeInUp"
          delay="100"
          duration={300}
        >
          <div className="-my-36">
            <Plans />
          </div>
        </ScrollAnimation>
        <Divider />
        <Chart />
        <Divider />
        <Testimonials />
        <div className="mb-10 flex justify-center gap-4 md:gap-12 lg:gap-52 overflow-hidden">
          <img
            src={usdt}
            height="40px"
            width="40px"
            className="img-hover-opacity"
          />
          <img
            src={doge}
            height="40px"
            width="40px"
            className="img-hover-opacity"
          />
          <img
            src={btc}
            height="40px"
            width="40px"
            className="img-hover-opacity"
          />
          <img
            src={eth}
            height="40px"
            width="40px"
            className="img-hover-opacity"
          />
          <img
            src={fx}
            height="40px"
            width="40px"
            className="img-hover-opacity"
          />
        </div>
        <MobileApps />
      </div>
    </>
  );
};

export default Home;
