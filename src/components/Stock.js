import React from 'react';
import axios from 'axios';

import { Table } from 'react-bootstrap'

class Stock extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            Name: '?',
            Open: '?',
            Close: '?',
            High: '?',
            Low: '?',
        };

        // Access stock data from AlphaVantage API (5 calls per minute)
        const key = 'W6WD0B30SYK3T2QI';    
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + props.stockName +
                    '&apikey=' + key;

        axios
            .get(url)
            .then( response => {

                // Collect stock identifying information
                let name = response.data['Meta Data']['2. Symbol'];

                // Collect stock price data
                let TimeSeries = response.data['Time Series (Daily)']
                let today = Object.keys(TimeSeries)[0];
                let open = TimeSeries[today]['1. open'];
                let close = TimeSeries[today]['4. close'];
                let high = TimeSeries[today]['2. high'];
                let low = TimeSeries[today]['3. low'];

                this.setState({
                    Name: name,
                    Open: open,
                    Close: close,
                    High: high,
                    Low: low,
                });
            })
            .catch( error => {
                console.log(error);
            })

    }

    render(){
        return(
            <tr>
                <td>{this.state.Name}</td>
                <td>{this.state.Open}</td>
                <td>{this.state.Close}</td>
                <td>{this.state.High}</td>
                <td>{this.state.Low}</td>
            </tr>
        );
    }

}

export { Stock };
