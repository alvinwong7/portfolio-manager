import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Nav, Button} from 'react-bootstrap'

/** 
 * Class for a table row summary of stock information
 * 
 * @class
 * @exports StockSummary
*/
class StockSummary extends React.Component {
    /**
     * Initialises row information
     * 
     * @constructor
     */
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
            isWatchlist: props.isWatchlist
        }

        this.getInfo = this.getInfo.bind(this)
        this.getInfo()
    }

    /**
     * Retrieves information about the stock from AlphaVantage API
     */
    getInfo = () => {
        // Access stock data from AlphaVantage API (5 calls per minute)
        const key = '059YSIM0TS1VKHA0'
        const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + this.props.stockName +
                    '&apikey=' + key

        axios.get(url).then( response => {
                // Collect stock identifying information
                let data = response.data['Global Quote']


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

    /**
     * Lifecycle method to deal with table updates
     */
    componentDidUpdate = (prevProps) => {
        if (this.props.stockName !== prevProps.stockName) {
            this.getInfo()
        }
    }

    /**
     * Deletes stock row and forces page update
     */
    handleClick = () => {
        this.props.delStock(this.state.name)
        this.props.forceUpdate()
    }

    render = () => {
        let name = this.state.name
        let button = null
        if (this.state.isWatchlist) {
            name = <Nav>
                    <Nav.Link as={Link} to={"/stock/"+this.state.name}>{this.state.name}</Nav.Link>
                    </Nav>
            button = <td><Button variant="danger" onClick={this.handleClick.bind(this)}>Delete</Button></td>
        }
        return(
            <tr>
                <td>{name}</td>
                <td>{this.state.price}</td>
                <td>{this.state.change}</td>
                <td>{this.state.changePercent}</td>
                <td>{this.state.open}</td>
                <td>{this.state.high}</td>
                <td>{this.state.low}</td>
                <td>{this.state.volume}</td>
                {button}
            </tr>
        )
    }
}

export { StockSummary }
