import React from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Stock.css';

import { Table } from 'react-bootstrap'

class Stock extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            Name:  props.name,
            Open:  '...',
            Close: '...',
            High:  '...',
            Low:   '...',
            HistDate: [],
            HistHigh: [],
            HistLow: [],
        };

        // Access stock data from AlphaVantage API
        const APIkey = '059YSIM0TS1VKHA0';
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol='
                    + props.name + '&apikey=' + APIkey;

        axios
            .get(url)
            .then( response => {

                // Collect stock identifying information
                let name = response.data['Meta Data']['2. Symbol'];

                // Collect stock price data
                let TimeSeries = response.data['Time Series (Daily)']
                let today = Object.keys(TimeSeries)[0];

                this.setState({
                    Name:  name,
                    Open:  TimeSeries[today]['1. open'],
                    Close: TimeSeries[today]['4. close'],
                    High:  TimeSeries[today]['2. high'],
                    Low:   TimeSeries[today]['3. low'],
                });

                // Collect historical stock data over previous three years
                for (var i = 0; i < 3*365 && i < Object.keys(TimeSeries).length; i++){

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

                <stockName className = "name">
                    {this.state.Name}
                </stockName>

                <br/>
                <br/>

                <table>
                    <tr>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Close</th>
                    </tr>
                    <tr>
                        <td>${this.state.Open}</td>
                        <td>${this.state.High}</td>
                        <td>${this.state.Low}</td>
                        <td>${this.state.Close}</td>
                    </tr>
                </table>

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
                            width: 800,
                            height: 450,
                            title: 'Price History',
                        }
                    }
                />

            </div>
        );
    }

}

export { Stock };
