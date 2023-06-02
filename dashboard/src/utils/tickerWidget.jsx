import { useEffect } from "react";

const TradingViewWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: "1m",
      width: 425,
      isTransparent: false,
      height: 450,
      symbol: "BINANCE:BTCUSDT",
      showIntervalTabs: true,
      locale: "in",
      colorTheme: "dark",
    });

    document
      .getElementsByClassName("tradingview-widget-container__widget")[0]
      .appendChild(script);

    return () => {
      document
        .getElementsByClassName("tradingview-widget-container__widget")[0]
        .removeChild(script);
    };
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div className="tradingview-widget-copyright">
        <a
          href="https://in.tradingview.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
        </a>
      </div>
    </div>
  );
};

export default TradingViewWidget;
