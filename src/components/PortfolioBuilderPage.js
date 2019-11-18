import React from 'react'
import axios from 'axios'

import { CardDeck } from 'react-bootstrap'
import { getSessionCookie } from './Session'
import { PortfolioCard } from './PortfolioCard'
import { NewPortfolioForm } from './NewPortfolioForm'

class PortfolioBuilderPage extends React.Component {
    constructor(props) {
        super(props)

        let portfolios = getSessionCookie()["portfolios"]

        // Initialise portfolioInfo with networth and change
        let tmp = []
        Object.keys(portfolios).forEach(function(key) {
            tmp[key] = []
            tmp[key]['networth'] = 0
            tmp[key]['change'] = 0
            tmp[key]['updated'] = false
        })

        this.state = {
            userPortfolios : portfolios,
            portfolioInfo : tmp
        }
        this.updateSession = this.updateSession.bind(this)
        this.checkExists = this.checkExists.bind(this)
        this.evalNetworth = this.evalNetworth.bind(this)
        this.updated = this.updated.bind(this)

    }

    componentDidMount() {
        let portfolios = this.state.userPortfolios
        let component = this
        Object.keys(portfolios).forEach(function(key) {
            component.evalNetworth(portfolios[key], key)
        })
    }

    evalNetworth = (stocks, name) => {
        // Access stock data from AlphaVantage API (5 calls per minute)
        const apiKey = '059YSIM0TS1VKHA0'
        let component = this
        if (stocks.length == 0) {
            let info = this.state.portfolioInfo
            info[name]['updated'] = true
            this.setState({
                portfolioInfo : info
            })
        }
        for (let i = 0; i < stocks.length; i++) {
            let stockName = stocks[i]['code']
            let url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + stockName +
                        '&apikey=' + apiKey;
            axios
                .get(url)
                .then( response => {
                // Collect stock identifying information
                let data = response.data['Global Quote']
                // Collect stock price data
                let info = component.state.portfolioInfo
                info[name]['networth'] += parseFloat(data['05. price']) * parseFloat(stocks[i]['units'])
                info[name]['change'] += parseFloat(data['09. change']) * parseFloat(stocks[i]['units'])
                if (i == stocks.length - 1) {
                    info[name]['updated'] = true
                }
                component.setState({
                    portfolioInfo : info
                })
                })
                .catch( error => {
                let info = component.state.portfolioInfo
                info[name]['updated'] = true
                this.setState({
                    portfolioInfo : info
                })
                console.log(error);
            })
        }
    }

    createCards = () => {
        let cards = []
        let children = []

        let portfolios = this.state.portfolioInfo
        let component = this
        Object.keys(portfolios).forEach(function(key) {
            if (key != 'default') {
                children.push(<div style={{"width" : 235}}><PortfolioCard name={key} 
                    networth={portfolios[key]['networth']} 
                    change={portfolios[key]['change']} 
                    updateSession={component.updateSession}
                    checkExists={component.checkExists}/>
                    <br/><br/></div>)
            }
        });
    
        cards.push(children)
        return cards
    }

    updateSession = (name, basePortfolio, operation) => {
        // Check if name exists in userPortfolios
            // If exists --> delete
            // If does not exist --> add
        let portfolios = this.state.userPortfolios
        let info = this.state.portfolioInfo
        if (operation == 'rename') {
            if (portfolios[name].length != 0) {
                portfolios[basePortfolio] = portfolios[name]
            } else {
                portfolios[basePortfolio] = []
            }
            info[basePortfolio] = info[name]
            delete info[name]
            delete portfolios[name]
        } else if (operation == 'delete') {
            delete portfolios[name]
            delete info[name]
        } else if (operation == 'add') {
            info[name] = []
            info[name]['networth'] = 0
            info[name]['change'] = 0

            if (basePortfolio != 'None') {
                info[name]['updated'] = false
                portfolios[name] = portfolios[basePortfolio]
            } else {
                info[name]['updated'] = true
                portfolios[name] = []
            }
        }
        this.setState({
            userPortfolios : portfolios,
            portfolioInfo : info
        })
        if (operation == 'add' && basePortfolio != 'None') {
            this.evalNetworth(portfolios[name], name)
        }
    }

    checkExists = (name) => {
        let portfolios = this.state.userPortfolios

        if (name in portfolios) {
            return true
        }
        return false
    }

    updated() {
        let ret = true
        let info = this.state.portfolioInfo
        Object.keys(info).forEach(function(key) {
            if (info[key]['updated'] == false) {
                ret = false
            }
        })
        return ret
    }

    render() {
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
                <NewPortfolioForm updateSession={this.updateSession}/>
                <br/>
                <br/>
                <CardDeck>
                    {this.createCards()}
                </CardDeck>
            </div>
        );
    }
}

export { PortfolioBuilderPage }
