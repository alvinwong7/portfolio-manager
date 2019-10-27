import React from 'react'
import { Stock } from './Stock'

import { Table } from 'react-bootstrap'

export default class StockTable extends React.Component {
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
            children.push(<Stock stockName={this.state.stocks[i]}/>)
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

export { StockTable }
