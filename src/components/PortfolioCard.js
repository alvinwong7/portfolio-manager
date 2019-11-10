import React from 'react'
import { Card } from 'react-bootstrap'
import axios from 'axios'

class PortfolioCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : this.props.name,
            networth : 0,
            change : 0,
            changePercent : 0,
        }
    }

    evalNetworth = (stocks) => {
        // Access stock data from AlphaVantage API (5 calls per minute)
        const apiKey = 'W6WD0B30SYK3T2QI'
        for (let i = 0; i < stocks.length; i++) {
            let stockName = stocks[i]['code']
            console.log(stockName)
            let url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + stockName +
                        '&apikey=' + apiKey;
            axios
                .get(url)
                .then( response => {
                // Collect stock identifying information
                let data = response.data['Global Quote']
                // Collect stock price data
                console.log(data)
                let price = parseFloat(data['05. price'])
                let stockChange = parseFloat(data['09. change'])
                let c = this.state.change
                let n = this.state.networth
                c += stockChange * parseFloat(stocks[i]['units'])
                n += price * parseFloat(stocks[i]['units'])
                this.setState({
                    networth : n,
                    change : c
                })
                })
                .catch( error => {
                console.log(error);
            })
        }
    }

    render() {
        this.evalNetworth(this.props.stocks)
        console.log(this.state)
        let changePercent = 100 * this.state.change / (this.state.networth - this.state.change)
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{this.state.name}</Card.Title>
                    <Card.Text>
                        ${this.state.networth.toFixed(2).toString()} : ${this.state.change.toFixed(2).toString()} : {changePercent.toFixed(2).toString()}%
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export { PortfolioCard }
