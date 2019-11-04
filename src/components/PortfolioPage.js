import React from 'react'
import axios from 'axios'

import { PortfolioOverview } from './PortfolioOverview'
import { PortfolioStockTable } from './PortfolioStockTable'
import StockForm from './StockForm'

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props)
    let stock = { 'MSFT' : { 'buyPrice' : '40', 'units' : '120', 'weight' : '50.00' }, 'GOOGL' : { 'buyPrice' : '50', 'units' : '120', 'weight' : '50.00' } }
    
    this.calcWeight = this.calcWeight.bind(this);
    stock = this.calcWeight(stock);
    console.log(stock)
    this.state = {
      loaded : false,
      userStocks : stock,
    }

    this.getInfo = this.getInfo.bind(this);
    this.getInfo();
  }

  calcWeight = (stock) => {
    let sum = 0
    Object.keys(stock).forEach(function(key) {
      sum += parseFloat(stock[key]['units'])
    })

    Object.keys(stock).forEach(function(key) {
      stock[key]['weight'] = (100*(parseFloat(stock[key]['units'])/sum)).toFixed(2).toString()
    })

    return stock
  }

    getInfo = () => {
      // Access stock data from AlphaVantage API (5 calls per minute)
      const apiKey = 'W6WD0B30SYK3T2QI';
      let stocks = this.state.userStocks
      let component = this
      Object.keys(this.state.userStocks).forEach(function(key) {
        let stockName = key
        let url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + stockName +
                  '&apikey=' + apiKey;
        console.log(url)
        axios
          .get(url)
          .then( response => {
            // Collect stock identifying information
            let data = response.data['Global Quote']

            // Collect stock price data
            let name = data['01. symbol']
            let price = data['05. price']
            let open = data['02. open']
            let high = data['03. high']
            let low = data['04. low']
            let volume = data['06. volume']
            let change = data['09. change']
            let changePercent = data['10. change percent']
            let profits = (parseFloat(price) - parseFloat(open)) * parseFloat(stocks[name]['units'])
            let value = parseFloat(price) * parseFloat(stocks[name]['units'])
            stocks[stockName]['profits/loss'] = profits.toFixed(2).toString()
            stocks[stockName]['value'] = value.toFixed(2).toString()
            stocks[stockName]['price'] = parseFloat(price).toFixed(2).toString()
            stocks[stockName]['high'] = high
            stocks[stockName]['low'] = low
            stocks[stockName]['volume'] = volume
            stocks[stockName]['change'] = change
            stocks[stockName]['changePercent'] = changePercent

            component.setState({
                userStocks : stocks,
            });
            let names = Object.keys(stocks);
            if (stockName == names[names.length-1]) {
                component.setState({
                    loaded : true,
                })
            }
          })
          .catch( error => {
            stocks[stockName]['profits/loss'] = 'X'
            stocks[stockName]['value'] = 'X'
            stocks[stockName]['price'] = 'X'
            stocks[stockName]['high'] = 'X'
            stocks[stockName]['low'] = 'X'
            stocks[stockName]['volume'] = 'X'
            stocks[stockName]['change'] = 'X'
            stocks[stockName]['changePercent'] = 'X'

            component.setState({
                userStocks : stocks,
            });
            let names = Object.keys(stocks);
            if (stockName == names[names.length-1]) {
                component.setState({
                    loaded : true,
                })
            }
            console.log(error);
          })
      });
    }

  render() {
    if (this.state.loaded != true) {
      return (
        <div />
      )
    }
    return (
      <div>
        <h1>My Portfolio</h1>
        <PortfolioOverview userStocks={this.state.userStocks}/>
        <PortfolioStockTable userStocks={this.state.userStocks}/>
        <StockForm />
      </div>
    );
  }

}

export { PortfolioPage }