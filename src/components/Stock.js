import React from 'react';
import axios from 'axios';

class Stock extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            Name: props.name,
            Open: '...',
            Close: '...',
            High: '...',
            Low: '...',
        };

        // Access stock data from AlphaVantage API (5 calls per minute)
        //const stockName = "MSFT";
        const key = 'W6WD0B30SYK3T2QI';    
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + props.name +
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

                // Collect historical stock data for plotting

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
            <div>
                <div className = "name">
                    {this.state.Name}
                </div>
                <div className = "open">
                    Open = ${this.state.Open}
                </div>
                <div className = "close">
                    Close = ${this.state.Close}
                </div>
                <div className = "high">
                    High = ${this.state.High}
                </div>
                <div className = "low">
                    Low = ${this.state.Low}
                </div>
            </div>
        );
    }

}

export { Stock };
