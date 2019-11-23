import React from 'react'
import { Table } from 'react-bootstrap'

import { PurchasedStock } from './PurchasedStock'

class PortfolioStockTable extends React.Component {
    constructor(props) {
        super(props);

        this.createTable = this.createTable.bind(this)
        this.state = {
            userStocks : this.props.userStocks,
        }
    }

    createTable = () => {
        let table = []
        let component = this

        let children = []

        let stocks = this.props.userStocks


        Object.keys(stocks).forEach(function(key) {
            children.push(<PurchasedStock userStocks={stocks[key]} key={key} name={key} portfolioName={component.props.portfolioName}updateSession={component.props.updateSession}/>)
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
