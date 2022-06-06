let accordion = document.querySelectorAll('.accordion-div');
for (let i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener('click', function() {
        this.classList.toggle('active');
    })
}

new TradingView.widget(
    {
    "width":300,
    "height":300,
    "symbol": "NASDAQ:AAPL",
    "interval": "D",
    "timezone": "Etc/UTC",
    "theme": "Dark",
    "style": "3",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "enable_publishing": false,
    "allow_symbol_change": true,
    "container_id": "tradingview-apple"
  }
);

new TradingView.widget(
    {
    "width":300,
    "height":300,
    "symbol": "NASDAQ:TSLA",
    "theme": "Dark",
    "style": "3",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "container_id": "tradingview-tesla"
    }
);

new TradingView.widget(
    {
    "width":300,
    "height":300,
    "symbol": "NASDAQ:NFLX",
    "theme": "Dark",
    "style": "3",
    "locale": "en",
    "toolbar_bg": "#f1f3f6",
    "container_id": "tradingview-netflix"
    }
);