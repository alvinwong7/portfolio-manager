import React from 'react'
import axios from 'axios'

class StockSummary extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            name: '?',
            price: '?',
            open: '?',
            high: '?',
            low: '?',
            volume: '?',
            change: '?',
            changePercent: '?',
        };

        // Access stock data from AlphaVantage API (5 calls per minute)
        const key = 'W6WD0B30SYK3T2QI';    
        const url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + props.stockName +
                    '&apikey=' + key;

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
                });
            })
            .catch( error => {
                console.log(error);
            })

    }

    render(){
        return(
            <tr>
                <td>{this.state.name}</td>
                <td>{this.state.price}</td>
                <td>{this.state.change}</td>
                <td>{this.state.changePercent}</td>
                <td>{this.state.open}</td>
                <td>{this.state.high}</td>
                <td>{this.state.low}</td>
                <td>{this.state.volume}</td>
            </tr>
        );
    }

    /*constructor(props) {
        this.state = {
            stock : props.stockName
        }
    }
    
    render() {
        return(
            <div>
                <h1>{this.state.stock}</h1>
                <StockTable stocks={this.state.stock}/>
            </div>
        )
    }*/
}

export { StockSummary }