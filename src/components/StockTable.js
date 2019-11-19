import React from 'react'
import { Table } from 'react-bootstrap'

import { StockSummary } from './StockSummary'

class StockTable extends React.Component {
    createTable = () => {
        let table = []

        for (let i = 0; i < this.props.stocks.length; i++) {
            table.push(<StockSummary stockName={this.props.stocks[i]} key = {i}/>)
        }

        return table
    }

    render = () => {
        return (
            <Table>
                <thead>
                    <tr>
                    <th>Code</th>
                    <th>Price $</th>
                    <th>Change $</th>
                    <th>Change %</th>
                    <th>Open $</th>
                    <th>High $</th>
                    <th>Low $</th>
                    <th>Volume </th>
                    </tr>
                </thead>
                <tbody>
                    {this.createTable()}
                </tbody>
            </Table>
        )
    }
}

export { StockTable }
