import React from 'react'

import { StockTable } from './StockTable'

class StockDetail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <StockTable stocks={this.props.stockName}/>
            </div>
        );
    }
}

export { StockDetail }
