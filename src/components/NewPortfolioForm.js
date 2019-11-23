import React from 'react';
import { Form, Button, Row, Col } from "react-bootstrap";
import { getSessionCookie } from './Session'
import { addPortfolio } from './UserData'
import { PortfolioOptions } from './PortfolioOptions'

class NewPortfolioForm extends React.Component {
    constructor(props){
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    createOptions = () => {
        let table = []
        let children = []
        let portfolios = getSessionCookie()['portfolios']
        Object.keys(portfolios).forEach(function(key) {
            children.push(<PortfolioOptions name={key}/>)
        })
        table.push(children)
        return table
    }

    render() {
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

    handleSubmit = (event) => {
        try {
            event.preventDefault();
            let component = this

            const portfolioName = event.target.elements.namedItem("portfolioName").value
            const basePortfolio = event.target.elements.namedItem("basePortfolio").value

            addPortfolio(portfolioName, basePortfolio)
            event.target.reset()
            component.props.updateSession(portfolioName, basePortfolio, 'add')
        } catch(err) {
            alert(err);
        }
    }
}

export { NewPortfolioForm };
