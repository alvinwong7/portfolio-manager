import React from 'react';
import alphavantage from 'alphavantage';

class GlobalStock extends React.Component {
  constructor(symbol_request) {
    super();
    
    this.state = {
      symbol : symbol_request,
      open : '',
      high: '',
      low: '',
      price: '',
      volume: '',
      latest_trading_day: '',
      prev_close: '',
      change: '',
      change_percent: '',
    }
  }

  componentDidMount() {
    this.getStockInfo().data.quote(this.state.symbol).then(result => {
      var stockCopy = Object.assign({}, this.result);
      this.setState({ 
        symbol: result['Global Quote']['01. symbol'],
        open : result['Global Quote']['02. open'],
        high: result['Global Quote']['03. high'],
        low: result['Global Quote']['04. low'],
        price: result['Global Quote']['05. price'],
        volume: result['Global Quote']['06. volume'],
        latest_trading_day: result['Global Quote']['07. latest trading day'],
        prev_close: result['Global Quote']['08. previous close'],
        change: result['Global Quote']['09. change'],
        change_percent: result['Global Quote']['10. change percent'],
      })
    })
  }

  getStockInfo() {
    const alpha = alphavantage({ key: 'Q57E765E5P4NIGUH' });
    return alpha;
  }

  getUpdate() {
    this.getStockInfo().data.quote(this.state.symbol).then(result => {
      var stockCopy = Object.assign({}, this.result);
      this.setState({ 
        symbol: result['Global Quote']['01. symbol'],
        open : result['Global Quote']['02. open'],
        high: result['Global Quote']['03. high'],
        low: result['Global Quote']['04. low'],
        price: result['Global Quote']['05. price'],
        volume: result['Global Quote']['06. volume'],
        latest_trading_day: result['Global Quote']['07. latest trading day'],
        prev_close: result['Global Quote']['08. previous close'],
        change: result['Global Quote']['09. change'],
        change_percent: result['Global Quote']['10. change percent'],
      })
    })
  }

  getSymbol() {
    return this.state.symbol;
  }

  getOpen() {
    return this.state.open;
  }

  getHigh() {
    return this.state.high;
  }

  getLow() {
    return this.state.low;
  }

  getPrice() {
    return this.state.price;
  }

  getVolume() {
    return this.state.volume;
  }

  getLatestTradingDay() {
    return this.state.latest_trading_day;
  }

  getPreviousClose() {
    return this.state.prev_close;
  }

  getChange() {
    return this.state.change;
  }

  getChangePercent() {
    return this.state.change_percent;
  }

  render() {
    return (
      // {stock['Global Quote']['01. symbol']}
      <div className='help'>
        Stock Name: {this.state.symbol}
        Price: {this.state.price}
      </div>
    );
  }
}

export { GlobalStock };
