import React from 'react'
import axios from 'axios'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Nav, Button } from "react-bootstrap"

import { deletePortfolio } from './UserData'


class PortfolioCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : this.props.name,
            networth : 0,
            change : '$0.00',
            changePercent : 0,
        }
    }

    evalNetworth = (stocks) => {
        // Access stock data from AlphaVantage API (5 calls per minute)
        const apiKey = 'W6WD0B30SYK3T2QI'
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
                let price = parseFloat(data['05. price'])
                let stockChange = parseFloat(data['09. change'])
                let c = this.state.change
                c += stockChange * parseFloat(stocks[i]['units'])
                let n = this.state.networth
                let nstr = ''
                let neg = '-$'
                let pos = '$'
                if (c < 0) {
                    c = -1 * c
                    nstr = neg.concat(c.toFixed(2).toString())
                } else {
                    nstr = pos.concat(c.toFixed(2).toString())
                }
                n += price * parseFloat(stocks[i]['units'])
                this.setState({
                    networth : n,
                    change : nstr
                })
                })
                .catch( error => {
                console.log(error);
            })
        }
    }

    handleClick() {
        deletePortfolio(this.state.name)
        this.props.updateSession(this.state.name)
    }

    render() {
        this.evalNetworth(this.props.stocks)
        let changePercent = 100 * this.state.change / (this.state.networth - this.state.change)
        return (
            <Card>
                <Card.Body>
                    <Card.Title><Nav>
                <Nav.Link as={Link} to={"/builder/"+this.state.name}>{this.state.name}</Nav.Link>
                </Nav></Card.Title>
                    <Card.Text>
                        ${this.state.networth.toFixed(2).toString()} : {this.state.change} : {changePercent.toFixed(2).toString()}%
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                <Button variant="danger" onClick={this.handleClick.bind(this)}>Delete</Button>
                </Card.Footer>
            </Card>
        );
    }
}

export { PortfolioCard }
