import React from 'react'
import axios from 'axios'
import { Button, Collapse } from 'react-bootstrap'

import { PortfolioOverview } from './PortfolioOverview'
import { PortfolioStockTable } from './PortfolioStockTable'
import { NewStockForm } from './NewStockForm'

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props)
    let stock = { 'MSFT' : { 'type' : 'Stock', 'buyPrice' : '40', 'units' : '120', 'weight' : '50.00' }, 'GOOGL' : { 'type' : 'Stock', 'buyPrice' : '50', 'units' : '120', 'weight' : '50.00' } }
    
    Object.keys(stock).forEach(function(key) {
      stock[key]['loaded'] = false
    })
    this.calcWeight = this.calcWeight.bind(this);
    stock = this.calcWeight(stock)
    this.state = {
      userStocks : stock,
      open: false,
    }

    this.checkLoaded = this.checkLoaded.bind(this)
    this.addStock = this.addStock.bind(this)
    this.getInfo = this.getInfo.bind(this)
    let component = this
    Object.keys(this.state.userStocks).forEach(function(key) {
      component.getInfo(key)
    })
  }

  calcWeight = (stock) => {
    let sum = 0
    Object.keys(stock).forEach(function(key) {
      sum += parseFloat(stock[key]['units'])
    })

    Object.keys(stock).forEach(function(key) {
      stock[key]['weight'] = (parseFloat(stock[key]['units'])/sum).toFixed(2).toString()
    })

    return stock
  }

  getInfo = (stockName) => {
    // Access stock data from AlphaVantage API (5 calls per minute)
    const apiKey = 'W6WD0B30SYK3T2QI'
    let stocks = this.state.userStocks
    let component = this
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
          stocks[stockName]['loaded'] = true

          component.setState({
            userStocks : stocks,
          })

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
          stocks[stockName]['loaded'] = true

          component.setState({
            userStocks : stocks,
          })
          console.log(error);
        })
  }

  checkLoaded = () => {
    let ret = true
    let stocks = this.state.userStocks
    Object.keys(stocks).forEach(function(key) {
      if (stocks[key]['loaded'] == false) {
        ret = false
      }
    })
    return ret
  }

  addStock(code, assetType, units, date, price) {
    try{
      let stocks = this.state.userStocks
      let stock = []
      stock['type'] = assetType
      stock['units'] = units
      stock['date'] = date
      stock['buyPrice'] = price
      stock['loaded'] = false

      stocks[code] = stock

      stocks = this.calcWeight(stocks)
      this.setState({
        userStocks : stocks,
      })
      this.getInfo(code)

    } catch(err){
        alert(err)
    }
    //alert("added "+ stock)
  }

  render() {
    if (!this.checkLoaded()) {
      return (
        <div />
      )
    }
    const { open } = this.state;
    return (
      <div>
        <h1>My Portfolio</h1>
        <PortfolioOverview userStocks={this.state.userStocks}/>
        <PortfolioStockTable userStocks={this.state.userStocks}/>
        <Button
					onClick={() => this.setState({ open: !open })}
					aria-controls="example-collapse-text"
					aria-expanded={open}
				>
					Add Stock
        </Button>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text">
            <br/>
          <NewStockForm addStock={this.addStock}/>
          </div>
				</Collapse>
      </div>
    );
  }
    
}

export { PortfolioPage }