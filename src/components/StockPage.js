import React from 'react'

import { StockTable } from './StockTable'
import { StockPlot } from './StockPlot'

// Stock page
class StockPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stockName: props.match.params.stockName,
        }
    }

    static getDerivedStateFromProps(props, state){
        return {
            stockName: props.match.params.stockName,
        }
    }

    render = () => {
        return(
            <div>
                <h1>{this.state.stockName}</h1>
                <StockTable stockName={[this.state.stockName]}/>
                <StockPlot stockName={this.state.stockName} years={3}/>
            </div>
        )
    }
}

export { StockPage }
