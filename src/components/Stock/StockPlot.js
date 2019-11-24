import React from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'

/**
 * Class for stock price graph
 */
class StockPlot extends React.Component{
    /**
     * Initialises data and gets stock price data
     * 
     * @constructor
     */
    constructor(props) {
        super(props)
        /** Moving average filter settings */
        const filterExtent = 20
        const filterTaps = 2 * filterExtent + 1

        this.getInfo = this.getInfo.bind(this)
        this.calcRisk = this.calcRisk.bind(this)

        this.state = {
            /** Name of stock */
            name: props.stockName,
            /** Period of graph */
            period: props.years,
            /** Moving average filter extent */
            filterExtent: filterExtent,
            /** Moving average filter coefficient */
            filterTaps: filterTaps,
            std: 0,
            /** Historical dates */
            histDate: [],
            /** Historical high at dates */
            histHigh: [],
            /** Historical low at dates */
            histLow: [],
            /** Average of high and low at dates */
            histAvg: [],
            /** Average of high and low filtered by a moving average filter */
            histMovAvg: [],
            /** Update flag to handle API */
            update: true,
        }
        
        this.getInfo()
    }

    /**
     * Lifecycle method to deal with component updates
     */
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            name: nextProps.stockName,
            period: nextProps.years,
            update: true
        })
        this.getInfo()
    }

    /**
     * Collects historical data from Alphavantage API
     */
    getInfo = () => {
        // Access stock data from AlphaVantage API (5 calls per minute)
        const key = '059YSIM0TS1VKHA0'
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol='
                    + this.state.name + '&apikey=' + key


        axios.get(url).then( response => {
            let timeSeries = response.data['Time Series (Daily)']
            let movAvg = 0

            let histDate = []
            let histHigh = []
            let histLow = []
            let histAvg = []
            let histMovAvg = []
            // Collect historical stock data over previous three years
            for (let i = 0; i < this.state.period*365 && i < Object.keys(timeSeries).length; i++) {

                let date = Object.keys(timeSeries)[i]
                let high = parseFloat(timeSeries[date]['2. high'])
                let low = parseFloat(timeSeries[date]['3. low'])
                let avg = 0.5 * (high + low)

                // Append historical date, high, low and average prices
                histDate.push(date)
                histHigh.push(high)
                histLow.push(low)
                histAvg.push(avg)

                // 
                if (i < this.state.filterTaps) {
                    movAvg += avg
                } else {
                    movAvg = movAvg - histAvg[i-this.state.filterTaps] + avg
                    histMovAvg.push(movAvg/this.state.filterTaps)
                }
            }
            this.setState({
                histDate: histDate,
                histHigh: histHigh,
                histLow: histLow,
                histAvg: histAvg,
                histMovAvg: histMovAvg,
                update: false
            })
            this.calcRisk()
            }).catch( error => {
                console.log(error)
            })
    }

    /** Calculates standard deviation for the past (len) days */
    calcRisk = () => {
        const len = 30
        let histAvgLen = this.state.histAvg.length
        let window = this.state.histAvg.slice(histAvgLen-len, histAvgLen)
        let avg = 0
        for (let i = 0; i < window.length; i++) {
            avg += window[i]
        }
        avg /= len
        
        let std = 0
        for (let i = 0; i < window.length; i++) {
            std += (window[i] - avg) * (window[i] - avg)
        }
        std /= len - 1
        std = Math.sqrt(std).toFixed(2)
        this.setState({
            std: std
        })
    }

    render = () => {
        if (this.state.update === true) {
            return (
                <div>
                <Plot 
                    layout={
                        {
                            width: 900,
                            height: 450,
                            title: 'Price history',
                        }
                    }/>
                </div>
            )
        }
        return (
            <div>
                {this.state.std}
                <br/>
                <Plot
                    data={[
                        {
                            x: this.state.histDate,
                            y: this.state.histHigh,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'High ($)',
                            marker: {color: 'green'},
                        },
                        {
                            x: this.state.histDate,
                            y: this.state.histLow,
                            type: 'scatter',
                            mode: 'lines',
                            name: 'Low ($)',
                            marker: {color: 'red'},
                        },
                        {
                            x: this.state.histDate.slice(this.state.filterTaps-this.state.filterExtent,this.state.histDate.length),
                            y: this.state.histMovAvg,
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
                            title: 'Price history',
                        }
                    }
                />
            </div>
        )
    }

}

export { StockPlot }