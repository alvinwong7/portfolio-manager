import React from 'react'
import { GeneralStockRow } from './GeneralStockRow'

import { Table } from 'react-bootstrap'

// For portfolio
export default class BreakdownTable extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            stocks: props.stocks,
        }
    }

    createTable = () => {
        let table = []

        let children = []
        for (let i = 0; i < this.state.stocks.length; i++) {
            children.push(<GeneralStockRow stockName={this.state.stocks[i]}/>)
        }
        table.push(children)
        return table
    }

    render() {
        return (
            <Table>
                <thead>
                    <th>Code</th>
                    <th>Open</th>
                    <th>Close</th>
                    <th>High</th>
                    <th>Low</th>
                </thead>
                <tbody>
                    {this.createTable()}
                </tbody>
            </Table>
        )
    }
}

export { BreakdownTable }
