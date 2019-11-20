import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Nav, Button} from "react-bootstrap"


class StockSummary extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            name: '?',
            price: '?',
            open: '?',
            high: '?',
            low: '?',
            volume: '?',
            change: '?',
            changePercent: '?',
        }

        this.getInfo = this.getInfo.bind(this)
        this.getInfo()
    }

    getInfo = () => {
        // Access stock data from AlphaVantage API (5 calls per minute)
        const key = '059YSIM0TS1VKHA0'
        const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + this.props.stockName +
                    '&apikey=' + key

        axios
            .get(url)
            .then( response => {

                // Collect stock identifying information
                let data = response.data['Global Quote']

                // Collect stock price data

                this.setState({
                    name: data['01. symbol'],
                    price: data['05. price'],
                    open: data['02. open'],
                    high: data['03. high'],
                    low: data['04. low'],
                    volume: data['06. volume'],
                    change: data['09. change'],
                    changePercent: data['10. change percent'],
                })
            })
            .catch( error => {

                this.setState({
                    name: this.props.stockName,
                    price: 'X',
                    open: 'X',
                    high: 'X',
                    low: 'X',
                    volume: 'X',
                    change: 'X',
                    changePercent: 'X',
                })
                console.log(error)
            })

    }

    componentDidUpdate = (prevProps) => {
        if (this.props.stockName !== prevProps.stockName) {
            this.getInfo()
        }
    }

    handleClick = () => {

        this.props.delStock(this.state.name)
        this.props.forceUpdate()
    }


    render = () => {
        return(
            <tr>
                <td><Nav>
                <Nav.Link as={Link} to={"/stock/"+this.state.name}>{this.state.name}</Nav.Link>
                </Nav></td>
                <td>{this.state.price}</td>
                <td>{this.state.change}</td>
                <td>{this.state.changePercent}</td>
                <td>{this.state.open}</td>
                <td>{this.state.high}</td>
                <td>{this.state.low}</td>
                <td>{this.state.volume}</td>
                <td> <Button variant="danger" onClick={this.handleClick.bind(this)}>Delete</Button></td>
            </tr>
        )
    }


}

export { StockSummary }
