import React from 'react'
import axios from 'axios'
import { getSessionCookie } from "./Session";
import { PortfolioOverview } from './PortfolioOverview'
import { PortfolioStockTable } from './PortfolioStockTable'
import StockForm from './StockForm'

class PortfolioPage extends React.Component {
    _update = false

  constructor(props) {
    super(props)

    //getting the stocks form state in cookie
    let stocks = []
    let titleName = 'My Portfolio'
    let name = 'default'
    if (props.match.params.portfolioName != undefined) {
      stocks = getSessionCookie()["portfolios"][props.match.params.portfolioName]
      titleName = props.match.params.portfolioName
      name = titleName
    } else {
      stocks = getSessionCookie()["portfolios"]
      if(stocks){
          stocks = stocks["default"]
      }
    }

    //convetring to Dict
    var stockDict = {};
    if(stocks){
        stocks.forEach(makeDict);
    }
    function makeDict(value, index, array) {
        stockDict[value["code"]] = value
    }
    let stock = stockDict

    this.state = {
      loaded : true,
      userStocks : stock,
      session: stocks,
      portfolioName : name,
      titleName :titleName
    }

    this.calcWeight = this.calcWeight.bind(this)
    this.getInfo = this.getInfo.bind(this)
    this.getInfo()

    this.updateSession = this.updateSession.bind(this)
    

    if(stockDict == {}){
        this.setState({
            loaded: true
        });
    }
  }

  componentWillReceiveProps(nextProps) {
    let stocks = []
    let titleName = 'My Portfolio'
    let name = 'default'
    if (nextProps.match.params.portfolioName != undefined) {
      stocks = getSessionCookie()["portfolios"][nextProps.match.params.portfolioName]
      titleName = nextProps.match.params.portfolioName
      name = titleName
    } else {
      stocks = getSessionCookie()["portfolios"]
      if(stocks){
          stocks = stocks["default"]
      }
    }
    //converting to Dict
    var stockDict = {};
    if(stocks){
        stocks.forEach(makeDict);
    }
    function makeDict(value, index, array) {
        stockDict[value["code"]] = value
    }
    let stock = stockDict

    this.setState({
      loaded : true,
      userStocks : stock,
      session: stocks,
      portfolioName : name,
      titleName :titleName
    })

    if(stockDict == {}){
        this.setState({
            loaded: true
        });
    }

    this.getInfo();
  }


  getInfo = () => {
    // Access stock data from AlphaVantage API (5 calls per minute)
    const apiKey = '059YSIM0TS1VKHA0';
    let stocks = this.state.userStocks
    let component = this
    Object.keys(this.state.userStocks).forEach(function(key) {
      let stockName = key
      let url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + stockName +
                '&apikey=' + apiKey;
      //console.log(url)
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
          let profits = parseFloat(change) * parseFloat(stocks[name]['units'])
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
              component.calcWeight()
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

    calcWeight = () => {
        let sum = 0
        let stocks = this.state.userStocks
        Object.keys(stocks).forEach(function(key) {
            sum += parseFloat(stocks[key]['value'])
        })
        Object.keys(stocks).forEach(function(key) {
            stocks[key]['weight'] = (100*(parseFloat(stocks[key]['value'])/sum)).toFixed(2).toString()
        })
        this.setState({
            userStocks : stocks
        })
    }

  updateSession(name) {

      let stocks = getSessionCookie()['portfolios'][name]

      //converting to Dict
      var stockDict = {};
      if(stocks){
          stocks.forEach(makeDict);
      }
      function makeDict(value, index, array) {
          stockDict[value["code"]] = value
      }
      let stock = stockDict

      this.setState({
            userStocks :  stock,
            portfolioName : name
      })
      this._update = true
  }

  render() {
    if (this.state.loaded != true) {
      return (
        <div />
      )
    }
    if(this._update == true){
        this._update = false
        this.getInfo()
    }
    return (
      <div>
        <h1>{this.state.titleName}</h1>
        <PortfolioOverview userStocks={this.state.userStocks}/>
        <br/>
        <PortfolioStockTable userStocks={this.state.userStocks} portfolioName={this.state.portfolioName} updateSession = {this.updateSession}/>
        <StockForm updateSession = {this.updateSession} portfolioName = {this.state.portfolioName} />
      </div>
    );
  }
}

export { PortfolioPage }
