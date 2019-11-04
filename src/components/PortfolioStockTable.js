import React from 'react'
import { Table } from 'react-bootstrap'

import { PurchasedStock } from './PurchasedStock'

class PortfolioStockTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userStocks : this.props.userStocks,
        }
    }

    createTable = () => {
        let table = []

        let children = []

        let stocks = this.state.userStocks

        
        Object.keys(stocks).forEach(function(key) {
            children.push(<PurchasedStock userStocks={stocks[key]} name={key}/>)
        });
        table.push(children)
        return table
    }

    render() {
        return (
            <Table>
                <thead>
                    <tr>
                    <th>Code</th>
                    <th>Price $</th>
                    <th>Profit/Loss</th>
                    <th>Units</th>
                    <th>Change (%)</th>
                    <th>Value ($)</th>
                    <th>Weight</th>
                    </tr>
                </thead>
                <tbody>
                    {this.createTable()}
                </tbody>
            </Table>
        )
    }
}

export { PortfolioStockTable }
