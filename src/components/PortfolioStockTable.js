import React from 'react'
import { Table } from 'react-bootstrap'

import { PurchasedStock } from './PurchasedStock'

/** 
 * Class for the stock table on the portfolio page
 * 
 * @class
 * @exports PortfolioStockTable
*/
class PortfolioStockTable extends React.Component {
    /**
     * Creates a card that displays the following information: portfolio 
     * name, total networth, change, and percent change. It contains an 
     * edit and delete option.
     * 
     * @constructor
     * @param {object} props Contains the following parameters:
     * @param {dictionary} userStocks
     */
    constructor(props) {
        super(props)

        this.createTable = this.createTable.bind(this)

        this.state = {
            userStocks: this.props.userStocks,
        }
    }

    /**
     * Creates a row for each stock and returns html of all the rows
     * 
     * @return {html} html for rows that make up a table in the render function
     */
    createTable = () => {
        let table = []
        let component = this
        let stocks = this.props.userStocks

        // Iterates through each stock and creates html for a table row
        for (let i = 0; i < stocks.length; i++) {
            table.push(<PurchasedStock 
                        stock={stocks[i]}  
                        portfolioName={component.props.portfolioName} 
                        updateSession={component.props.updateSession}/>)
        }
        
        return table
    }

    /**
     * Lifecycle method to render the page
     * 
     * @return {html} Table containing personalised stock information
     */
    render = () => {
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
