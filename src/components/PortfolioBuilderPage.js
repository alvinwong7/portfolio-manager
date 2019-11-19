import React from 'react'
import axios from 'axios'

import { CardDeck } from 'react-bootstrap'
import { getSessionCookie } from './Session'
import { PortfolioCard } from './PortfolioCard'
import { NewPortfolioForm } from './NewPortfolioForm'

/** 
 * Class page for the portfolio builder 
 * 
 * @class
 * @exports PortfolioBuilderPage
*/
class PortfolioBuilderPage extends React.Component {
    /**
     * Initialises the users selected potential portfolios and
     * important information for displaying i.e. networth and change.
     * Binds methods to this component
     * 
     * @constructor
     */
    constructor() {
        super()
        // Initialise portfolioInfo with networth, change and updated
        let portfolios = getSessionCookie()["portfolios"]
        let info = []
        Object.keys(portfolios).forEach(function(name) {
            info[name] = []
            info[name]['networth'] = 0
            info[name]['change'] = 0
            info[name]['updated'] = false
        })

        this.state = {
            /** 
             * Dictionary of user portfolios excluding their actual portfolio 
             * containing a list of stocks
             */
            userPortfolios: portfolios,
            /** 
             * Dictionary of user portfolios containing information for display, 
             * namely, networth, change, and updated.
             * 
             * networth:    total value of portfolio
             * change:      total change in networth today
             * updated:     flag to check that networth and change calculations 
             *              have been completed
             */
            portfolioInfo: info
        }

        this.addPortfolio = this.addPortfolio.bind(this)
        this.deletePortfolio = this.deletePortfolio.bind(this)
        this.renamePortfolio = this.renamePortfolio.bind(this)
        this.checkExists = this.checkExists.bind(this)
        this.evalNetworth = this.evalNetworth.bind(this)
        this.updated = this.updated.bind(this)
    }

    /**
     * Lifecycle method to calculate information for display 
     * upon component mount
     * 
     * @see evalNetworth for more details
     */
    componentDidMount = () => {
        let portfolios = this.state.userPortfolios
        let component = this
        Object.keys(portfolios).forEach(function(name) {
            component.evalNetworth(name, portfolios[name])
        })
    }

    /**
     * Evaluates the total networth and todays change of the portfolio
     * 
     * @param {string} name Name of the portfolio
     * @param {dictionary} stocks list of stocks in the portfolio
     */
    evalNetworth = (name, stocks) => {
        // Access stock data from AlphaVantage API
        const apiKey = '059YSIM0TS1VKHA0'

        // Initialises portfolioInfo for empty portfolios
        if (stocks.length === 0) {
            let info = this.state.portfolioInfo
            info[name]['updated'] = true
            this.setState({
                portfolioInfo: info
            })
        }

        // Iterates through each stock and queries the api for their price and 
        // change to calculate the total networth and change of the portfolio
        let component = this
        for (let i = 0; i < stocks.length; i++) {
            let stockName = stocks[i]['code']
            let url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' 
                        + stockName + '&apikey=' + apiKey

            axios.get(url).then( response => {
                // Add stocks contribution to networth and change
                let data = response.data['Global Quote']
                let info = component.state.portfolioInfo
                // portfolio networth += stock price * units owned
                info[name]['networth'] += parseFloat(data['05. price']) * parseFloat(stocks[i]['units'])
                // portfolio change += stock change * units owned
                info[name]['change'] += parseFloat(data['09. change']) * parseFloat(stocks[i]['units'])

                // Sets updated to true to indicate the portfolio has been 
                // updated with the required information
                if (i === stocks.length - 1) {
                    info[name]['updated'] = true
                }

                component.setState({
                    portfolioInfo: info
                })
                })
            .catch(error => {
                // Catches error if stock is not found or ran out of api calls
                // Sets updated to true to allow the component to still render
                let info = component.state.portfolioInfo
                info[name]['updated'] = true
                this.setState({
                    portfolioInfo: info
                })
            })
        }
    }

