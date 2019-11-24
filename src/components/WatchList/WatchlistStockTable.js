import React from 'react'
import { Table } from 'react-bootstrap'
import { deleteWatchlistStock } from '../UserData'
import { StockSummary } from '../Stock/StockSummary'

/**
 * Class for a single WatcList's Table
 * @param {string} props.name Name of the watchlist used for deleting
 * @param {function} forceUpdate function for forcing state refresh in parent
 * @class
 */
class WatchListStockTable extends React.Component {
    /**
     * @constructor
     * 
     * @param {object} props Contains the following required parameters:
     * @param {string} props.name Name of the watchlist
     * @param {function} props.forceUpdate Updates the watchlist page
     */
    constructor(props) {
        super(props);
        this.delStock = this.delStock.bind(this)
    }

    /**
     * Helper function to create table of children stocks
     * 
     * @param context Refers to (this) object
     */
    createTable = (context) => {
        let table = []

        for (let i = 0; i < this.props.stocks.length; i++) {
            table.push(<StockSummary stockName={this.props.stocks[i]}
                key={i} forceUpdate={context.props.forceUpdate}
                delStock={context.delStock} isWatchlist={true}
                />
            )
        }

        return table
    }

    /**
     * Handling stock deletion in child. Needs to be here as child 
     * does not know name of its parent watchlist
     * 
     * @param code Name of stock to delete in watchlist
     */
    delStock = (code) => {
        deleteWatchlistStock(this.props.name, code)
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
                    {this.createTable(this)}
                </tbody>
            </Table>
        )
    }
}

export { WatchListStockTable }
