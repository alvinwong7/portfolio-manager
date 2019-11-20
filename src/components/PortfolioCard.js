import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button, ButtonToolbar, Card, Form } from "react-bootstrap"

import { deletePortfolio, addPortfolio } from './UserData'

/** 
 * Class for portfolio cards containing networth, todays change and
 * change percent of the given portfolio card
 * 
 * @class
 * @exports PortfolioCard
*/
class PortfolioCard extends React.Component {
    /**
     * Creates a card that displays the following information: portfolio 
     * name, total networth, change, and percent change. It contains an 
     * edit and delete option.
     * 
     * @constructor
     */
    constructor(props) {
        super(props)
        this.state = {
            /** Name of the portfolio */
            name: this.props.name,
            /** 
             * Total networth calculated as the sum of each stock price * units 
             * in @see PortfolioBuilderPage in @see evalNetworth 
             */
            networth: this.props.networth,
            /** Total change in todays networth */
            change: this.props.change,
            /** Enabling/disabling rendering portfolio name as a form for editing */
            edit: false
        }
    }

    /**
     * Lifecycle method for when the component receives props. This occurs
     * when a portfolio card is added or deleted. @see constructor for 
     * information regarding state variables
     */
    componentWillReceiveProps = (nextProps) => {
        this.setState({
            name: nextProps.name,
            networth: nextProps.networth,
            change: nextProps.change,
            edit: false
        })
    }

    /**
     * Handles click operation of the delete button
     */
    handleClickDelete = () => {
        // Delete portfolio from cookies
        deletePortfolio(this.state.name)
        // Deletes portfolio in the higher order page
        this.props.deletePortfolio(this.state.name)
    }

    /**
     * Handles click operation of the edit button by enabling edit variable 
     * that is used to change the rendering of the card. @see render
     */
    handleClickEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }
    
    /**
     * Handles editing of the portfolio name 
     */
    handleEdit = (event) => {
        // Stops renaming to one that already exists
        try {
            // Grab entered name from form
            event.preventDefault()
            const newName = event.target.elements.namedItem("newPortfolioName").value

            if (!this.props.checkExists(newName)) {
                // rename the portfolio in the higher order page
                this.props.renamePortfolio(this.state.name, newName)

                // Add and delete portfolio from cookies
                addPortfolio(newName, this.state.name)
                deletePortfolio(this.state.name)
            } else {
                alert("You cannot rename the portfolio to one that already exists")
            }
        } catch(err) {
            alert(err)
        }
    }
    
    render = () => {
        // Calculates the change in percentage
        let changePercent = 0.00
        if (this.state.networth - this.state.change !== 0) {
            // changePercent = 100 * (change / (networth - change))
            changePercent = 100 * this.state.change / (this.state.networth - this.state.change)
        }

        // Changes whether the portfolio name is editable (either renders a 
        // form or link to the portfolio page)
        let title
        if (this.state.edit) {
            title = <Form onSubmit={ (e) => this.handleEdit(e)}>
                    <Form.Control 
                        name="newPortfolioName" 
                        type="text" 
                        placeholder={this.state.name}/>
                    </Form>
        } else {
            title = <Nav>
                    <Nav.Link as={Link} to={"/builder/"+this.state.name}>
                    {this.state.name}
                    </Nav.Link>
                    </Nav>
        }

        return (
            <Card>
                <Card.Body>
                    <Card.Title>
                    {title}
                    </Card.Title>
                    <Card.Text>
                        Networth: ${this.state.networth.toFixed(2).toString()}
                        <br/>
                        Change: {this.state.change >= 0 ? " $" + this.state.change.toFixed(2).toString() : "-$" + (-this.state.change).toFixed(2).toString()}
                        <br/>
                        Change (%): {changePercent.toFixed(2).toString()}%
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <ButtonToolbar>
                    <Button variant="outline-success" onClick={this.handleClickEdit.bind(this)} block>Edit</Button>
                    <Button variant="outline-danger" onClick={this.handleClickDelete.bind(this)} block>Delete</Button>
                    </ButtonToolbar>
                </Card.Footer>
            </Card>
        )
    }
}

export { PortfolioCard }
