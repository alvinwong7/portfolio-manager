import React from 'react'
import { Table } from 'react-bootstrap'

import { StockSummary } from './StockSummary'


class StockTable extends React.Component {
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
                    {<StockSummary stockName={this.props.stockName} isWatchList={false}/>}
                </tbody>
            </Table>
        )
    }
}

export { StockTable }
