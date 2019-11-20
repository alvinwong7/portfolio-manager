import React from 'react'
import { Table } from 'react-bootstrap'
import { deleteWatchlistStock } from './UserData'
import { WatchListStockSummary } from './WatchlistStockSummary'

/**
 * Class for a single WatcList's Table
 * @param {string} props.name Name of the watchlist used for deleting
 * @param {function} forceUpdate function for forcing state refresh in parent
 * @class
 */class WatchListStockTable extends React.Component {
    constructor(props) {
        super(props);
        this.delStock = this.delStock.bind(this)
    }

    //helper function to create table of children stocks
    createTable = (context) => {
        let table = []

        for (let i = 0; i < this.props.stocks.length; i++) {
            table.push(<WatchListStockSummary stockName={this.props.stocks[i]}
                key = {i} forceUpdate = {context.props.forceUpdate}
                delStock= {context.delStock}
                />
            )

        }

        return table
    }

    //function for handling stokc deletion in child
    //needs to be here as child does not know name of watchlist it is part of
    delStock = (code) => {
        deleteWatchlistStock(this.props.name, code)
    }

    //returns JSX Table structure and creates tabke of children
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
                    {this.createTable(this)}
                </tbody>
            </Table>
        )
    }
}

export { WatchListStockTable }
