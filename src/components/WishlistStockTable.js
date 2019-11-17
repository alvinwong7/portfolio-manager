import React from 'react'
import { Table } from 'react-bootstrap'
import { deleteWatchlistStock } from './UserData'
import { StockSummary } from './WishlistStockSummary'

class StockTable extends React.Component {
    constructor(props) {
        super(props);
        this.delStock = this.delStock.bind(this)
    }

    createTable = (context) => {
        let table = []

        let children = []

        for (let i = 0; i < this.props.stocks.length; i++) {
            children.push(<StockSummary stockName={this.props.stocks[i]} key = {i} forceUpdate = {context.props.forceUpdate} delStock= {context.delStock}/>)

        }
        table.push(children)
        return table
    }


    delStock(code){
        deleteWatchlistStock(this.props.name, code)
    }

    render() {
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
                    {this.createTable(this)}
                </tbody>
            </Table>
        )
    }
}

export { StockTable }
