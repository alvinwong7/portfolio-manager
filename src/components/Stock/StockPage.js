import React from 'react'

import { StockTable } from './StockTable'
import { StockPlot } from './StockPlot'

/** 
 * Class for the individual stock page
 * 
 * @class
 * @exports StockPage
*/
class StockPage extends React.Component {
    /**
     * Initialises the queried stock name in state
     * 
     * @constructor 
     */
    constructor(props) {
        super(props)
        this.state = {
            stockName: props.match.params.stockName,
        }
    }

    /**
     * Lifecycle method to handle reroutes to the same component
     */
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
                <StockPlot stockName={this.state.stockName} years={2.5}/>
            </div>
        )
    }
}

export { StockPage }