    /**
     * Creates cards for each portfolio
     * 
     * @return {html} html for cards in the render function
     */
    createCards = () => {
        let cardDeck = []
        let portfolios = this.state.portfolioInfo
        let component = this

        // Iterate through each portfolio (except the users actual portfolio)
        // and create a card that displays the calculated information
        Object.keys(portfolios).forEach(function(key) {
            if (key !== 'default') {
                cardDeck.push(<div style={{"width":235}}>
                            <PortfolioCard name={key} 
                            networth={portfolios[key]['networth']} 
                            change={portfolios[key]['change']} 
                            renamePortfolio={component.renamePortfolio}
                            deletePortfolio={component.deletePortfolio}
                            checkExists={component.checkExists}/>
                            <br/><br/></div>)
            }
        })

        return cardDeck
    }

    /**
     * Adds a portfolio to userPortfolios to be rendered as a card on this
     * page
     * 
     * @param {string} name Name of the portfolio to add
     * @param {string} basePortfolio Name of the portfolio that the new 
     * portfolio is based on (default to None) @see NewPortfolioForm
     */
    addPortfolio = (name, basePortfolio) => {
        let portfolios = this.state.userPortfolios
        let info = this.state.portfolioInfo
        info[name] = []

        // If the provided base portfolio exists i.e. not None, set portfolio 
        // information to be not updated and set the stocks to be the same as 
        // the base portfolio
        if (basePortfolio !== 'None') {
            info[name] = info[basePortfolio]
            portfolios[name] = portfolios[basePortfolio]
        } else {
            info[name]['networth'] = 0
            info[name]['change'] = 0
            info[name]['updated'] = true
            portfolios[name] = []
        }

        this.setState({
            userPortfolios: portfolios,
            portfolioInfo: info
        })
    }

    /**
     * Deletes a specified portfolio resulting in its card being removed
     * 
     * @param {string} name Name of the portfolio to delete
     */
    deletePortfolio = (name) => {
        let portfolios = this.state.userPortfolios
        let info = this.state.portfolioInfo

        delete portfolios[name]
        delete info[name]

        this.setState({
            userPortfolios: portfolios,
            portfolioInfo: info
        })
    }

    /**
     * Renames a portfolio by copying it and adding it under a new name
     * and removes the portfolio under the previous name
     * 
     * @param {string} name Name of the current portfolio to be renamed
     * @param {string} newName The new name of the portfolio specified by name
     */
    renamePortfolio = (name, newName) => {
        let portfolios = this.state.userPortfolios
        let info = this.state.portfolioInfo

        // Check if stocks of portfolio is empty to prevent setting the stocks
        // to an undefined value
        if (portfolios[name].length !== 0) {
            portfolios[newName] = portfolios[name]
        } else {
            portfolios[newName] = []
        }

        info[newName] = info[name]
        delete info[name]
        delete portfolios[name]

        this.setState({
            userPortfolios: portfolios,
            portfolioInfo: info
        })
    }

    /**
     * Checks if portfolio name already exists. This is used in @see PortfolioCard 
     * to check if a portfolio already exists
     */
    checkExists = (name) => {
        let portfolios = this.state.userPortfolios

        if (name in portfolios) {
            return true
        }
        return false
    }

    /**
     * Checks if all the portfolios have been updated with the required information 
     * from @see evalNetworth When they are all 'updated' it allows for a rerender in 
     * @see render
     * 
     * @return {bool} If all portfolios have been updated with the required information
     */
    updated = () => {
        let ret = true
        let info = this.state.portfolioInfo

        // Iterate through each stock checking that it has been updated
        Object.keys(info).forEach(function(key) {
            if (info[key]['updated'] === false) {
                ret = false
            }
        })
        return ret
    }

    /**
     * Lifecycle method to render the page
     * 
     * @return {html} The portfolio builder page HTML code
     */
    render = () => {
        // Does not render portfolio cards unless they have all been updated
        if (!this.updated()) {
            return (
                <div>
                    <h1>Portfolio Builder</h1>
                    <br/>
                    Loading...
                </div>
            )
        }

        return (
            <div>
                <h1>Portfolio Builder</h1>
                <NewPortfolioForm addPortfolio={this.addPortfolio}/>
                <br/>
                <br/>
                <CardDeck>
                    {this.createCards()}
                </CardDeck>
            </div>
        )
    }
}

export { PortfolioBuilderPage }
