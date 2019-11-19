import React from 'react'
import axios from 'axios'

import { PortfolioOverview } from './PortfolioOverview'
import { PortfolioStockTable } from './PortfolioStockTable'
import { getSessionCookie } from "./Session"
import { NewStockFormButton } from './NewStockFormButton'

/** 
 * Class for the users portfolio page
 * 
 * @class
 * @exports PortfolioPage
*/
class PortfolioPage extends React.Component {
    /**
     * Initialises the portfolios list of stocks, its name and appropriate page 
     * title name from the cookies
     * 
     * @constructor
     * @param {object} props Contains the following important parameters:
     * @param {string} props.match.params.portfolioName portfolio name from url
     */
    constructor(props) {
        super(props)
        
        this.calcWeight = this.calcWeight.bind(this)
        this.getInfo = this.getInfo.bind(this)
        this.getPortfolioDetailsFromCookies = this.getPortfolioDetailsFromCookies.bind(this)
        this.updateSession = this.updateSession.bind(this)

        // Getting stocks, name and page title name from cookies
        let details = this.getPortfolioDetailsFromCookies(props)
        let stocks = details[0]
        let name = details[1]
        let titleName = details[2]

        this.state = {
            userStocks: stocks,
            portfolioName: name,
            titleName: titleName,
            update: false
        }

        this.getInfo(this.state.userStocks)
    }

    /**
     * Lifecycle method for when the component receives props. This occurs
     * when you redirect from one portfolio to another i.e. portfolio from 
     * the portfolio builder page to the users actual portfolio
     * 
     * @param {object} nextProps Contains the same required parameters as the 
     * constructor @see constructor for more detailed information
     */
    componentWillReceiveProps = (nextProps) => {
        let details = this.getPortfolioDetailsFromCookies(nextProps)
        let stocks = details[0]
        let name = details[1]
        let titleName = details[2]

        this.setState({
            userStocks: stocks,
            portfolioName: name,
            titleName: titleName,
            update: true
        })

    }

    /**
     * Gets the required portfolio details from cookies
     * 
     * @param {object} props Argument from @see constructor and 
     * @see componentWillReceiveProps Please see @see constructor for more details
     * concerning this parameter
     * @return {array} contains list of stocks, portfolio name and an appropriate 
     * page title name
     */
    getPortfolioDetailsFromCookies = (props) => {
        let stocks = []
        let titleName = 'My Portfolio'
        let name = 'default'
        if (props.match.params.portfolioName !== undefined) {
            stocks = getSessionCookie()["portfolios"][props.match.params.portfolioName]
            titleName = props.match.params.portfolioName
            name = titleName
        } else {
            stocks = getSessionCookie()["portfolios"]
            if (stocks) {
                stocks = stocks["default"]
            }
        }

        return [stocks, name, titleName]
    }

    /**
     * Calls Alphavantage API for details concerning the stocks belonging in the 
     * portfolio. For each stock it includes: profit/loss, value, price, high, 
     * low, volume, change and percentage change. 
     * 
     * @param {array} stocks List of stocks in the portfolio
     */
    getInfo = (stocks) => {
        const apiKey = '059YSIM0TS1VKHA0'
        let component = this
        // Iterate through each stock to call the API and set the mentioned details
        for (let i = 0; i < stocks.length; i++) {
            let stockName = stocks[i]['code']
            let url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + stockName +
                        '&apikey=' + apiKey

            axios.get(url).then(response => {
                // Collect stock identifying information
                let data = response.data['Global Quote']

                // Collect stock price data
                let price = data['05. price']
                let high = data['03. high']
                let low = data['04. low']
                let volume = data['06. volume']
                let change = data['09. change']
                let changePercent = data['10. change percent']
                // profit/loss = change * units owned
                let profitLoss = parseFloat(change) * parseFloat(stocks[i]['units'])
                // total value of stock = price * units owned
                let value = parseFloat(price) * parseFloat(stocks[i]['units'])
                stocks[i]['profits/loss'] = profitLoss.toFixed(2).toString()
                stocks[i]['value'] = value.toFixed(2).toString()
                stocks[i]['price'] = parseFloat(price).toFixed(2).toString()
                stocks[i]['high'] = high
                stocks[i]['low'] = low
                stocks[i]['volume'] = volume
                stocks[i]['change'] = change
                stocks[i]['changePercent'] = changePercent

                component.setState({
                    userStocks: stocks,
                })

                // Calculates the networth weight of each stock once all the 
                // stock information for the portfolio is set
                if (i === stocks.length - 1) {
                    component.calcWeight()
                }
            }).catch(error => {
                stocks[i]['profits/loss'] = 'X'
                stocks[i]['value'] = 'X'
                stocks[i]['price'] = 'X'
                stocks[i]['high'] = 'X'
                stocks[i]['low'] = 'X'
                stocks[i]['volume'] = 'X'
                stocks[i]['change'] = 'X'
                stocks[i]['changePercent'] = 'X'

                component.setState({
                    userStocks: stocks,
                })
                console.log(error)
            })
        }
    }

    /**
     * Calculates the networth weighting of each stock 
     */
    calcWeight = () => {
        let sum = 0
        let stocks = this.state.userStocks
        
        // Calculates the total networth of the portfolio
        for (let i = 0; i < stocks.length; i++) {
            sum += parseFloat(stocks[i]['value'])
        }

        // Calculates stock weight
        // individual stock weight = 100 * (stock individual value/sum)
        for (let i = 0; i < stocks.length; i++) {
            stocks[i]['weight'] = (100*(parseFloat(stocks[i]['value'])/sum)).toFixed(2).toString()
        }

        this.setState({
            userStocks: stocks
        })
    }

    /**
     * Updates the page when there is a change to the portfolio i.e. adding a stock
     */
    updateSession = () => {
        let stocks = getSessionCookie()['portfolios'][this.state.portfolioName]

        this.setState({
            userStocks: stocks,
            portfolioName: this.state.portfolioName,
            update: true
        })
    }

    /**
     * Lifecycle method to render the page
     * 
     * @return {html} The portfolio page HTML code
     */
    render = () => {
        // Checks if there state needs to be updated with the required information
        if (this.state.update === true) {
            this.setState({
                update: false
            })
            this.getInfo(this.state.userStocks)
        }

        return (
            <div>
                <h1>{this.state.titleName}</h1>
                <PortfolioOverview userStocks={this.state.userStocks}/>
                <br/>
                <PortfolioStockTable 
                    userStocks={this.state.userStocks} 
                    portfolioName={this.state.portfolioName} 
                    updateSession={this.updateSession}/>
                <NewStockFormButton 
                    updateSession={this.updateSession} 
                    portfolioName={this.state.portfolioName}/>
            </div>
        )
    }
}

export { PortfolioPage }
