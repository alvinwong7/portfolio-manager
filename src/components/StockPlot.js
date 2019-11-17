import React from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Stock.css';

class StockPlot extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            Name: props.stockName,
            Period: props.years,
            HistDate: [],
            HistHigh: [],
            HistLow: [],
        };


        // Access stock data from AlphaVantage API (5 calls per minute)
        const APIkey = '059YSIM0TS1VKHA0';
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol='
                    + this.state.Name + '&apikey=' + APIkey;

        axios
        .get(url)
        .then( response => {

            let TimeSeries = response.data['Time Series (Daily)']

            // Collect historical stock data over previous three years
            for (var i = 0; i < this.state.Period*365 && i < Object.keys(TimeSeries).length; i++){

                let date = Object.keys(TimeSeries)[i];
                let high = parseFloat(TimeSeries[date]['2. high']);
                let low = parseFloat(TimeSeries[date]['3. low']);

                // Append historical high and low prices
                this.setState({
                    HistDate: this.state.HistDate.concat(date),
                    HistHigh: this.state.HistHigh.concat(high),
                    HistLow: this.state.HistLow.concat(low),
                })
            }

        })
        .catch( error => {
            console.log(error);
        })
        
    }


    render(){
        return(
            <div>
                <br/>

                <Plot
                    data={[
                        {
                            x: this.state.HistDate,
                            y: this.state.HistHigh,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'High ($)',
                            marker: {color: 'green'},
                        },
                        {
                            x: this.state.HistDate,
                            y: this.state.HistLow,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'Low ($)',
                            marker: {color: 'red'},
                        },
                    ]}
                    layout={
                        {
                            width: 900,
                            height: 450,
                            title: 'Price History',
                        }
                    }
                />

            </div>
        );
    }

}

export { StockPlot }