import React from 'react'
import axios from 'axios'

import { PortfolioOverview } from './PortfolioOverview'
import { PortfolioStockTable } from './PortfolioStockTable'
import { NewStockForm } from './NewStockForm'

class PortfolioPage extends React.Component {
    constructor(props) {
        super(props)
        // this.addStock = this.addStock.bind(this);
        let stock = { 'MSFT' : { 'buyPrice' : '40', 'units' : '120', 'weight' : '50.00' }, 'GOOGL' : { 'buyPrice' : '50', 'units' : '120', 'weight' : '50.00' } }
        
        Object.keys(stock).forEach(function(key) {
            stock[key]['loaded'] = false
        })
        this.calcWeight = this.calcWeight.bind(this);
        stock = this.calcWeight(stock);
        console.log(stock)
        this.state = {
            userStocks : stock,
        }

        this.checkLoaded = this.checkLoaded.bind(this);
        this.getInfo = this.getInfo.bind(this);
        this.getInfo();
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
                    stocks[stockName]['loaded'] = true

                    component.setState({
                        userStocks : stocks,
                    });

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
                    });
                    console.log(error);
                })
        });
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

    render() {
        if (!this.checkLoaded()) {
            console.log(this.state.userStocks)
            return (
                <div />
            )
        }
        return (
            <div>
                <h1>My Portfolio</h1>
                <PortfolioOverview userStocks={this.state.userStocks}/>
                <PortfolioStockTable userStocks={this.state.userStocks}/>
            </div>
        );
    }
    
}

export { PortfolioPage }
