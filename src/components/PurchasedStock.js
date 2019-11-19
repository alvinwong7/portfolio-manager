import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button } from "react-bootstrap"

import { deletePortfolioStock } from './UserData'

/** 
 * Class for the stock row that is a part of the table on the portfolio page
 * 
 * @class
 * @exports PurchasedStock
*/
class PurchasedStock extends React.Component {
    /**
     * Initialises all the required information in the row
     * 
     * @constructor
     * @param {object} props Contains the following parameters to be displayed:
     * @param {string} name Code of the stock
     * @param {string} price Current price of the stock
     * @param {string} units Amount of units of stock owned
     * @param {string} changePercent Todays percentage change in value
     * @param {string} value Total networth of owned stock calculated in @see PortfolioPage
     * in the function @see getInfo
     * @param {string} weight The percentage amount that this stock makes up of the 
     * portfolios total networth
     */
    constructor(props) {
        super(props)

        this.state = {
            /** Code of the stock */
            name: this.props.stock['code'],
            /** Current price of the stock */
            price: this.props.stock['price'],
            /** Todays profit/loss */
            profitLoss: this.props.stock['profits/loss'],
            /** Units of the stock owned */
            units: this.props.stock['units'],
            /** Todays percentage change */
            changePercent: this.props.stock['changePercent'],
            /** 
             * Total value of owned stocks calculted in @see PortfolioPage in 
             * the function @see getInfo
             */
            value: this.props.stock['value'],
            /** The percentage amount that this stock makes up of the 
             * portfolios total networth
             */
            weight: this.props.stock['weight'],
        }
    }

    /**
     * Lifecycle method for when the component receives props. This occurs 
     * when a stock (row) on the stock table is deleted to update the position 
     * all the rows. @see constructor for details regarding state variables
     */
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            name: nextProps.stock['code'],
            price: nextProps.stock['price'],
            profitLoss: nextProps.stock['profits/loss'],
            units: nextProps.stock['units'],
            changePercent: nextProps.stock['changePercent'],
            value: nextProps.stock['value'],
            weight: nextProps.stock['weight'],
        })
    }

    /**
     * Handles delete stock button click
     */
    handleClick = () => {
        // Deletes stock in specified portfolio in cookies and then tells the 
        // portfolio page to update
        deletePortfolioStock(this.props.portfolioName, this.state.name)
        this.props.updateSession(this.props.portfolioName)
    }

    render = () => {
        return (
            <tr>
                <td><Nav>
                <Nav.Link as={Link} to={"/stock/"+this.state.name}>{this.state.name}</Nav.Link>
                </Nav></td>
                <td>{this.state.price}</td>
                <td>{this.state.profitLoss}</td>
                <td>{this.state.units}</td>
                <td>{this.state.changePercent}</td>
                <td>{this.state.value}</td>
                <td>{this.state.weight}</td>
                <td> <Button variant="danger" onClick={this.handleClick.bind(this)}>Delete</Button></td>
            </tr>
        )
    }
}

export { PurchasedStock }
