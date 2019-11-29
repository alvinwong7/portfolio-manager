import React from 'react'
import { Form, Button, Row, Col } from "react-bootstrap"

import { addPortfolioStock } from '../UserData'

/**
 * Class for a form that adds stock a given portfolio
 *
 * @class
 * @exports NewStockForm
*/
class NewStockForm extends React.Component {
    /**
     * Initialise with props and bind the requred functions
     *
     * @constructor
     */
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /**
     * Handles submission of the new stock form
     */
    handleSubmit = (event) => {
        try {
            event.preventDefault()

            // Collecting information from the form submission
            const assetType = event.target.elements.namedItem("assetType").value
            const code = event.target.elements.namedItem("code").value
            const units = event.target.elements.namedItem("units").value
            const date = event.target.elements.namedItem("date").value
            const price = event.target.elements.namedItem("price").value
    
            let selDate = new Date(date)
            let curDate = new Date()
            if (curDate.getTime() < selDate.getTime()) {
                let errorMessage = { code : 401, message : "Cannot select date in the future" }
                throw errorMessage
            }

            event.target.reset()
            // Add new stock to cookies and tell the portfolio page to update itself
            // with the new stock
            addPortfolioStock(this.props.portfolioName, assetType, code, units, date, price)
            this.props.updateSession(this.props.portfolioName)
        } catch(err) {
            alert(err)
        }

    }

    /**
     * Lifecycle method to render the form
     *
     * @return {html} Stock form HTML
     */
    render = () => {
        return (
        <Form id="addStockForm" name="addStockForm" onSubmit={ (e) => this.handleSubmit(e)}>
        <b>Add Asset</b>
        <Row>
            <Col>
                <Form.Label>Asset Category</Form.Label>
                    <Form.Control as="select" name = "assetType">
                    <option defaultValue >Stock</option>
                    </Form.Control>
            </Col>
            <Col>
                <Form.Label>Code</Form.Label>
                <Form.Control name="code"  required={true} placeholder="Enter Code Here" />
            </Col>
            <Col>
                <Form.Label>Units</Form.Label>
                <Form.Control name="units" required={true} type="number" placeholder="Enter Units Here" />
            </Col>
        </Row>
        <br/>
        <Row>
            <Col>
                <Form.Label>Date Purchased</Form.Label>
                <Form.Control name="date" required={true} type="date" />
            </Col>
            <Col>
                <Form.Label>Price ($AUD)</Form.Label>
                <Form.Control name="price" required={true} type="number" step=".01" placeholder="Enter Price Here" />
            </Col>
        </Row>
        <br />
        <Button variant="primary" type = "submit" >
        Submit
        </Button>
        </Form>
        )
    }
}

export { NewStockForm }
