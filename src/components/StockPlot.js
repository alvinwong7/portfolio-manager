import React from 'react'
import Plot from 'react-plotly.js'
import axios from 'axios'

import './Stock.css'

class StockPlot extends React.Component{

    constructor(props){
        super(props)
        const filterExtent = 20
        const filterTaps = 2 * filterExtent + 1

        this.state = {
            name: props.stockName,
            period: props.years,
            filterExtent: filterExtent,
            filterTaps: filterTaps,
            histDate: [],
            histHigh: [],
            histLow: [],
            histAvg: [],
            histMovAvg: [],
            update: true,
        }
        
        this.getInfo = this.getInfo.bind(this)
        this.getInfo()
    }

    UNSAFE_componentWillReceiveProps = (nextProps) => {
        this.setState({
            name: nextProps.stockName,
            period: nextProps.years,
            update: true
        })
        this.getInfo()
    }

    getInfo = () => {
        // Access stock data from AlphaVantage API (5 calls per minute)
        const key = '059YSIM0TS1VKHA0'
        const url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&outputsize=full&symbol='
                    + this.state.name + '&apikey=' + key


        axios.get(url).then( response => {
            let TimeSeries = response.data['Time Series (Daily)']
            let movAvg = 0

            let histDate = []
            let histHigh = []
            let histLow = []
            let histAvg = []
            let histMovAvg = []
            // Collect historical stock data over previous three years
            for (let i = 0; i < this.state.period*365 && i < Object.keys(TimeSeries).length; i++) {

                let date = Object.keys(TimeSeries)[i]
                let high = parseFloat(TimeSeries[date]['2. high'])
                let low = parseFloat(TimeSeries[date]['3. low'])
                let avg = 0.5 * (high + low)
                // Append historical high and low prices
                histDate.push(date)
                histHigh.push(high)
                histLow.push(low)
                histAvg.push(avg)

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
            }).catch( error => {
                console.log(error)
            })
    }


    render = () => {
        console.log(this.state)
        if (this.state.update === true) {
            return (
                <div></div>
            )
        }
        return (
            <div>
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