import React from 'react'
import { Table } from 'react-bootstrap'

import { StockSummary } from './StockSummary'

class StockTable extends React.Component {
    constructor(props) {
        super(props);
    }

    createTable = () => {
        let table = []

        let children = []
        
        for (let i = 0; i < this.props.stocks.length; i++) {
            children.push(<StockSummary stockName={this.props.stocks[i]}/>)

        }
        table.push(children)
        return table
    }

    render() {
        return (
            <Table>
                <thead>
                    <th>Code</th>
                    <th>Price $</th>
                    <th>Change $</th>
                    <th>Change %</th>
                    <th>Open $</th>
                    <th>High $</th>
                    <th>Low $</th>
                    <th>Volume </th>
                </thead>
                <tbody>
                    {this.createTable()}
                </tbody>
            </Table>
        )
    }
}

export { StockTable }
