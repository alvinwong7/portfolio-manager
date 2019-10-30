import React from 'react'
import equal from 'fast-deep-equal'
import { StockDetail } from './StockDetail'

// Stock page
class StockPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            stockName : props.match.params.stockName,
        }
    }

    static getDerivedStateFromProps(props, state){

        return {
            stockName : props.match.params.stockName,
        }
    }

    render() {
        return(
            <div>
                <h1>{this.state.stockName}</h1>
                <StockDetail stockName={[this.state.stockName]}/>
            </div>
        )
    }
}

export { StockPage }
