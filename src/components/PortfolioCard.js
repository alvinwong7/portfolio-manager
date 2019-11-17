import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, Button, ButtonToolbar, Card, Form } from "react-bootstrap"

import { deletePortfolio, addPortfolio } from './UserData'


class PortfolioCard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name : this.props.name,
            networth : this.props.networth,
            change : this.props.change,
            edit : false
        }
    }

    handleClick() {
        deletePortfolio(this.state.name)
        this.props.updateSession(this.state.name, 'nothing', 'delete')
    }

    handleClickEdit() {
        this.setState({
            edit : !this.state.edit
        })
    }

    handleEdit = (event) => {
        try {
            event.preventDefault();
            const newName = event.target.elements.namedItem("newPortfolioName").value
            if (!this.props.checkExists(newName)) {
                this.props.updateSession(this.state.name, newName, 'rename')
                addPortfolio(newName, this.state.name)
                deletePortfolio(this.state.name)
            } else {
                alert("You cannot rename the portfolio to one that already exists")
            }
        } catch(err) {
            alert(err)
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({
            name : nextProps.name,
            networth : nextProps.networth,
            change : nextProps.change,
            edit : false
        })
    }

    render() {
        let changePercent = 0.00
        if (this.state.networth - this.state.change != 0) {
            changePercent = 100 * this.state.change / (this.state.networth - this.state.change)
        }

        let title
        if (this.state.edit) {
            title = <Form onSubmit={ (e) => this.handleEdit(e)}><Form.Control name="newPortfolioName" type="text" placeholder={this.state.name}/></Form>
        } else {
            title = <Nav><Nav.Link as={Link} to={"/builder/"+this.state.name}>{this.state.name}</Nav.Link></Nav>
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
                    <Button variant="outline-danger" onClick={this.handleClick.bind(this)} block>Delete</Button>
                    </ButtonToolbar>
                </Card.Footer>
            </Card>
        );
    }
}

export { PortfolioCard }
