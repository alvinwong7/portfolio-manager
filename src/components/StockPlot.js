import React from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import './Stock.css';

class StockPlot extends React.Component{

    constructor(props){
        super(props);
        const filterExtent = 20
        const filterTaps = 2 * filterExtent + 1

        this.state = {
            Name: props.stockName,
            Period: props.years,
            filterExtent: filterExtent,
            filterTaps: filterTaps,
            HistDate: [],
            HistHigh: [],
            HistLow: [],
            HistAvg: [],
            HistMovAvg: [],
        };


        // Access stock data from AlphaVantage API (5 calls per minute)
        const APIkey = '059YSIM0TS1VKHA0';
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol='
                    + this.state.Name + '&apikey=' + APIkey;

        axios
        .get(url)
        .then( response => {

            let TimeSeries = response.data['Time Series (Daily)']
            let movAvg = 0

            // Collect historical stock data over previous three years
            for (var i = 0; i < this.state.Period*365 && i < Object.keys(TimeSeries).length; i++){

                let date = Object.keys(TimeSeries)[i];
                let high = parseFloat(TimeSeries[date]['2. high']);
                let low = parseFloat(TimeSeries[date]['3. low']);
                let avg = 0.5 * (high + low)

                // Append historical high and low prices
                this.setState({
                    HistDate: this.state.HistDate.concat(date),
                    HistHigh: this.state.HistHigh.concat(high),
                    HistLow: this.state.HistLow.concat(low),
                    HistAvg: this.state.HistAvg.concat(avg)
                })

                if (i < this.state.filterTaps) {
                    movAvg += avg
                } else {
                    movAvg = movAvg - this.state.HistAvg[i-this.state.filterTaps] + avg
                    this.setState({
                        HistMovAvg : this.state.HistMovAvg.concat(movAvg/filterTaps),
                    })
                }

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
                        {
                            x: this.state.HistDate.slice(this.state.filterTaps-this.state.filterExtent,this.state.HistDate.length),
                            y: this.state.HistMovAvg,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'Trendline',
                            marker: {color: 'blue'}
                        }
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