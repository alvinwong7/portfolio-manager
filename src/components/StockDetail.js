import React from 'react'

import { StockTable } from './StockTable'

class StockDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockName : [props.stockName],
        }
    }

    render() {
        return (
            <div>
                <StockTable stocks={this.state.stockName}/>
            </div>
        );
    }
}

export { StockDetail }
