import React from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import equal from 'fast-deep-equal'

class PortfolioPlot extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            userStocks: this.props.userStocks,
            period:     this.props.years,
            history:    {},
        };
        
        this.getInfo = this.getInfo.bind(this)
        this.getInfo(this.state.userStocks)
    }

    componentDidUpdate(prevProps){
        if (!equal(this.props.userStocks, prevProps.userStocks)) {
            let stocks = this.props.userStocks;
            this.getInfo(stocks)
        }
    }

    getInfo = (stocks) => {
        // For all stocks in portfolio, retrieve time series price data
        let component = this
        Object.keys(stocks).forEach(function(key) {

            let name = stocks[key]['code'];
            let startDate = new Date(stocks[key]['date']);
            let units = stocks[key]['units'];

            // Access stock data from AlphaVantage API
            const APIkey = '059YSIM0TS1VKHA0';
            const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol='
                        + name + '&apikey=' + APIkey;
            
            axios.get(url).then( response => {

                let timeSeries = response.data['Time Series (Daily)']

                // Duplicate dictionary of previous historical data
                let hist = JSON.parse(JSON.stringify(component.state.history));

                // Collect historical stock data over supplied time period
                for (var i = 0; i < component.props.years*365 && i < Object.keys(timeSeries).length; i++){

                    let iDate = Object.keys(timeSeries)[i];
                    let price = parseFloat(timeSeries[iDate]['4. close']);

                    // Stop data collection for dates earlier than time of stock aquisition
                    let currentDate = new Date(iDate);
                    if (currentDate.getTime() < startDate.getTime()) {
                        break;
                    }
                    
                    // Add price to portfolio history
                    if (iDate in component.state.history) {
                        hist[iDate] += units*price;
                    } else {
                        hist[iDate] = units*price;
                    }
                }

                // Replace old history with new history dictionary
                component.setState({
                        history: hist,
                })

            })
            .catch( error => {
                console.log(error);
            })
        });
    }

    render(){
        return(
            <div>
                <br/>
                <Plot
                    data={[
                        {
                            x: Object.keys(this.state.history),
                            y: Object.values(this.state.history),
                            type: 'scatter',
                            mode: 'lines',
                            name: 'High ($)',
                            marker: {color: 'green'},
                            fill: 'tozeroy',
                        },
                    ]}
                    layout={
                        {
                            width: 850,
                            height: 450,
                            title: 'Historical Portfolio Performance',
                        }
                    }
                />
            </div>
        );
    }

}

export { PortfolioPlot }