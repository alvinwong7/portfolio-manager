import React from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';

class PortfolioPlot extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            UserStocks : this.props.userStocks,
            Period :     this.props.years,
            History :    {},
        };

        let stocks = this.state.UserStocks;
        let component = this;

        // For all stocks in portfolio, retrieve time series price data
        Object.keys(stocks).forEach(function(key) {

            let name = stocks[key]['code'];
            let startDate = new Date(stocks[key]['date']);
            let units = stocks[key]['units'];

            // Access stock data from AlphaVantage API
            const APIkey = '059YSIM0TS1VKHA0';
            const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol='
                        + name + '&apikey=' + APIkey;
            
            axios
            .get(url)
            .then( response => {

                let TimeSeries = response.data['Time Series (Daily)']

                // Duplicate dictionary of previous historical data
                let Hist = JSON.parse(JSON.stringify(component.state.History));

                // Collect historical stock data over supplied time period
                for (var i = 0; i < props.years*365 && i < Object.keys(TimeSeries).length; i++){

                    let iDate = Object.keys(TimeSeries)[i];
                    let price = parseFloat(TimeSeries[iDate]['4. close']);

                    // Stop data collection for dates earlier than time of stock aquisition
                    let currentDate = new Date(iDate);
                    if(currentDate.getTime() < startDate.getTime()){
                        break;
                    }
                    
                    // Add price to portfolio history
                    if(iDate in component.state.History){
                        Hist[iDate] += units*price;
                    } else {
                        Hist[iDate] = units*price;
                    }
                }

                // Replace old history with new history dictionary
                component.setState({
                        History: Hist,
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
                            x: Object.keys(this.state.History),
                            y: Object.values(this.state.History),
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