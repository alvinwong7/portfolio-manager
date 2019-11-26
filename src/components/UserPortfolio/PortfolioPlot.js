import React from 'react'
import axios from 'axios'
import Plot from 'react-plotly.js'
import equal from 'fast-deep-equal'
import { create, all } from 'mathjs'

/**
 * Class for historical portfolio value graph
 * 
 * @class
 * @exports PortfolioPlot
 */
class PortfolioPlot extends React.Component {
    /**
     * Initialises portfolio stocks, years on graphs and gathers information
     * 
     * @constructor
     */
    constructor(props) {
        super(props);

        let userStocks = this.props.userStocks

        this.state = {
            /** List of the portfolios stocks */
            userStocks: userStocks,
            /** Time period on graph */
            period:     this.props.years,
            /** Portfolio networth history */
            history:    {},
        };
        
        this.getInfo = this.getInfo.bind(this)
        this.calcRisk = this.calcRisk.bind(this)
        this.getInfo(this.state.userStocks)
    }

    /**
     * Lifecycle method to deal with updating portfolio stocks
     */
    componentDidUpdate = (prevProps) => {
        if (!equal(this.props.userStocks, prevProps.userStocks)) {
            let stocks = this.props.userStocks;
            this.setState({
                userStocks: stocks,
                history: {}
            })
            this.getInfo(stocks)
        }
    }

    /**
     * Gets daily information about stock from Alphavantage and calculates 
     * portfolio networth over time
     * 
     * @param {list} stocks List of stocks in the portfolio
     */
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
                for (let i = 0; i < component.props.years*365 && i < Object.keys(timeSeries).length; i++){

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

    /**
     * Calculates standard deviation
     * 
     * @deprecated The functionality this code is used for has not been 
     * verified for correctness
     */
    calcStd = (std, timeSeries) => {
        // Calculate standard deviation of stock
        let duration = Object.keys(timeSeries).length
        const len = 61
        let avg = 0
        let window = []
        for (let i = duration - len; i < duration; i++) {
            key = Object.keys(timeSeries)[i]
            let price = parseFloat(timeSeries[key]['4. close'])
            window[i - (duration - len)] = price
            avg += price
        }
        avg /= len
        
        let std = component.state.std
        for (let i = 0; i < window.length; i++) {
            std[name] += (window[i] - avg) * (window[i] - avg)
        }
        std[name] /= len - 1
        std[name] = Math.sqrt(std[name])
    }

    /**
     * Calculates portfolio risk
     * 
     * @deprecated Has not been verified if it is correct
     */
    calcRisk = (std, component) => {
        // Check that all std for all stocks have been found
        let check = true
        Object.keys(std).forEach(function(key){
            if (std[key] === 0) {
                check = false
            }
        })
        console.log(check)
        // Matrix multiplication of weight vector * std matrix * weight vector
        let risk = 0.00
        if (check) {
            // Form weight vector
            const config = { }
            const math = create(all, config)
            const weight = math.matrix()
            for (let i = 0; i < component.state.userStocks.length; i++) {
                let w = component.state.userStocks[i]['weight']
                if (isNaN(w)) {
                    w = 0
                }
                weight.subset(math.index(i), w)
            }

            // Form std matrix
            const risk_std = math.matrix()
            for (let i = 0; i < component.state.userStocks.length; i++) {
                let n1 = component.state.userStocks[i]['code']
                let w1 = std[n1]
                if (isNaN(w1)) {
                    w1 = 0
                }
                for (let j = 0; j < component.state.userStocks.length; j++) {
                    let n2 = component.state.userStocks[j]['code']
                    let w2 = std[n2]
                    if (isNaN(w2)) {
                        w2 = 0
                    }
                    risk_std.subset(math.index(i,j), w1 * w2)
                }
            }

            // Multiply for variance
            let tmp = math.multiply(weight, risk_std)
            risk = math.multiply(tmp, weight)
        }
        return risk
    }

    render = () => {
        return(
            <div>
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