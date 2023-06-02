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

export default embedTradingViewWidget;
