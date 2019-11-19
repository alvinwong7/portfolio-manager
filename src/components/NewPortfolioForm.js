import React from 'react'
import { Form, Button, Row, Col } from "react-bootstrap"

import { getSessionCookie } from './Session'
import { addPortfolio } from './UserData'

/**
 * Class for a form that adds portfolios to the portfolio builder page
 * 
 * @class
 * @exports NewPortfolioForm
 */
class NewPortfolioForm extends React.Component {
    /**
     * Constructs class and binds handleSubmit function
     * 
     * @constructor
     * @param {object} props
     */
    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    /**
     * Creates drop down options of potential portfolios
     * 
     * @return {html} html options of portfolios for the drop down menu in 
     * @see render
     */
    createOptions = () => {
        let options = []
        let portfolios = getSessionCookie()['portfolios']
        Object.keys(portfolios).forEach(function(key) {
            options.push(<option>{key}</option>)
        })
        return options
    }

    /**
     * Handles the form submission which adds a portfolio with an option of 
     * basing it off another portfolio
     * 
     * @param {object} event 
     */
    handleSubmit = (event) => {
        try {
            // Grab the submitted portfolio name and base portfolio from form
            event.preventDefault()
            const portfolioName = event.target.elements.namedItem("portfolioName").value
            const basePortfolio = event.target.elements.namedItem("basePortfolio").value
            event.target.reset()

            // Adds portfolio to the portfolio builder page and cookies
            this.props.addPortfolio(portfolioName, basePortfolio)
            addPortfolio(portfolioName, basePortfolio)
        } catch(err) {
            alert(err)
        }
    }

    /**
     * Lifecycle method to render the page
     * 
     * @return {html} The pages' HTML code
     */
    render = () => {
        return (
        <Form id ="addPortfolioForm" name = "addPortfolioForm" onSubmit={ (e) => this.handleSubmit(e)}>
        <b>Add Portfolio</b>
        <Row>
            <Col>
                <Form.Label>Portfolio Name</Form.Label>
                <Form.Control name="portfolioName"  required={true} placeholder="Enter Portfolio Name Here" />
            </Col>
            <Col>
                <Form.Label>Base off current portfolio</Form.Label>
                    <Form.Control as="select" name="basePortfolio">
                    <option defaultValue>None</option>
                    {this.createOptions()}
                    </Form.Control>
            </Col>
        </Row>
        <br />
        <Button variant="primary" type="submit">Submit</Button>
        </Form>
        )
    }
}

export { NewPortfolioForm }
